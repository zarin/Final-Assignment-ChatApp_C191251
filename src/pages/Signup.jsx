import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [emailerr, setEmailerr] = useState("");
  let [nameerr, setNameerr] = useState("");
  let [passworderr, setPassworderr] = useState("");
  let [loader, setLoader] = useState(false);
  let [passwordShow, setPasswordShow] = useState(false);

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr("");
  };

  let handleName = (e) => {
    setName(e.target.value);
    setNameerr("");
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr("");
  };

  let handleSubmit = () => {
    if (!email) {
      setEmailerr("Email is required");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailerr("Invalid Email");
    }

    if (!name) {
      setNameerr("Name is required");
    }
    if (!password) {
      setPassworderr("Password is required");
    } else if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
        password
      )
    ) {
      setPassworderr(
        "Must contain one digit , one lowercase letter, one uppercase letter, one special character, no space, and it    must be 8-16 characters long."
      );
    }

    if (
      email &&
      name &&
      password &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(password)
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          sendEmailVerification(auth.currentUser).then(() => {
            
            setLoader(true);
            toast.success("Signup Successfull!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            setTimeout(() => {
              navigate("/");
            }, 1000);
          });
        })
        .catch((error) => {
          if (error.code.includes("auth/email-already-in-use")) {
            setEmailerr("The email has been already added");
          }
          console.log(error.code);
        });
    }
  };
  return (
    <div className="flex">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />

      <div className="w-full md:w-2/4 flex justify-center md:justify-end">
        <div className="mr-0 px-3 lg:px-0 lg:mr-[69px] mt-[25px] lg:mt-[80px]">
          <h1 className="font-nunito text-[28px] md:text-[34px] font-bold text-secondary mb-[13px] md:text-left text-center">
            Get started with easily register
          </h1>
          <p className="font-nunito text-[20px] font-normal text-secondary text-center md:text-left">
            Free register and you can enjoy it
          </p>
          <div className="mt-[25px] md:mt-[30px] relative">
            <p className="font-nunito text-[13px] font-semibold text-secondary tracking-[8%] absolute top-[-8px] left-[40px] bg-white px-2">
              Email Address
            </p>
            <input
              onChange={handleEmail}
              className={email?`w-full md:w-[368px] h-[50px] lg:h-[55px] px-10 rounded-lg border border-1 border-solid border-secondary
              type="email`:`w-full md:w-[368px] h-[50px] lg:h-[55px] px-10 rounded-lg border border-1 border-solid border-red-500
              type="email`}
            />
            {emailerr && (
              <p className="font-nunito text-[13px] w-full md:w-[368px] font-normal bg-red-500 text-white rounded-b-lg pl-3">
                {emailerr}
              </p>
            )}
          </div>
          <div className="mt-[25px] md:mt-[30px] relative">
            <p className="font-nunito text-[13px] font-semibold text-secondary tracking-[8%] absolute top-[-8px] left-[40px] bg-white px-2">
              Full name
            </p>
            <input
              onChange={handleName}
              className={name?`w-full md:w-[368px] h-[50px] lg:h-[55px] px-10 rounded-lg border border-1 border-solid border-secondary
              type="text`:`w-full md:w-[368px] h-[50px] lg:h-[55px] px-10 rounded-lg border border-1 border-solid border-red-500
              type="text`}
            />
            {nameerr && (
              <p className="font-nunito text-[13px] w-full md:w-[368px] font-normal bg-red-500 text-white rounded-b-lg pl-3">
                {nameerr}
              </p>
            )}
          </div>
          <div className="mt-[25px] md:mt-[30px] relative w-full md:w-[368px]">
            <p className="font-nunito text-[13px] font-semibold text-secondary tracking-[8%] absolute top-[-8px] left-[40px] bg-white px-2">
              Password
            </p>
            <input
              onChange={handlePassword}
              className={password?`w-full md:w-[368px] h-[50px] lg:h-[55px] px-10 rounded-lg border border-1 border-solid border-secondary`: 
              `w-full md:w-[368px] h-[50px] lg:h-[55px] px-10 rounded-lg border border-1 border-solid border-red-500 `}
              type={passwordShow ? "text" : "password"}
            />
            {passwordShow ? (
              <FaEye
                onClick={() => setPasswordShow(false)}
                className="absolute top-4 lg:top-5 right-3 text-lg"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setPasswordShow(true)}
                className="absolute top-4 lg:top-5 right-3 text-lg"
              />
            )}

            {passworderr && (
              <p className="font-nunito text-[13px] w-full md:w-[368px] font-normal bg-red-500 text-white rounded-b-lg pl-3">
                {passworderr}
              </p>
            )}
          </div>
          {loader ? (
            <div className="w-full md:w-[368px] flex justify-center mt-5">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
            </div>
          ) : (
            <Link
              onClick={handleSubmit}
              className="inline-block w-full md:w-[368px] bg-primary mt-[25px] lg:mt-[40px] text-center font-nunito text-[20px] font-semibold text-white py-3 lg:py-5 rounded-[86px]"
              href="#"
            >
              Sign up
            </Link>
          )}

          <p className="font-nunito text-[13px] font-normal text-secondary w-[368px] text-center mt-3 lg:mt-8">
            Already have an account ?{" "}
            <Link to="/" className="text-[#EA6C00] font-bold" href="#">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden md:block w-2/4">
        <img
          className="w-full h-screen object-cover"
          src="images/signup.png"
          alt="signup"
        />
      </div>
    </div>
  );
};

export default Signup;
