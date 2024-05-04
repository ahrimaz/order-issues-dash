import { useState } from "react";

const OrderCard = ({ order }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [image, setImage] = useState(null);
  
    const toggleDetails = () => {
      setShowDetails(!showDetails);
    };
  
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setImage(file);
  
    };
  
    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleString(); // use toLocaleString to format the date and time - no need for a utility
    };
  
    return (
      <div className="border border-gray-300 rounded-lg mb-4 overflow-hidden">
        <div className="p-4 cursor-pointer" onClick={toggleDetails}>
          <div className="flex justify-between">
            <div className="font-bold text-lg">{order.orderNumber}</div>
            <div className="text-gray-600">{order.userId}</div>
          </div>
          <div className="text-gray-700">{order.circumstance}</div>
        </div>
        {showDetails && (
          <div className="p-4 bg-gray-100">
            <div>Studio: {order.studio}</div>
            <div>DP Numbers: {order.dpNumber}</div>
            <div>Items, Quantity, Surface: {order.itemsQtyItemSurface}</div>
            <div>Retouch Adjustment: {order.retouchAdjustment}</div>
            <div>DP2 Adjustment: {order.dp2Adjustment}</div>
            <div>Preprint Adjustment: {order.preprintAdjustment}</div>
            <div>Date: {formatTimestamp(order.timeStamp)}</div>
            <div>DP2 Approved: {order.buttonClicked} by {order.userName}</div>
            <input type="file" onChange={handleImageChange} />
            {image && <img src={URL.createObjectURL(image)} alt="Uploaded" className="mt-4" />}
          </div>
        )}
      </div>
    );
  };

  export default OrderCard;