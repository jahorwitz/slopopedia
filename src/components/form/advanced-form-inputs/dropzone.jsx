import cx from "classnames";
import { forwardRef } from "react";
import { useDropzone } from "react-dropzone";
import { CiFileOn } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";

/**
 * Dropzone file upload component that is compatible with react-hook-form
 * @param {string|undefined} label - label for form input
 * @param {string} className - additional classes to be applied to the element
 * @param {Object} rest - rest of the values from react-hook-form register function
 */

const Dropzone = forwardRef(
  ({ label = "Upload Files", className, ...rest }, ref) => {
    const {
      acceptedFiles,
      fileRejections,
      getRootProps,
      getInputProps,
      isDragActive,
    } = useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
    });

    const files = acceptedFiles.map((file, i) => (
      <>
        {isFileImage(file) ? (
          <li key={file.path + i} className="p-2">
            <img
              height={100}
              width={100}
              mode="cover"
              className="rounded"
              src={URL.createObjectURL(file)}
              alt={file.path + file.size + "bytes"}
            />
          </li>
        ) : (
          <li className="flex p-2 items-center gap-1" key={file.path + i}>
            <CiFileOn />
            <p className="text-xs">
              {file.path} - {file.size} bytes
            </p>
          </li>
        )}
      </>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>
              <p className="text-[#FF4040] text-xs">{e.message}</p>
            </li>
          ))}
        </ul>
      </li>
    ));

    return (
      <div className="flex flex-col justify-evenly">
        <p className="font-bold">{label}</p>
        <div
          {...getRootProps({
            className: cx(
              "w-full flex items-center text-center justify-center" + className
            ),
          })}
        >
          <input {...getInputProps({ ...rest })} />
          <div className="flex flex-col items-center mx-auto py-5">
            <IoCloudUploadOutline
              height={500}
              width={500}
              className="text-[#10101099] mb-1"
            />
            {isDragActive ? (
              <p className="text-sm text-gray">Drop files here...</p>
            ) : (
              <p className="text-sm text-[#10101099]">
                Drag and drop files, or click here to open file explorer.
              </p>
            )}
          </div>
        </div>
        {files.length > 0 && (
          <div className="w-full bg-lightGray rounded p-2">
            <p className="text-sm">Files</p>
            <div className="bg-gray h-[.05em] my-1 min-w-full" />
            <ul className="grid grid-cols-3">{files}</ul>
            <ul>{fileRejectionItems}</ul>
          </div>
        )}
      </div>
    );
  }
);

function isFileImage(file) {
  return file && file["type"].split("/")[0] === "image";
}

export default Dropzone;
