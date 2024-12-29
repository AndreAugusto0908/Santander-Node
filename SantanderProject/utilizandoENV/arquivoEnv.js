/* eslint-disable @typescript-eslint/no-require-imports */
const dotenv = require('dotenv')

dotenv.config()

console.log(`Aquivo salvo no bucket ${process.env.S3_BUCKET}`)
console.log(`${process.env.NODE_ENV}`)