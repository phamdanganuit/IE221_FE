import React, { useEffect, useState } from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../ui/item";
import { Switch } from "../ui/switch";

const NotifItem = ({ title, description, value, setValue, disabled }) => {
  return (
    <div>
      <Item>
        <ItemContent>
          <ItemTitle
            className={`font-semibold text-lg ${
              !disabled ? "text-black" : "text-gray-300"
            }`}
          >
            {title}
          </ItemTitle>
          <ItemDescription
            className={`${!disabled ? "text-black" : "text-gray-300"}`}
          >
            {description}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Switch
            disabled={disabled}
            checked={value}
            onCheckedChange={setValue}
          />
        </ItemActions>
      </Item>
    </div>
  );
};

function NotifSetting() {
  const [isLoaded, setIsLoaded] = useState(false); // To prevent hydration issues
  const [emailNotif, setEmailNotif] = useState(true);
  const [emailUpdate, setEmailUpdate] = useState(true);
  const [emailSale, setEmailSale] = useState(true);
  const [emailSurvey, setEmailSurvey] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [smsSale, setSmsSale] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("notifSettings");
    if (stored) {
      const data = JSON.parse(stored);
      setEmailNotif(data.emailNotif ?? true);
      setEmailUpdate(data.emailUpdate ?? true);
      setEmailSale(data.emailSale ?? true);
      setEmailSurvey(data.emailSurvey ?? true);
      setSmsNotif(data.smsNotif ?? false);
      setSmsSale(data.smsSale ?? false);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const settings = {
      emailNotif,
      emailUpdate,
      emailSale,
      emailSurvey,
      smsNotif,
      smsSale,
    };
    localStorage.setItem("notifSettings", JSON.stringify(settings));
  }, [emailNotif, emailUpdate, emailSale, emailSurvey, smsNotif, smsSale]);

  useEffect(() => {
    if (!isLoaded) return;
    // if emailNotif off, turn off all email settings
    if (!emailNotif) {
      setEmailUpdate(false);
      setEmailSale(false);
      setEmailSurvey(false);
    }
    // if smsNotif off, turn off smsSale
    if (!smsNotif) {
      setSmsSale(false);
    }
  }, [emailNotif, smsNotif]);

  return (
    <div className="flex-col space-y-[10px] w-full">
      <p className="text-2xl font-semibold mb-4">Cài đặt thông báo</p>
      <div className="w-full space-y-2">
        <NotifItem
          title={"Email thông báo"}
          description={
            "Thông báo và nhắc nhở quan trọng về tài khoản sẽ không thể bị tắt"
          }
          value={emailNotif}
          setValue={setEmailNotif}
        />
        <div className={`pl-6 ${emailNotif ? "" : "bg-opacity/70"}`}>
          <NotifItem
            disabled={!emailNotif}
            title={"Cập nhật đơn hàng"}
            description={
              "Cập nhật về tình trạng vận chuyển của tất cả các đơn hàng"
            }
            value={emailUpdate}
            setValue={setEmailUpdate}
          />
          <NotifItem
            disabled={!emailNotif}
            title={"Khuyến mãi"}
            description={"Cập nhật về các ưu đãi và khuyến mãi sắp tới"}
            value={emailSale}
            setValue={setEmailSale}
          />
          <NotifItem
            disabled={!emailNotif}
            title={"Khảo sát"}
            description={
              "Đồng ý nhận khảo sát để cho chúng tôi được lắng nghe bạn"
            }
            value={emailSurvey}
            setValue={setEmailSurvey}
          />
        </div>
        <NotifItem
          title={"Thông báo SMS"}
          description={
            "Thông báo và nhắc nhở quan trọng về tài khoản sẽ không thể bị tắt"
          }
          value={smsNotif}
          setValue={setSmsNotif}
        />
        <div className="pl-6">
          <NotifItem
            disabled={!smsNotif}
            title={"Khuyến mãi"}
            description={"Cập nhật về các ưu đãi và khuyến mãi sắp tới"}
            value={smsSale}
            setValue={setSmsSale}
          />
        </div>
      </div>
    </div>
  );
}

export default NotifSetting;
