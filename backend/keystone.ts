// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config
import dotenv from "dotenv";
import { config } from "@keystone-6/core";

dotenv.config();

// to keep this file tidy, we define our schema in a different file
import { lists } from "./schema";

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from "./auth";

export default withAuth(
  config({
    server: {
      port: 8080,
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
    lists,
    session,
  })
);
