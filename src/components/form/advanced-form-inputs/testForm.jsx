/**
 * Demo for advanced form components
 */

import { useForm } from "react-hook-form";
import { Button } from "../../button/button";
import Checkbox from "./checkbox";
import Dropdown from "./dropdown";
import Dropzone from "./dropzone";
import FormError from "./formError";
import Radio from "./radio";
import Slider from "./slider";
import TextInput from "./textInput";

function TestForm() {
  const form = useForm({
    // default values for forms are set inside of the useForm hook
    defaultValues: {
      firstName: "Test",
      lastName: "Testerson",
      password: "",
    },
    /* 
                                                                                                Criteria mode for error handling.
                                                                                                When it is set to all, all errors thrown will be shown at the same time.
                                                                                                can also be set to "firstError" which will only show the first 
                                                                                                error that is thrown by the form
                                                                                            */
    criteriaMode: "all",
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = form;

  /**
   * Function that takes in data object from the form. this function is triggered by the handleSubmit method from the useForm hook.
   * @param {FormData} - Data from RHF
   */
  function onSubmit(data) {
    const userData = {};
    userData["name"] = `${data.firstName} ${data.lastName}`;
    Object.keys(data).forEach((key) => {
      if (!key.includes("Name")) {
        userData[key] = data[key];
      }
    });
    console.log(userData);
  }
  // options for the non-multiselect dropdown
  const colors = [
    { label: "Red", value: "red" },
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
    { label: "Other Color", value: "otherColor" },
  ];

  // options for the multiselect dropdown
  const animals = [
    { label: "Dog", value: "dog" },
    { label: "Cat", value: "cat" },
    { label: "Monkey", value: "monkey" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"grid grid-cols-1 max-w-md mx-auto gap-5 mt-5"}
    >
      {/* handleSubmit passes the form data to the onSubmit function */}
      <p className="text-lg font-bold">Name *</p>
      <div className="flex gap-2 justify-center">
        <div>
          <TextInput
            {...register("firstName", {
              required: {
                // the register function takes a second arg
                // you can use it to set the validation/error handling
                value: true,
                message: "First name is required.",
              },
              minLength: 2,
              maxLength: 30,
            })}
          />
          <FormError name="firstName" errors={errors} />
        </div>
        <div>
          <TextInput
            {...register("lastName", {
              required: {
                value: true,
                message: "Last name is required.",
              },
              minLength: 2,
              maxLength: 30,
            })}
          />
          <FormError name="lastName" errors={errors} />
        </div>
      </div>
      <TextInput
        label="Email *"
        type="text"
        {...register("email", {
          required: true,
          minLength: {
            // you can add error messages that you would like to be displayed in <FormError/>
            value: 6,
            message: "Email must be at least 6 characters",
          },
          pattern: {
            // You can also validate with a regex in cases like email if you would prefer to use a standard text input
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
      />
      <FormError name="email" errors={errors} />
      <TextInput
        label="Password *"
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Password is required",
          },
          minLength: {
            value: 8,
            maxLength: 10,
          },
        })}
      />
      <FormError name="password" errors={errors} />
      <Slider
        label="Age"
        {...register("age")}
        min="18"
        max="65"
        step="1"
        watch={watch("age")}
      />
      <Dropzone control={control} name="files" />
      <div className="flex flex-col gap-3">
        <span className="text-xl font-bold">Pick one...</span>
        <Radio value="foo" label="Foo" {...register("fooBarBuzz")} />
        <Radio value="bar" label="Bar" {...register("fooBarBuzz")} />
        <Radio value="buzz" label="Buzz" {...register("fooBarBuzz")} />
      </div>
      {/*
            control object from useForm() should be passed to any controlled input
            */}
      <Dropdown control={control} name="favoriteColor" options={colors} />
      {/*
        "isMulti" makes the dropdown multiselect
            */}
      <Dropdown
        control={control}
        name="favoriteAnimals"
        options={animals}
        isMulti
      />
      <Checkbox
        label="Do you agree to the Terms of Service? *"
        {...register("tos", { required: true })}
      />
      <Button type="submit">Submit Me</Button>
    </form>
  );
}

export default TestForm;
