import OrderCheck from "@/components/orderChecker";
import GenerateIframe from "./iframeGenerator";

const OrderCheckPage = () => {
  return (
    <div className="p-24 mb-4 overflow-hidden">
      <OrderCheck /> <GenerateIframe />
    </div>
  );
};

export default OrderCheckPage;
