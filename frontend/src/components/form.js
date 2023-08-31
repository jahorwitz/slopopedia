import * as React from "react";
import { useForm } from "react-hook-form";

export const Form = ({ className, children, onSubmit, ...rest }) => {
    return (
        <form className={className} onSubmit={onSubmit} {...rest}>
            {children}
        </form>
    );
};

Form.TextInput = ({ className, id, email, password, ...rest }) => {
    return (
        <>
        <div className={cx("flex flex-col", className)}>
            <label 
            htmlFor={id}
            className="text-black "
            >
                {labelText}
            </label>
            <input id={id} className="text-black text-sm" type="text" placeholder="Type here" {...rest}
            />
        </div>
        </>
    )
}

Form.TextArea = ({ className, labelText, id, register, ...rest }) => {
    return (
        <>
        <div className={cx("flex flex-col", className)}>
            <label 
            htmlFor={id}
            className=""
            >
                {labelText}
            </label>
            <textarea id={id} className="text-black font-medium border border-solid border-black" type="text" {...rest}
            />
        </div>
        </>
    )
}

export default function SignUp() {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            id: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    });

    return (
        <form onSubmit={handleSubmit}>
            <input {...register("id", { required: true, minLength: 2 })} placeholder="Type here" />
            <input {...register("email", { required: true, minLength: 2 })} placeholder="Type here" />
            <input {...register("password", { required: true, minLength: 2 })} placeholder="Type here" />
            <input {...register("confirmPassword", { required: true, minLength: 2 })} placeholder="Type here" />
            <button type="submit" />
        </form>
    )
}