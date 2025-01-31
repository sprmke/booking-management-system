export const APP_CONFIG = {
  name: 'Booking Management System',
  description: 'A modern booking management system',
  version: '1.0.0',
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
  },
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    cognito: {
      userPoolId: process.env.COGNITO_USER_POOL_ID,
      clientId: process.env.COGNITO_CLIENT_ID,
    },
    s3: {
      bucketName: process.env.S3_BUCKET_NAME,
    },
  },
};