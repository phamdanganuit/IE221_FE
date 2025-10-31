import { Label } from "../ui/label";
import { Input } from "../ui/input";
import React, { useEffect, useState } from "react";
import DatePicker from "../DatePicker";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import ChangeAvatar from "./ChangeAvatar";
import { getProfile, updateProfile, uploadAvatar } from "@/service/profileService";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/contexts/ToastContext";
import { getFullAvatarUrl } from "@/lib/avatarUtils";

function EditProfile() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("male");
  const [birth, setBirth] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setAuth, token } = useAuthStore();
  const { success, error } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProfile();
      if (result.success) {
        const profile = result.data;
        setDisplayName(profile.displayName || "");
        setEmail(profile.email || "");
        setPhone(profile.phone || "");
        
        // Map giá trị từ API sang giá trị UI
        if (profile.sex === "male") setSex("Nam");
        else if (profile.sex === "female") setSex("Nữ");
        else setSex("Không muốn đề cập");
        
        setBirth(profile.birth ? new Date(profile.birth) : null);
        // Convert avatar URL to full URL if it's relative
        const fullAvatarUrl = profile.avatar ? getFullAvatarUrl(profile.avatar) : "";
        setAvatar(fullAvatarUrl);
      } else {
        error(result.error || "Không thể lấy thông tin người dùng");
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleAvatarChange = async (file) => {
    if (!file) return;
    
    // Upload avatar ngay khi chọn
    const result = await uploadAvatar(file);
    if (result.success) {
      // Use helper to get full URL
      const fullAvatarUrl = getFullAvatarUrl(result.data.avatarUrl);
      setAvatar(fullAvatarUrl);
      success(result.message);
      
      // Cập nhật auth store
      const profileResult = await getProfile();
      if (profileResult.success) {
        // Normalize avatar URL in profile data before saving to store
        const updatedProfile = {
          ...profileResult.data,
          avatar: fullAvatarUrl
        };
        setAuth(token, updatedProfile);
      }
    } else {
      error(result.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Map giá trị từ UI sang giá trị API
    let sexValue;
    if (sex === "Nam") sexValue = "male";
    else if (sex === "Nữ") sexValue = "female";
    else sexValue = "other";

    const data = {
      email,
      displayName,
      phone,
      sex: sexValue,
      birth: birth ? birth.toISOString() : null,
    };

    const result = await updateProfile(data);
    
    if (result.success) {
      success(result.message);
      // Cập nhật auth store với thông tin mới
      setAuth(token, result.data);
    } else {
      error(result.error);
    }
    
    setIsSubmitting(false);
  };

  if(isLoading){
    return <div className="w-full flex items-center justify-center font-semibold text-2xl gap-2">
    <div className="w-10 h-10 border-4 border-gray-300 border-t-[#50D5C4] rounded-full animate-spin"></div>
    </div>
  }

  return (
    <div className="flex-col space-y-[10px] w-full">
      <p className="text-2xl font-semibold mb-4">Hồ sơ</p>
      <div className="flex justify-between items-center">
        <form className="w-150 space-y-[10px]" onSubmit={handleSubmit}>
          <p className="font-semibold">Tên hiển thị <span className="text-red-500">*</span></p>
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            className="w-full bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-gray-200 px-2"
          />
          <p className="font-semibold">Email <span className="text-red-500">*</span></p>
          <Input
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-gray-200 px-2"
          />
          <p className="font-semibold">Số điện thoại</p>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-gray-200 px-2"
          />
          <p className="font-semibold">Giới tính</p>
          <div className="flex gap-5 items-center">
            <Label className="flex items-center gap-2">
              <Input
                type="radio"
                checked={sex === "Nam"}
                value="Nam"
                onChange={(e) => setSex(e.target.value)}
                className="w-6 h-6 accent-teal-600"
              />
              Nam
            </Label>
            <Label className="flex items-center gap-2">
              <Input
                type="radio"
                checked={sex === "Nữ"}
                value="Nữ"
                onChange={(e) => setSex(e.target.value)}
                className="w-6 h-6 accent-teal-600"
              />
              Nữ
            </Label>
            <Label className="flex items-center gap-2">
              <Input
                type="radio"
                checked={sex === "Không muốn đề cập"}
                value="Không muốn đề cập"
                onChange={(e) => setSex(e.target.value)}
                className="w-6 h-6 accent-teal-600"
              />
              Không muốn đề cập
            </Label>
          </div>
          <p className="font-semibold">Ngày sinh</p>
          {!isLoading && (
            <DatePicker
              defaultValue={birth}
              onChange={(date) => setBirth(date)}
            />
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className={"font-semibold flex items-center gap-2 mt-5"}
          >
            <Save />
            {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </form>
        <ChangeAvatar avatar={avatar} setAvatar={handleAvatarChange} />
      </div>
    </div>
  );
}

export default EditProfile;
