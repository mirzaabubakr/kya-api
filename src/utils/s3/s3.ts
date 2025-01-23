import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

interface UploadParams {
  filePath: string;
  bucketName?: string;
  key: string;
  contentType?: string;
  acl?: string;
}

export async function uploadDocument({
  filePath,
  bucketName = process.env.AWS_ACCESS_BUCKET || "default-bucket",
  key,
  contentType = "application/octet-stream",
}: UploadParams) {
  try {
    const fileContent = fs.readFileSync(filePath);

    const params: any = {
      Bucket: bucketName,
      Key: key,
      Body: fileContent,
      ContentType: contentType,
      acl: "private",
    };

    const command = new PutObjectCommand(params);
    const uploadResult = await s3Client.send(command);
    console.log(uploadResult);
    return key;
  } catch (error: any) {
    throw new Error(`Failed to upload document: ${error.message}`);
  }
}

export async function awsS3GeneratePresignedUrl(
  path: string,
  expires: number = 60,
  bucketName = process.env.AWS_ACCESS_BUCKET || "default-bucket"
): Promise<string> {
  try {
    let command = new GetObjectCommand({ Bucket: bucketName, Key: path });
    const data = await getSignedUrl(s3Client, command, { expiresIn: expires });
    return data;
  } catch (error: any) {
    console.error("Error generating presigned URL:", error);
    throw new Error(`Failed to generate presigned URL: ${error.message}`);
  }
}
