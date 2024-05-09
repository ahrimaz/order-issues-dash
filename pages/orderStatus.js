import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import OrderCheck from "@/components/orderChecker";
import GenerateIframe from "./iframeGenerator";

const OrderCheckPage = () => {
  const router = useRouter();
  const [account, setAccount] = useState('');

  useEffect(() => {
    if (router.query.account) {
      setAccount(router.query.account);
    }
  }, [router.query]);

  return (
    <div className="p-24 mb-4 overflow-hidden">
      <OrderCheck setAccount={setAccount} /> 
      <GenerateIframe account={account} />
    </div>
  );
};

export default OrderCheckPage;