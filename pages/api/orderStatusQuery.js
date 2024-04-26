import axios from 'axios';

export default async function handler(req, res) {
  const { account, orderID } = req.body;

  const authHeader = `Basic ${Buffer.from('DI:RPLAPI').toString('base64')}`;

  try {
    const response = await axios.post(
      'https://dmz.richmondprolab.net/OrderAPI',
      {
        account,
        orderID,
        format: 'json',
        type: 'standard',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: authHeader,
        },
        params: {
          format: 'json',
        },
      }
    );

    if (response.data.error) {
      res.status(400).json({ error: response.data.error });
    } else {
      res.status(200).json(response.data);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order status. Please try again later.' });
  }
}
