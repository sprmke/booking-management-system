import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { S3Client } from "@aws-sdk/client-s3";
import { SESClient } from "@aws-sdk/client-ses";
import { SNSClient } from "@aws-sdk/client-sns";

const region = process.env.AWS_REGION || "us-east-1";

export const cognitoClient = new CognitoIdentityProviderClient({ region });
export const s3Client = new S3Client({ region });
export const sesClient = new SESClient({ region });
export const snsClient = new SNSClient({ region });

export const awsConfig = {
  cognito: {
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    clientId: process.env.COGNITO_CLIENT_ID,
  },
  s3: {
    bucketName: process.env.S3_BUCKET_NAME,
  },
};