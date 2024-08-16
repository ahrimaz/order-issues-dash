export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { orderID, format, type } = req.body;
  const { account } = req.query; // extract account from URL parameters

  const authHeader = `Basic ${Buffer.from('DI:RPLAPI').toString('base64')}`;

  try {
    const formData = new URLSearchParams();
    formData.append('account', account);
    formData.append('orderID', orderID);
    formData.append('format', format);
    formData.append('type', type);

    const response = await fetch('https://dmz.richmondprolab.net/OrderAPI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authHeader,
      },
      body: formData,
    });

    console.log(response);

    if (!response.ok) {
      throw new Error('Unable to find order status. Contact Studio for further assistance.');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Unable to find order status. Contact Studio for further assistance.' });
  }
}