import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import LoginInput from "../inputs/loginInput";
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/react";
import axios from "axios";
import Cookies from "js-cookie";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const loginInfos = {
  email: "",
  password: "",
};

export default function LoginForm({ registerFormRef }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required"),
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        { email, password }
      );

      setError("");
      setLoading(false);

      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="icons/facebook.svg" alt="facebook logo" />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn login_btn_form">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/reset" className="forgot_password">
            Forgotten password?
          </Link>
          <div className="sign_splitter"></div>
          <DotLoader
            color="#1876f2"
            loading={loading}
            css={override}
            size={30}
          />
          {error && <div className="error_text">{error}</div>}
          <button
            className="blue_btn open_signup"
            onClick={() => registerFormRef.current.open()}
          >
            Create Account
          </button>
        </div>
        <Link to="/">
          <b>Create a page</b> for a celebrity, brand or business.
        </Link>
        <br />
      </div>
    </div>
  );
}
