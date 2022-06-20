import React, { useRef } from "react";
import LoginForm from "../../components/login/LoginForm";
import Footer from "../../components/login/Footer";
import RegisterForm from "../../components/login/RegisterForm";
import "./style.css";

export default function Login() {
  const registerFormRef = useRef();

  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm registerFormRef={registerFormRef} />
        <RegisterForm ref={registerFormRef} />
        <Footer />
      </div>
    </div>
  );
}
