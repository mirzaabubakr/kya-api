import { DataTypes, Sequelize } from "sequelize";

export const KYCModel = (sequelize: Sequelize) => {
  return sequelize.define<any>(
    "kycs",
    {
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          isIn: {
            args: [["male", "female", ""]],
            msg: "gender type must be either 'male' or 'female' or other",
          },
        },
      },
      documentPath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
