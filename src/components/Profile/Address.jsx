import React, { useEffect, useState } from "react";
import AddressCard from "./AddressCard";
import AddressDialog from "./AddressDialog";
import { Plus } from "lucide-react";


function Address() {
  const [addressList, setAddressList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = () => {
      setAddressList([
        {
          _id: "63b413a8c913d1321a98",
          receiver: "Hac Thien Cau",
          detail: "11A đường 4",
          ward: "Phường Bình Chiểu",
          district: "Quận Thủ Đức",
          province: "Thành phồ Hồ Chí Minh",
          phone: "0779765688",
          default: true,
          createdAt: "2023-01-03T10:20:40.123Z",
        },
        {
          _id: "1234534edsafdfas32318",
          receiver: "Uyen Nè",
          detail: "Khu phố 6",
          ward: "Phường Linh Trung",
          district: "Quận Thủ Đức",
          province: "Thành phồ Hồ Chí Minh",
          phone: "0123456789",
          default: false,
          createdAt: "2025-01-03T10:20:40.123Z",
        },
      ]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleAdd = (newAddress) => {
    console.log(newAddress);
  }
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center font-semibold text-2xl gap-2">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[#50D5C4] rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="flex-col space-y-[10px] w-full">
      <div className="w-full flex justify-between items-center">
        <p className="text-2xl font-semibold mb-4">Địa chỉ</p>
        <AddressDialog title={"Thêm địa chỉ mới"} submitIcon={<Plus/>} submitText={"Thêm"} onSubmit={handleAdd}/>
      </div>
      <div className="w-full flex-col space-y-2 overflow-y-auto max-h-[34.5rem] scrollbar-hide">
        {addressList.length === 0 ? (
          <div>
            <p>Bạn chưa thiết lập địa chỉ nào</p>
          </div>
        ) : (
          <>
            {addressList?.map((a) => {
              return <AddressCard key={a._id} address={a} />;
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default Address;
