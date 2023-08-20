let invoices = [];

/*function generateCustomId() {
  const randomLetters = Array.from({ length: 2 }, () => {
    const randomCharCode = Math.floor(Math.random() * 26) + 65; // A-Z ASCII range
    return String.fromCharCode(randomCharCode);
  }).join('');

  const randomNum = Math.floor(Math.random() * 9000) + 1000;

  return `#${randomLetters}${randomNum}`;
}*/

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Handle GET request
    res.status(200).json(invoices);
  } else if (req.method === 'POST') {
    // Handle POST request
    const { 
      id,
      invoiceClientName,
      invoiceInvoiceDate,
      invoicePrice,
      invoiceStatut } = req.body;
    const newInvoice = { 
      id
      //generateCustomId()
      ,
      invoiceClientName,
      invoiceInvoiceDate,
      invoicePrice,
      invoiceStatut
     };
    invoices.push(newInvoice);
    res.status(201).json(newInvoice);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
