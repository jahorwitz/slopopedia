/**
 * basically a wrapper for react-hook-form ErrorMessage component
 * @param {Object} errors - Errors object from useForm() hook
 * @param {string} name - Name of the form element that this component will display errors for
 * @param {string} className - additional classes for the element
 */

import { ErrorMessage } from "@hookform/error-message";
import cx from "classnames";

export default function FormError({ errors, name, className }) {
  return (
    <p className={cx("text-[#FF4040] text-sm" + className)}>
      <ErrorMessage name={name} errors={errors} />
    </p>
  );
}
