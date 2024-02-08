import { useForm } from "react-hook-form";
import { Form } from "../../components/form";
import title from "../../images/Submit a slop.png";

export const SubmitSlopForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      releaseYear: "",
      runTime: "",
      image: "",
      score: "",
      watch: "",
      keywords: "",
    },
  });

  return (
    <>
      <img src={title} className="m-auto mt-10 mb-10"></img>
      <Form
        onSubmit={handleSubmit}
        className="max-w-[453px] m-auto flex flex-col font-arialBold text-lg mb-10"
      >
        <Form.TextInput
          errors={errors}
          register={register("title", {
            required: "Title is required",
            minLength: {
              value: 2,
              message: "Please enter 2 or more characters",
            },
          })}
          name="title"
          placeholder="Title"
          labelText={"Title *"}
          required
          onChange={(e) => {
            setValue("title", e.target.value, { shouldValidate: true });
          }}
          isValid={!errors.title}
        />
        {errors.title && <Form.Feedback message={errors.title.message} />}
        <Form.TextArea
          errors={errors}
          register={register("description", {
            required: "Description is required",
            minLength: {
              value: 20,
              message: "Be more descriptive, 20 characters are required.",
            },
          })}
          placeholder="Descritpion"
          labelText={"Description *"}
          onChange={(e) => {
            setValue("description", e.target.value, { shouldValidate: true });
          }}
          isValid={!errors.description}
        />
        {errors.description && (
          <Form.Feedback message={errors.description.message} />
        )}
        <div className="flex justify-between font-arialBold text-lg box-border ">
          <div className="flex flex-col">
            <Form.TextInput
              errors={errors}
              register={register("releaseYear", {
                minLength: {
                  value: 4,
                  message: "Please enter 4 or more characters",
                },
              })}
              placeholder="Release Year"
              labelText={"Release Year"}
              onChange={(e) => {
                setValue("releaseYear", e.target.value, {
                  shouldValidate: true,
                });
              }}
              isValid={!errors.releaseYear}
            />
            {errors.releaseYear && (
              <Form.Feedback message={errors.releaseYear.message} />
            )}
          </div>
          <div className="flex flex-col">
            <Form.TextInput
              placeholder="Runtime"
              labelText={"Runtime"}
              onChange={(e) => {
                setValue("runTime", e.target.value, { shouldValidate: true });
              }}
              isValid={!errors.runTime}
            />
            {errors.runTime && (
              <Form.Feedback message={errors.runTime.message} />
            )}
          </div>
        </div>
        <Form.TextInput
          type="file"
          placeholder="Click to upload"
          labelText={"Image"}
          isValid={!errors.image}
        />
        {errors.image && <Form.Feedback message={errors.image.message} />}
        <div className="flex justify-between box-border font-arialBold text-lg">
          <div className="flex flex-col">
            <Form.TextInput
              placeholder="Rotten Tomatoes Score"
              labelText={"Rotten Tomatoes Score"}
              onChange={(e) => {
                setValue("score", e.target.value, { shouldValidate: true });
              }}
              isValid={!errors.score}
            />
            {errors.score && <Form.Feedback message={errors.score.message} />}
          </div>
          <div className="flex flex-col">
            <Form.TextInput
              placeholder="How To Watch"
              labelText={"How To Watch"}
              onChange={(e) => {
                setValue("watch", e.target.value, { shouldValidate: true });
              }}
              isValid={!errors.watch}
            />
            {errors.watch && <Form.Feedback message={errors.watch.message} />}
          </div>
        </div>
        <Form.TextInput
          errors={errors}
          register={register("keywords", {
            required: "Keywords are required",
            minLength: {
              value: 4,
              message: "Please enter 4 or more characters",
            },
          })}
          placeholder="Keywords"
          labelText={"Keywords *"}
          onChange={(e) => {
            setValue("keywords", e.target.value, { shouldValidate: true });
          }}
          isValid={!errors.keywords}
        />
        {errors.keywords && <Form.Feedback message={errors.keywords.message} />}
        <Form.Submit
          type="submit"
          title="Yeah!"
          className="w-full"
          disabled={!isValid}
        ></Form.Submit>
      </Form>
    </>
  );
};
