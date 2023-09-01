let invoices = [];

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
      invoiceStatut,
      invoiceAdress,
      invoiceCity,
      invoiceClientCity,
      invoiceClientCountry,
      invoiceClientEmail,
      invoiceClientPostCode,
      invoiceClientStreetAddress,
      invoiceCountry,
      invoicePostCode,
      invoiceProjectDescription,
      invoicePaymentTerms,
      ...dynamicKeys
    } = req.body;

    // Create a new invoice object
    const newInvoice = {
      id,
      invoiceClientName,
      invoiceInvoiceDate,
      invoiceStatut,
      invoiceAdress,
      invoiceCity,
      invoiceClientCity,
      invoiceClientCountry,
      invoiceClientEmail,
      invoiceClientPostCode,
      invoiceClientStreetAddress,
      invoiceCountry,
      invoicePostCode,
      invoiceProjectDescription,
      invoicePaymentTerms,
    };

    // Add dynamic keys and values to the new invoice object
    for (const key in dynamicKeys) {
      newInvoice[key] = dynamicKeys[key];
    }

    invoices.push(newInvoice);
    res.status(201).json(newInvoice);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
