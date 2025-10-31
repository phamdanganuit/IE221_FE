import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { getSocialLinks, linkGoogleAccount, unlinkGoogleAccount, linkFacebookAccount, unlinkFacebookAccount } from "@/service/accountService";
import { useToast } from "@/contexts/ToastContext";

// Load Google OAuth script helper
const loadGoogleScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Load Facebook SDK script helper
const loadFacebookScript = () => {
  return new Promise((resolve, reject) => {
    if (window.FB) {
      if (window.FB.getAppId && window.FB.getAppId() === import.meta.env.VITE_FACEBOOK_APP_ID) {
        resolve();
        return;
      }
    }

    const existingScript = document.querySelector('script[src="https://connect.facebook.net/en_US/sdk.js"]');
    if (existingScript) {
      const checkFB = setInterval(() => {
        if (window.FB) {
          window.FB.init({
            appId: import.meta.env.VITE_FACEBOOK_APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v18.0',
            autoLogAppEvents: false
          });
          clearInterval(checkFB);
          resolve();
        }
      }, 100);
      setTimeout(() => {
        clearInterval(checkFB);
        if (!window.FB) reject(new Error('Facebook SDK timeout'));
      }, 10000);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v18.0',
        autoLogAppEvents: false
      });
      resolve();
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

function LinkAccount() {
  const [isLoading, setIsLoading] = useState(true);
  const [facebookLinked, setFacebookLinked] = useState(false);
  const [googleLinked, setGoogleLinked] = useState(false);
  const [isLinking, setIsLinking] = useState({ google: false, facebook: false });
  const { success, error } = useToast();

  const fetchLinks = async () => {
    setIsLoading(true);
    const result = await getSocialLinks();
    if (result.success) {
      setGoogleLinked(result.data.google);
      setFacebookLinked(result.data.facebook);
    } else {
      error(result.error || "Không thể lấy thông tin liên kết");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleGoogleLink = async () => {
    if (googleLinked) return;
    
    setIsLinking(prev => ({ ...prev, google: true }));
    
    try {
      if (typeof window.google === 'undefined') {
        await loadGoogleScript();
      }

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: 'email profile',
        callback: async (response) => {
          if (response.error) {
            error("Liên kết Google thất bại: " + response.error);
            setIsLinking(prev => ({ ...prev, google: false }));
            return;
          }

          try {
            const result = await linkGoogleAccount(response.access_token);
            if (result.success) {
              success(result.message);
              setGoogleLinked(true);
              await fetchLinks(); // Refresh links
            } else {
              error(result.error);
            }
          } catch (err) {
            console.error("Lỗi liên kết Google:", err);
            error("Có lỗi xảy ra khi liên kết tài khoản Google");
          } finally {
            setIsLinking(prev => ({ ...prev, google: false }));
          }
        }
      });

      client.requestAccessToken();
    } catch (err) {
      console.error("Lỗi Google OAuth:", err);
      error("Không thể khởi tạo Google OAuth");
      setIsLinking(prev => ({ ...prev, google: false }));
    }
  };

  const handleGoogleUnlink = async () => {
    if (!confirm("Bạn có chắc chắn muốn hủy liên kết tài khoản Google không?")) return;
    
    const result = await unlinkGoogleAccount();
    if (result.success) {
      success(result.message);
      setGoogleLinked(false);
    } else {
      error(result.error);
    }
  };

  const handleFacebookLink = async () => {
    if (facebookLinked) return;
    
    setIsLinking(prev => ({ ...prev, facebook: true }));
    
    try {
      await loadFacebookScript();

      window.FB.login((response) => {
        if (response.authResponse) {
          const processLink = async () => {
            try {
              const result = await linkFacebookAccount(response.authResponse.accessToken);
              if (result.success) {
                success(result.message);
                setFacebookLinked(true);
                await fetchLinks(); // Refresh links
              } else {
                error(result.error);
              }
            } catch (err) {
              console.error("Lỗi liên kết Facebook:", err);
              error("Có lỗi xảy ra khi liên kết tài khoản Facebook");
            } finally {
              setIsLinking(prev => ({ ...prev, facebook: false }));
            }
          };
          
          processLink();
        } else {
          error("Liên kết Facebook bị hủy");
          setIsLinking(prev => ({ ...prev, facebook: false }));
        }
      }, { scope: 'email,public_profile' });
    } catch (err) {
      console.error("Lỗi Facebook OAuth:", err);
      error("Không thể khởi tạo Facebook OAuth");
      setIsLinking(prev => ({ ...prev, facebook: false }));
    }
  };

  const handleFacebookUnlink = async () => {
    if (!confirm("Bạn có chắc chắn muốn hủy liên kết tài khoản Facebook không?")) return;
    
    const result = await unlinkFacebookAccount();
    if (result.success) {
      success(result.message);
      setFacebookLinked(false);
    } else {
      error(result.error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center font-semibold text-2xl gap-2">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[#5BC0BE] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex-col space-y-[10px] w-full">
      <p className="text-2xl font-semibold mb-4">Liên kết tài khoản</p>
      <div className="w-full space-y-8">
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <p className="self-start font-semibold">Tài khoản Google</p>
          <div className="flex gap-2 w-full">
            <Button
              variant={"outline"}
              className="flex space-x-4 items-center flex-1 text-lg h-12"
              disabled={googleLinked || isLinking.google}
              onClick={handleGoogleLink}
            >
              <FaGoogle className="w-10 h-10" />
              {isLinking.google
                ? "Đang liên kết..."
                : !googleLinked
                ? "Liên kết với tài khoản Google"
                : "Đã liên kết với tài khoản Google"}
            </Button>
            {googleLinked && (
              <Button
                variant="destructive"
                className="h-12"
                onClick={handleGoogleUnlink}
              >
                Hủy liên kết
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <p className="self-start font-semibold">Tài khoản Facebook</p>
          <div className="flex gap-2 w-full">
            <Button
              variant={"outline"}
              className="flex space-x-4 items-center flex-1 text-lg h-12"
              disabled={facebookLinked || isLinking.facebook}
              onClick={handleFacebookLink}
            >
              <FaFacebook className="w-10 h-10" />
              {isLinking.facebook
                ? "Đang liên kết..."
                : !facebookLinked
                ? "Liên kết với tài khoản Facebook"
                : "Đã liên kết với tài khoản Facebook"}
            </Button>
            {facebookLinked && (
              <Button
                variant="destructive"
                className="h-12"
                onClick={handleFacebookUnlink}
              >
                Hủy liên kết
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkAccount;
