import { Response } from "express";
import { CustomRequest } from "../auth/interfaces/auth.interface";
import { getUserKYC, submit, updateUserKYC } from "./service";
import { awsS3GeneratePresignedUrl } from "../../utils/s3/s3";

export const submitKYC = async (req: CustomRequest, res: Response) => {
  const result = await submit(req);
  if (result.statusCode === 201) {
    res.status(201).json(result.data);
  } else {
    res.status(result.statusCode).json({ message: result.message });
  }
};

export const getKYC = async (req: CustomRequest, res: Response) => {
  const result = await getUserKYC(req.user.id, req.user.role);

  if (result.statusCode === 200) {
    res.status(200).json(result.data);
  } else {
    res.status(result.statusCode).json({ message: result.message });
  }
};

export const updateKYC = async (req: CustomRequest, res: Response) => {
  const result = await updateUserKYC(req);
  if (result.statusCode === 200) {
    res.status(200).json(result.data);
  } else {
    res.status(result.statusCode).json({ message: result.message });
  }
};

export const getPresignURL = async (req: CustomRequest, res: Response) => {
  const { path }: any = req.query;
  const uploadURL = await awsS3GeneratePresignedUrl(path, 60);
  res.status(200).send({ path, uploadURL });
};
