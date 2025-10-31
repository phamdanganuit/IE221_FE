import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import AddressDialog from "./AddressDialog";
import { Pencil } from "lucide-react";

function AddressCard({ address }) {
  const handleDefault = () => {
    if (address?.default) return;
    // Gọi api...
  };
  const handleEdit = (updatedAddress) => {
    console.log(updatedAddress)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <p>
            {address?.receiver} |{" "}
            <span className="font-normal">({address?.phone})</span>
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-between">
          <div className="h-full flex-col space-y-4">
            <p>{address?.detail}, {address?.ward}, {address?.district}, {address?.province}</p>
            {address?.default && <div className="px-2 py-1 rounded-xl text-center text-slate-800 border border-slate-800 w-[100px]">Mặc định</div>}
          </div>
          <div className="flex-col space-y-2">
          <AddressDialog address={address} title={"Cập nhật địa chỉ"} submitIcon={<Pencil/>} submitText={"Hoàn tất chỉnh sửa"} onSubmit={handleEdit}/>
            <Button
              variant="outline"
              disabled={address?.default}
              className="w-[200px]"
              onClick={handleDefault}
            >
              Thiết lập mặc định
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AddressCard;
