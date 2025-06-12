
import React, { useState } from 'react';
import { FileText, Plus, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

const InvoiceGenerator = () => {
  const [companyName, setCompanyName] = useState('');
  const [clientName, setClientName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: '', quantity: 1, rate: 0, amount: 0 }
  ]);

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    if (field === 'quantity' || field === 'rate') {
      newItems[index][field] = typeof value === 'string' ? parseFloat(value) || 0 : value;
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    } else {
      newItems[index][field] = value as any;
    }
    setItems(newItems);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  const generatePDF = () => {
    // Simple print functionality
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoice Generator</h1>
        <p className="text-gray-600">Create professional invoices for your business</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Invoice Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your Company Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
              <Input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Client Company/Name"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Invoice #</label>
                <Input
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  placeholder="INV-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <h4 className="text-lg font-semibold mt-6 mb-4">Items</h4>
          
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 mb-3">
              <Input
                className="col-span-5"
                placeholder="Description"
                value={item.description}
                onChange={(e) => updateItem(index, 'description', e.target.value)}
              />
              <Input
                className="col-span-2"
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
              />
              <Input
                className="col-span-2"
                type="number"
                placeholder="Rate"
                value={item.rate}
                onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
              />
              <div className="col-span-2 flex items-center text-sm font-medium">
                ${item.amount.toFixed(2)}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="col-span-1"
                onClick={() => removeItem(index)}
                disabled={items.length === 1}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          <Button onClick={addItem} variant="outline" className="w-full mb-4">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </Card>

        {/* Invoice Preview */}
        <Card className="p-6">
          <div className="border-2 border-dashed border-gray-200 p-6 min-h-[600px]">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{companyName || 'Your Company'}</h2>
              <h3 className="text-xl font-semibold text-gray-700 mt-2">INVOICE</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900">Bill To:</h4>
                <p className="text-gray-700">{clientName || 'Client Name'}</p>
              </div>
              <div className="text-right">
                <p><span className="font-semibold">Invoice #:</span> {invoiceNumber || 'INV-001'}</p>
                <p><span className="font-semibold">Date:</span> {date}</p>
              </div>
            </div>
            
            <table className="w-full mb-6">
              <thead className="border-b-2 border-gray-200">
                <tr>
                  <th className="text-left py-2">Description</th>
                  <th className="text-center py-2">Qty</th>
                  <th className="text-right py-2">Rate</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-2">{item.description || 'Item description'}</td>
                    <td className="text-center py-2">{item.quantity}</td>
                    <td className="text-right py-2">${item.rate.toFixed(2)}</td>
                    <td className="text-right py-2">${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="text-right">
              <div className="text-xl font-bold">
                Total: ${totalAmount.toFixed(2)}
              </div>
            </div>
          </div>
          
          <Button onClick={generatePDF} className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-500">
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
