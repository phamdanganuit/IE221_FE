import React, { useEffect, useState } from "react";
import AddressCard from "./AddressCard";
import AddressDialog from "./AddressDialog";
import { Plus } from "lucide-react";
import { getAddresses, createAddress } from "@/service/addressService";
import { useToast } from "@/contexts/ToastContext";

function Address() {
  const [addressList, setAddressList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { success, error } = useToast();

  const fetchAddresses = async () => {
    setIsLoading(true);
    const result = await getAddresses();
    if (result.success) {
      setAddressList(result.data);
    } else {
      error(result.error || "Không thể lấy danh sách địa chỉ");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAdd = async (newAddress) => {
    const result = await createAddress({
      receiver: newAddress.receiver,
      detail: newAddress.detail,
      ward: newAddress.ward,
      district: newAddress.district,
      province: newAddress.province,
      phone: newAddress.phone,
      is_default: newAddress.default,
    });

    if (result.success) {
      success(result.message);
      // Refresh danh sách địa chỉ
      await fetchAddresses();
    } else {
      error(result.error);
    }
  };
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
              return <AddressCard key={a.id || a._id} address={a} onUpdate={fetchAddresses} />;
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default Address;
