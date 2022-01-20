require("dotenv").config();
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: process.env.S3_BUCKET_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
});

export default async (req, res) => {
  const { type, name } = req.body;

  const fileParams = {
    // ACL: "public-read",
    Bucket: process.env.S3_BUCKET_NAME,
    Key: name,
    Expires: 600,
    ContentType: type,
  };
  const url = await s3.getSignedUrlPromise("putObject", fileParams);
  res.status(200).json({ url });
};
