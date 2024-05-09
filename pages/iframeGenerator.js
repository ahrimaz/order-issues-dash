import { useState } from "react";

export default function GenerateIframe() {
    const [account, setAccount] = useState('');
    const [iframeCode, setIframeCode] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const iframeSrc = `https://order-issues-dash.vercel.app/orderStatus/orderStatus?account=${account}`;
      const generatedIframeCode = `<iframe src="${iframeSrc}" width="500" height="300"></iframe>`;
      setIframeCode(generatedIframeCode);
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Account:
            <input type="text" value={account} onChange={(e) => setAccount(e.target.value)} />
          </label>
          <button type="submit">Generate</button>
        </form>
        {iframeCode && (
          <div>
            <h3>Your iframe code:</h3>
            <code>{iframeCode}</code>
          </div>
        )}
      </div>
    );
  }