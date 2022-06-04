import React from "react";
import { useMediaQuery } from "react-responsive";
import { useField, ErrorMessage } from "formik";
import "./style.css";

export default function LoginInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);
  const destktopView = useMediaQuery({
    query: "(min-width: 850px)",
  });

  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div
          className={
            destktopView ? "input_error input_error_desktop" : "input_error"
          }
          style={{ transform: "translateY(3px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={destktopView ? "error_arrow_left" : "error_arrow_top"}
            ></div>
          )}
        </div>
      )}
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div
          className={
            destktopView ? "input_error input_error_desktop" : "input_error"
          }
          style={{ transform: "translateY(2px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                destktopView ? "error_arrow_left" : "error_arrow_bottom"
              }
            ></div>
          )}
        </div>
      )}

      {meta.touched && meta.error && (
        <i
          className="error_icon"
          style={{ top: `${!bottom && !destktopView ? "63%" : ""}` }}
        ></i>
      )}
    </div>
  );
}
