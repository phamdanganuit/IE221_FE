import { Input } from "../ui/input";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import { changePassword } from "@/service/accountService";

function ChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { success, error } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPass !== confirmPass) {
      error("Mật khẩu mới và nhập lại mật khẩu không khớp!");
      return;
    }

    setIsLoading(true);
    
    const result = await changePassword(oldPass, newPass);
    
    if (result.success) {
      success(result.message);
      // Reset form
      setOldPass("");
      setNewPass("");
      setConfirmPass("");
    } else {
      error(result.error);
    }
    
    setIsLoading(false);
  };

  if(isLoading){
    return <div className="w-full flex items-center justify-center font-semibold text-2xl gap-2">
    <div className="w-10 h-10 border-4 border-gray-300 border-t-[#50D5C4] rounded-full animate-spin"></div>
    </div>
  }

  return (
    <div className="flex-col space-y-[10px] w-full">
      <p className="text-2xl font-semibold mb-4">Đổi mật khẩu</p>
      <div className="flex justify-between items-center">
        <form className="w-150 space-y-[10px]" onSubmit={handleSubmit}>
          <p className="font-semibold">Mật khẩu hiện tại <span className="text-red-500">*</span></p>
          <Input
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
            required
            type = "password"
            className="w-full bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-gray-200 px-2"
          />
          <p className="font-semibold">Mật khẩu mới <span className="text-red-500">*</span></p>
          <Input
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
            type = "password"
            className="w-full bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-gray-200 px-2"
          />
          <p className="font-semibold">Nhập lại mật khẩu</p>
          <Input
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
            type = "password"
            className="w-full bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-gray-200 px-2"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className={"font-semibold flex items-center gap-2 mt-5"}
          >
            <Save />
            {isLoading ? "Đang xử lý..." : "Lưu thay đổi"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword
