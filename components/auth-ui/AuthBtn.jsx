import React from "react";
import { Spinner } from "@chakra-ui/react";

const AuthBtn = ({ className, text, disabled }) => {
  return (
    <button
      className={`text-white w-full text-center bg-[#0095F6] rounded font-semibold text-[14px] py-1.5 transition duration-100 ease-in ${className}`}
      disabled={disabled}
    >
      { text }
    </button>
  );
};

export default AuthBtn;
