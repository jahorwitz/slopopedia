import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
  mutation ($files: [Upload!]!) {
    uploadFiles(files: $files) {
      success
    }
  }
`;
