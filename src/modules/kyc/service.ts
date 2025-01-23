import { KYC, User } from "../../utils/sequelize/sequelize";
import { uploadDocument } from "../../utils/s3/s3";
import { CustomRequest } from "../auth/interfaces/auth.interface";
import { Sequelize } from "sequelize";

export const submit = async (req: CustomRequest) => {
  const { gender } = req.body;

  const { file } = req;
  if (!file) {
    return { statusCode: 400, message: "No document uploaded" };
  }

  const userId = req.user.id;

  const key = `kyc-documents/${req.user.id}/${file.originalname}`;

  const documentUrl = await uploadDocument({
    filePath: file.path,
    key,
  });
  try {
    const kyc = await KYC.create({
      userId,
      gender,
      documentPath: documentUrl,
    });
    return { statusCode: 201, data: kyc };
  } catch (error: any) {
    return { statusCode: 500, message: error.message };
  }
};

export const getUserKYC = async (userId: string, role: string) => {
  try {
    if (role === "admin") {
      const totalUsers = await User.count();

      const kycStats = await KYC.findAll({
        attributes: [
          "status",
          [Sequelize.fn("COUNT", Sequelize.col("status")), "count"],
        ],
        group: ["status"],
      });

      const kycSummary = kycStats.reduce(
        (acc, stat) => ({
          ...acc,
          [stat.status]: parseInt(stat.get("count"), 10) || 0,
        }),
        { approved: 0, rejected: 0, pending: 0 }
      );

      const kycData = await KYC.findAll({
        include: [
          {
            model: User,
            as: "user",
            attributes: { exclude: ["password"] },
          },
        ],
      });

      return {
        statusCode: 200,
        data: {
          kycs: kycData,
          totalUsers,
          kycSummary,
        },
      };
    } else {
      const kycData = await KYC.findAll({ where: { userId } });

      return {
        statusCode: 200,
        data: {
          kycs: kycData,
        },
      };
    }
  } catch (error: any) {
    return {
      statusCode: 500,
      message: `An error occurred while fetching KYC data: ${error.message}`,
    };
  }
};

export const updateUserKYC = async (req: CustomRequest) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const kyc = await KYC.findByPk(id);
    if (!kyc) {
      return { statusCode: 404, message: "KYC record not found." };
    }

    kyc.status = status;
    const updatedKYC = await kyc.save();

    return { statusCode: 200, data: updatedKYC };
  } catch (error: any) {
    return { statusCode: 500, message: "Error updating KYC." };
  }
};
