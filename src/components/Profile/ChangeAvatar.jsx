import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Image } from "lucide-react";

function ChangeAvatar({ avatar, setAvatar }) {
  const [preview, setPreview] = useState(avatar || null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
      setAvatar && setAvatar(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col space-y-5 items-center justify-center">
      <img
        src={
          preview
            ? preview
            : "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
        }
        alt="avatar"
        className="w-[150px] h-[150px] rounded-full outline-1 outline-[#50D5C4]"
      />
      <Button variant={"outline"} onClick={handleClick}>
        <Image />
        Chọn ảnh
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <p className="max-w-[200px] text-center">
        Dụng lượng file tối đa 1 MB.
        <br />
        Định dạng: .JPEG, .PNG
      </p>
    </div>
  );
}

export default ChangeAvatar;
