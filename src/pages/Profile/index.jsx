import React, { useState } from "react";
import Sidebar from "../../components/Profile/Sidebar";
import EditProfile from "../../components/Profile/EditProfile";
import Address from "../../components/Profile/Address";
import ChangePassword from "../../components/Profile/ChangePassword";
import LinkAccount from "../../components/Profile/LinkAccount";
import NotifSetting from "../../components/Profile/NotifSetting";
import DeleteAccount from "../../components/Profile/DeleteAccount";
import Header from "@/components/Header";

function Profile() {
  const [isActive, setActive] = useState("Hồ sơ");
  return (
    <div className="flex flex-col min-h-screen" style={{
      objectFit: "contain",
      backgroundImage: "url('/profile-bg.png')",
    }}>
      {/*Header*/}
    <Header/>
      {/*Main*/}
      <div className="flex-1 jusifty-center w-[1100px] px-6 h-full flex pt-10 mx-auto space-x-2 bg-white">
        <Sidebar isActive={isActive} setActive={setActive} />
        <div className="w-full pl-2 max-h-screen">
          {isActive === "Hồ sơ" ? (
            <EditProfile />
          ) : isActive === "Địa chỉ" ? (
            <Address />
          ) : isActive === "Đổi mật khẩu" ? (
            <ChangePassword />
          ) : isActive === "Liên kết tài khoản" ? (
            <LinkAccount />
          ) : isActive === "Cài đặt thông báo" ? (
            <NotifSetting />
          ) : (
            <DeleteAccount />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
