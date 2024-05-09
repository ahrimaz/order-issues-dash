import { useState, useEffect } from "react";

export default function GenerateIframe({ account }) {
    const [iframeCode, setIframeCode] = useState('');
  
    useEffect(() => {
      const iframeSrc = `https://order-issues-dash.vercel.app/orderStatus/orderStatus?account=${account}`;
      const generatedIframeCode = `<iframe src="${iframeSrc}" width="500" height="300"></iframe>`;
      setIframeCode(generatedIframeCode);
    }, [account]);
  
    return (
      <div>
        {iframeCode && (
          <div>
            <h3>Your iframe code:</h3>
            <code>{iframeCode}</code>
          </div>
        )}
      </div>
    );
}