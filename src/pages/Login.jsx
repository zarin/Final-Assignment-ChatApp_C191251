import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail,signInWithPopup, GoogleAuthProvider  } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let [passwordShow, setPasswordShow] = useState(false);
  let [forgetModal,setForgetModal] = useState(false);
  let [forgetEmail,setForgetEmail] = useState("");

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  let handleSubmit = () => {
    if (!email) {
        setError("Wrong Email or Password");
    }
    if (!password) {
        setError("Wrong Email or Password");
    }
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
            setError('');
            // console.log("successful");
            toast.success("Login Successfull!", {
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
              navigate("/home");
            }, 1000);
        })
        .catch((error) => {
          if (error.code.includes("auth/invalid-credential")) {
            setError("Wrong Email or Password");
          }
          console.log(error.code);
        });
    }
  };
  let handleForgetPass=()=>{
    setForgetModal(true);
  }

  let handleForgetInput=(e)=>{
    setForgetEmail(e.target.value);
  }

  let handleResetMail=()=>{
    sendPasswordResetEmail(auth, forgetEmail)
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.log(error.code);
  });

  }

  let handleGoogleLogin=()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result);
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  }).catch((error) => {
    console.log(error.code);
  });
  }

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
          <h1 className="font-nunito text-[34px] font-bold text-secondary mb-[13px] md:text-left text-center">
            Login to your account!
          </h1>
          <Link onClick={handleGoogleLogin} className="flex font-nunito font-semibold text-sm  border border-solid rounded-xl p-[23px] gap-3 w-[220px]">
            <img src="images/google.png" alt="google" />
            <span>Login with Google</span>
          </Link>

          <div className="mt-[25px] md:mt-[30px] relative">
            <p className="font-nunito text-[13px] font-semibold text-secondary tracking-[8%] absolute top-[-8px] left-[40px] bg-white px-2 ">
              Email Address
            </p>
            <input
              onChange={handleEmail}
              className="w-full md:w-[368px] h-[50px] lg:h-[55px] border-b border-1 border-solid px-10"
              type="email"
            />
          </div>

          <div className="mt-[25px] md:mt-[30px] relative w-full md:w-[368px]">
            <p className="font-nunito text-[13px] font-semibold text-secondary tracking-[8%] absolute top-[-8px] left-[40px] bg-white px-2">
              Password
            </p>
            <input
              onChange={handlePassword}
              className="w-full md:w-[368px] h-[50px] lg:h-[55px] border-b border-1 border-solid px-10"
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

            {error && (
              <p className="font-nunito text-[13px] w-full md:w-[368px] font-normal bg-red-500 text-white mb-5 pl-3 py-3">
                {error}
              </p>
            )}
          </div>

          <Link
            onClick={handleSubmit}
            className="inline-block w-full md:w-[368px] bg-primary mt-[25px] lg:mt-[40px]  text-center font-nunito text-[20px] font-semibold text-white py-3 lg:py-5 rounded-[86px]"
            href="#"
          >
            Login to Continue
          </Link>

          <p className="font-nunito text-[13px] font-normal text-secondary w-full md:w-[368px] text-center mt-3 lg:mt-8">
            Don't have an account ?{" "}
            <Link to="/signup" className="text-[#EA6C00] font-bold" href="#">
              Sign Up
            </Link>
            <div className="mt-2">
            <button onClick={handleForgetPass} className="text-[#EA6C00] font-bold">Forget Password ?</button>
            </div>
          </p>
        </div>
      </div>
      <div className="hidden md:block w-2/4">
        <img
          className="w-full h-screen object-cover"
          src="images/login.png"
          alt="login"
        />
      </div>
      {forgetModal &&
      <div className="w-full h-screen bg-[rgba(0,0,0,.8)] absolute top-0 left-0 flex justify-center items-center">
        <div className="w-[400px] bg-gray-300 rounded-2xl p-8">
          <h1 className="font-nunito text-[20px] font-bold text-secondary mb-3">Reset Password{" "}</h1>
          <input onChange={handleForgetInput} className="w-[350px] h-[50px] px-9 border border-solid border-secondary rounded-xl" placeholder="Enter Your Email" type="text" />
          <button onClick={handleResetMail} className="py-3 px-4 bg-secondary mt-3 font-nunito text-[15px] font-normal text-white rounded-2xl">Submit</button>
          <button onClick={()=>setForgetModal(false)} className="py-3 px-4 bg-red-500 mt-3 ml-3 font-nunito text-[15px] font-normal text-white rounded-2xl">Cancel</button>
        </div>
      </div>
      }
    </div>
  );
};

export default Login;
