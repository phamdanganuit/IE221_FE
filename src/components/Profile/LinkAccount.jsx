import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaFacebook, FaGoogle } from "react-icons/fa";

function LinkAccount() {
  const [isLoading, setIsLoading] = useState(true);
  const [facebookLinked, setFacebookLinked] = useState(false);
  const [googleLinked, setGoogleLinked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        google: true,
        facebook: false,
      };
      setGoogleLinked(data.google);
      setFacebookLinked(data.facebook);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center font-semibold text-2xl gap-2">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[#5BC0BE] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex-col space-y-[10px] w-full">
      <p className="text-2xl font-semibold mb-4">Liên kết tài khoản</p>
      <div className="w-full space-y-8">
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <p className="self-start font-semibold">Tài khoản Google</p>
          <Button
            variant={"outline"}
            className="flex space-x-4 items-center w-120 text-lg h-12"
            disabled={googleLinked}
            onClick={() => {}}
          >
            <FaGoogle className="w-10 h-10" />
            {!googleLinked
              ? "Liên kết với tài khoản Google"
              : "Đã liên kết với tài khoản Google"}
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <p className="self-start font-semibold">Tài khoản Facebook</p>
          <Button
            variant={"outline"}
            className="flex space-x-4 items-center w-120 text-lg h-12"
            disabled={facebookLinked}
            onClick={() => {}}
          >
            <FaFacebook className="w-10 h-10" />
            {!facebookLinked
              ? "Liên kết với tài khoản Facebook"
              : "Đã liên kết với tài khoản Facebook"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LinkAccount;
