import cx from "classnames";
import { useDropzone } from "react-dropzone";
import { Controller } from "react-hook-form";
import { CiFileOn } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";

/**
 * Dropzone file upload component that is compatible with react-hook-form
 * @param {string} name - Name of formEl (eg: "myFileList")
 * @param {boolean} multiple - should the form allow for multiple files
 * @param {Function} control - Control object destructured from useForm hook
 */

export default function Dropzone({ name, multiple, control, ...rest }) {
  return (
    <Controller
      render={({ field: { onChange } }) => {
        return (
          <DropzoneEl
            multiple={multiple}
            onChange={(e) =>
              onChange(multiple ? e.target.files : e.target.files[0])
            }
            {...rest}
          />
        );
      }}
      name={name}
      control={control}
      defaultValue=""
    />
  );
}

const DropzoneEl = ({
  label = "Upload Files",
  multiple = false,
  onChange,
  ...rest
}) => {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    multiple,
    ...rest,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  const files = acceptedFiles.map((file) => (
    <ul key={file} className="grid grid-cols-3">
      {isFileImage(file) ? (
        <li key={file.name} className="p-2">
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
        <li className="flex p-2 items-center gap-1" key={file.name}>
          <CiFileOn />
          <p className="text-xs">
            {file.path} - {file.size} bytes
          </p>
        </li>
      )}
    </ul>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e, i) => (
          <li key={e.code + i}>
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
          className: cx("w-fjll flex items-center text-center justify-center"),
        })}
      >
        <input {...getInputProps({ onChange })} />
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
          {files}
          <ul>{fileRejectionItems}</ul>
        </div>
      )}
    </div>
  );
};

function isFileImage(file) {
  return file && file["type"].split("/")[0] === "image";
}
