import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const s3Client = new S3Client({ region: process.env.AWS_REGION })

export async function uploadPDFToS3(pdfBytes: Uint8Array, bookingId: string) {
  const pdfKey = `bookings/${bookingId}/confirmation.pdf`
  
  await s3Client.send(new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: pdfKey,
    Body: pdfBytes,
    ContentType: 'application/pdf'
  }))
  
  return pdfKey
}