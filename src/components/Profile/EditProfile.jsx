import { Label } from "../ui/label";
import { Input } from "../ui/input";
import React, { useEffect, useState } from "react";
import DatePicker from "../DatePicker";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import ChangeAvatar from "./ChangeAvatar";

function EditProfile() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("Nam");
  const [birth, setBirth] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => { // gọi API lấy general profile (displayName, email, phone, sex, birth, avatar)
      setDisplayName("Hac Thien Cau");
      setEmail("22521641@gm.uit.edu.vn");
      setPhone("0779765688");
      setSex("Nữ");
      setBirth(new Date("2004-06-27T17:00:00.000Z")); // new Date(birth) hoặc null
      setAvatar(
        "https://styles.redditmedia.com/t5_4x22x5/styles/communityIcon_qo5i3hehh3i71.jpg?width=256&s=95c779083e5f2b906068fd850c6e095e62dda99b"
      );
      setIsLoading(false)
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // tránh reload trang
    const data = {
      displayName,
      email,
      phone,
      sex,
      birth: birth.toISOString(),
      avatar,
    };
    console.log("Dữ liệu người dùng:", data);

    // gọi API update profile:
    // await updateProfile(data)
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
            className={"font-semibold flex items-center gap-2 mt-5"}
          >
            <Save />
            Lưu thay đổi
          </Button>
        </form>
        <ChangeAvatar avatar={avatar} setAvatar={setAvatar} />
      </div>
    </div>
  );
}

export default EditProfile;
