import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";

export const AdvancedForm = ({ className, children, onSubmit, ...rest }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

AdvancedForm.TextInput = ({
  className,
  id,
  labelText,
  password = false,
  placeholder,
  isValid,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <div className="flex font-bold font-arial flex-col py-3">
        <label htmlFor={id} className={`mb-1.5 text-lg text-start`}>
          {labelText}
        </label>

        <input
          {...register(id)}
          className={`font-normal bg-background py-3 px-4 border-solid rounded-none border ${
            isValid ? "border-black" : "border-danger focus:outline-danger"
          } `}
          type={password ? "password" : "text"}
          placeholder={placeholder || "Type here"}
          errors={errors}
        />
      </div>
    </>
  );
};

AdvancedForm.DropzoneField = ({ name, multiple, className, labelText, id }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field: { onChange } }) => (
        <Dropzone
          multiple={multiple}
          onChange={(e) =>
            onChange(multiple ? e.target.files : e.target.files?.[0] ?? null)
          }
          className={className}
          labelText={labelText}
          id={id}
        />
      )}
      name={name}
      control={control}
      defaultValue=""
    />
  );
};

const Dropzone = ({ multiple, onChange, className, labelText, id }) => {
  const [files, setFiles] = useState([]);
  const onDrop = (acceptedFiles) => {
    setFiles((files) => files.concat(...acceptedFiles));
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <label
        htmlFor={id}
        className={`mb-1.5 text-lg text-start font-bold font-arial`}
      >
        {labelText}
      </label>
      <div {...getRootProps()} className={`border-solid border-2 ${className}`}>
        <input {...getInputProps({ onChange })} id={id} />
        <p>Drop the files here ...</p>
      </div>
      <div>
        Files :
        {files.map((file) => (
          <div key={file.path}>{file.path} </div>
        ))}
      </div>
    </>
  );
};

AdvancedForm.Slider = ({ className, id, labelText }) => {
  const { register } = useFormContext();
  return (
    <>
      <div className="flex font-bold font-arial flex-col py-3">
        <label htmlFor={id} className={`mb-1.5 text-lg text-start`}>
          {labelText}
        </label>

        <input {...register(id)} className={`${className}`} type="range" />
      </div>
    </>
  );
};

AdvancedForm.checkbox = ({ className, id, labelText }) => {
  const { register } = useFormContext();
  return (
    <>
      <div className="font-normal font-arial py-3">
        <input {...register(id)} className={`${className}`} type="checkbox" />
        <label htmlFor={id} className={`ml-1.5 text-lg text-start `}>
          {labelText}
        </label>
      </div>
    </>
  );
};

AdvancedForm.Dropdown = ({
  className,
  labelText,
  id,
  multiple,
  children,
  ...rest
}) => {
  const { register } = useFormContext();
  return (
    <>
      <div
        className={`flex font-bold font-arial flex-col py-3 border-solid rounded-none border-black/[0.4] ${className}`}
      >
        <label htmlFor={id} className="mb-1.5 text-lg">
          {labelText}
        </label>
        <select
          {...register(id)}
          className="py-4 px-4 bg-background border-solid rounded-none border border-black"
          type="dropdown"
          placeholder="Dropdown"
          multiple={multiple}
          {...rest}
        >
          {children}
        </select>
      </div>
    </>
  );
};

AdvancedForm.radio = ({ className, id, labelText }) => {
  const { register } = useFormContext();
  return (
    <>
      <div className="font-normal font-arial py-3">
        <input {...register(id)} className={`${className}`} type="radio" />
        <label htmlFor={id} className={`ml-1.5 text-lg text-start `}>
          {labelText}
        </label>
      </div>
    </>
  );
};
