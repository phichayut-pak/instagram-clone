import Image from "next/image";
import instagramLogo from "../.././public/images/logos/instagram_logo.png";
import facebookLogo from "../.././public/images/logos/white_facebook_logo.png";
import AuthBtn from "../auth-ui/AuthBtn";

import axios from 'axios'
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Spinner } from '@chakra-ui/react'


const RegisterForm = () => {
  const { push } = useRouter();
  const { data: session } = useSession();

  if (session) {
    push("/");
  }

  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState("");

  const [isPasswordClick, setIsPasswordClick] = useState(false);

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({
    isError: false,
    message: ''
  })

  const onPasswordChange = (e) => {
    setPassword(e);
  };

  const facebookLoginHandler = () => {
    signIn("facebook", {
      callbackUrl: "/",
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try{
      const response = await axios.post('/api/auth/signup', {
        email,
        password,
        fullname,
        username
      }, { headers: {'Content-Type': 'application/json'}})
      
      const data = await response.data
      console.log(data)
    } catch(err) {
      const { response } = err

      setError({
        isError: true,
        message: response.data.message
      })

      setIsLoading(false)
      return
    }


    setEmail('')
    setPassword('')
    setFullname('')
    setUsername('')
    
    setIsLoading(false)
  };

  return (
    <div className="pt-10 px-10 pb-5 w-screen border border-[#DBDBDB] bg-white flex flex-col justify-center items-center max-w-xs">
      <div className="w-full py-4">
        <div className="text-center">
          <Image
            className="cursor-pointer block "
            src={instagramLogo}
            alt="instagram_logo"
            width="171"
            height="61"
          />
        </div>

        <div className="text-[#A08E8E] font-semibold text-md text-center block">
          Sign up to see photos and videos from your friends.
        </div>
      </div>

      <button
        className="bg-[#0095F6] w-full py-1 rounded inline-flex justify-center items-center space-x-2"
        onClick={facebookLoginHandler}
      >
        <span id="facebook__logo" className="mt-1">
          <Image
            src={facebookLogo}
            alt="facebook logo"
            width={15}
            height={15}
          ></Image>
        </span>
        <span className="text-center text-sm text-white font-semibold">
          Log in with Facebook
        </span>
      </button>

      <div className="inline-flex justify-center items-center w-full space-x-3 py-4">
        <div className="w-full h-[1px] bg-[#DBDBDB] px-3"></div>
        <div className="text-[0.75rem] font-bold text-[#8E8E8E]">OR</div>
        <div className="w-full h-[1px] bg-[#DBDBDB] px-3"></div>
      </div>

      <div className="w-full">
        <form
          className="flex-col justify-center items-center"
          onSubmit={submitHandler}
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full block outline-none bg-[#FAFAFA] border border-[#DBDBDB] focus:border-[#A8A8A8] text-xs placeholder:text-xs py-2 px-2 my-1.5"
            type="email"
            placeholder="Email"
          />

          <input
            onChange={(e) => setFullname(e.target.value)}
            className="w-full block outline-none bg-[#FAFAFA] border border-[#DBDBDB] focus:border-[#A8A8A8] text-xs placeholder:text-xs py-2 px-2 my-1.5"
            type="text"
            placeholder="Full Name"
          />

          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full block outline-none bg-[#FAFAFA] border border-[#DBDBDB] focus:border-[#A8A8A8] text-xs placeholder:text-xs py-2 px-2 my-1.5"
            type="text"
            placeholder="Username"
          />

          <div className="relative">
            <div
              onClick={(e) => setIsPasswordClick(!isPasswordClick)}
              className={`cursor-pointer absolute right-3 bottom-1.5 text-sm font-semibold ${
                password.trim().length >= 1 ? "block" : "hidden"
              }`}
            >
              {password.trim().length >= 1 && isPasswordClick
                ? "Hidden"
                : "Show"}
            </div>
            <input
              onChange={(e) => onPasswordChange(e.target.value)}
              className="mb-3 w-full block outline-none bg-[#FAFAFA] border border-[#DBDBDB] focus:border-[#A8A8A8] text-xs placeholder:text-xs py-2 px-2 my-1.5"
              type={
                !isPasswordClick && password.trim().length !== 1
                  ? "password"
                  : "text"
              }
              placeholder="Password"
            ></input>
          </div>

          

          <AuthBtn text={isLoading ? <Spinner size="lg" /> : 'Sign up'} className={`${password.trim().length >= 6 && email !== '' && fullname !== '' && username !== '' ? 'opacity-100' : 'opacity-30'}`}
            disabled={password.trim().length >= 6 && email !== '' && fullname !== '' && username !== '' ? false : true}
          ></AuthBtn>
        </form>

        {error.isError && (
        <div className='text-center font-medium text-red-500 text-sm my-3'>
          { error.message }
        </div>
      )}
      </div>

    </div>
  );
};

export default RegisterForm;
