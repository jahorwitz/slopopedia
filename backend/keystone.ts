// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config
import dotenv from "dotenv";
import { config } from "@keystone-6/core";

dotenv.config();

// found this implementation here => https://github.com/keystonejs/keystone/blob/main/examples/assets-s3/keystone.ts
// const {
//   S3_BUCKET_NAME: bucketName = 'slop-keystonejs',
//   S3_REGION: region = 'us-east-2',
//   S3_ACCESS_KEY_ID: accessKeyId = 'keystone',
//   S3_SECRET_ACCESS_KEY: secretAccessKey = 'keystone',
// } = process.env;

// to keep this file tidy, we define our schema in a different file
import { lists } from "./schema";

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from "./auth";

export default withAuth(
  config({
    server: {
      port: 8080,
      cors: { origin: ["http://localhost:3000"] },
    },
    db: {
      provider: "mysql",
      url: `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:3306/${process.env.DB_NAME}`,
      onConnect: async (context) => {
        /* ... */
      },
      // Optional advanced configuration
      enableLogging: true,
      idField: { kind: "uuid" },
    },
    // https://keystonejs.com/docs/config/config#storage-images-and-files
    // amazone s3 or digital ocean as an option
    storage: {
      // my_S3_images: {
      //   kind: "s3",
      //   type: "image",
      //   bucketName,
      //   region,
      //   accessKeyId,
      //   secretAccessKey,
      //   signed: { expiry: 5000 },
      //   endpoint: "http://localhost:3000",
      // },
    },
    lists,
    session,
  }),
);
