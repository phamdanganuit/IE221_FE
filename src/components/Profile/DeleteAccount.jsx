import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { deleteAccount } from "@/service/profileService";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/contexts/ToastContext";
import { useNavigate } from "react-router-dom";

function DeleteAccountDialog() {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { clearAuth } = useAuthStore();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const handleDeteleAccount = async () => {
    if (!confirm("Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác!")) {
      return;
    }

    setIsDeleting(true);
    const result = await deleteAccount();

    if (result.success) {
      success(result.message);
      clearAuth();
      setOpen(false);
      navigate("/");
    } else {
      error(result.error);
    }

    setIsDeleting(false);
  };
  return (
    <Dialog open={open}  onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Xóa tài khoản</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="border-b px-4 py-2">
            Xác nhận xóa tài khoản
          </DialogTitle>
            <p className="p-2">
              Bạn có chắc chắn muốn xóa tài khoản của mình không? Hành động này
              không thể hoàn tác và tất cả dữ liệu cá nhân của bạn sẽ bị xóa
              vĩnh viễn.
            </p>
        </DialogHeader>
        <DialogFooter className="flex-row items-center justify-end border-t px-4 py-2">
          <DialogClose asChild>
            <Button variant="outline">
              <ChevronLeftIcon />
              Quay lại
            </Button>
          </DialogClose>
          <Button 
            variant="destructive" 
            onClick={handleDeteleAccount}
            disabled={isDeleting}
          >
            {isDeleting ? "Đang xóa..." : "Xóa tài khoản"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeleteAccount() {
  return (
    <div className="flex-col space-y-[10px] w-full">
      <p className="text-2xl font-semibold mb-4">Xóa tài khoản</p>
      <div className="w-full space-y-4">
        <p className="text-lg">
          Khi bạn xóa tài khoản, tất cả dữ liệu cá nhân của bạn sẽ bị xóa vĩnh
          viễn và không thể khôi phục. Vui lòng chắc chắn rằng bạn đã sao lưu
          mọi thông tin quan trọng trước khi tiếp tục.
        </p>
        <DeleteAccountDialog />
      </div>
    </div>
  );
}

export default DeleteAccount;
