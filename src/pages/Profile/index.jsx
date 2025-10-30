import React, { useState } from "react";
import Sidebar from "../../components/Profile/Sidebar";
import EditProfile from "../../components/Profile/EditProfile";
import Address from "../../components/Profile/Address";
import ChangePassword from "../../components/Profile/ChangePassword";
import LinkAccount from "../../components/Profile/LinkAccount";
import NotifSetting from "../../components/Profile/NotifSetting";
import DeleteAccount from "../../components/Profile/DeleteAccount";

function Profile() {
  const [isActive, setActive] = useState("Hồ sơ");
  return (
    <div className="w-full min-h-screen bg-white">
      {/*Header*/}

      {/*Main*/}
      <div className="flex jusifty-center w-[1080px] flex mt-20 mx-auto space-x-2">
        <Sidebar isActive={isActive} setActive={setActive} />
        <div className="w-full pl-4 border-l border-[#3A506B] ">
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
