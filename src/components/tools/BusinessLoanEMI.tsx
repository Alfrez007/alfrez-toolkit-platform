
import React, { useState } from 'react';
import { DollarSign, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const BusinessLoanEMI = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [results, setResults] = useState<{
    emi: number;
    totalPayment: number;
    totalInterest: number;
    breakdown: Array<{month: number, emi: number, principal: number, interest: number, balance: number}>;
  } | null>(null);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = (parseFloat(interestRate) || 0) / 12 / 100;
    const time = parseFloat(loanTerm) || 0;
    
    if (principal <= 0 || rate <= 0 || time <= 0) return;
    
    const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    const totalPayment = emi * time;
    const totalInterest = totalPayment - principal;
    
    // Generate amortization schedule (first 12 months)
    const breakdown = [];
    let balance = principal;
    
    for (let month = 1; month <= Math.min(12, time); month++) {
      const interestPayment = balance * rate;
      const principalPayment = emi - interestPayment;
      balance = balance - principalPayment;
      
      breakdown.push({
        month,
        emi: emi,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }
    
    setResults({
      emi,
      totalPayment,
      totalInterest,
      breakdown
    });
  };

  const reset = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setResults(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-4">
          <DollarSign className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Loan EMI Calculator</h1>
        <p className="text-gray-600">Calculate your monthly loan payments and amortization schedule</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Loan Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount ($)
              </label>
              <Input
                type="number"
                placeholder="Enter loan amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Interest Rate (%)
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="Enter interest rate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Term (months)
              </label>
              <Input
                type="number"
                placeholder="Enter loan term in months"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={calculateEMI}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculate EMI
              </Button>
              <Button onClick={reset} variant="outline">
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {results && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">EMI Calculation Results</h3>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  ${results.emi.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Monthly EMI</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    ${results.totalPayment.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-600">Total Payment</div>
                </div>
                
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-lg font-bold text-red-600">
                    ${results.totalInterest.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-600">Total Interest</div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {results && results.breakdown.length > 0 && (
        <Card className="p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4">Amortization Schedule (First 12 Months)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2">Month</th>
                  <th className="text-right py-2">EMI</th>
                  <th className="text-right py-2">Principal</th>
                  <th className="text-right py-2">Interest</th>
                  <th className="text-right py-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {results.breakdown.map((row) => (
                  <tr key={row.month} className="border-b border-gray-100">
                    <td className="py-2">{row.month}</td>
                    <td className="text-right py-2">${row.emi.toFixed(2)}</td>
                    <td className="text-right py-2">${row.principal.toFixed(2)}</td>
                    <td className="text-right py-2">${row.interest.toFixed(2)}</td>
                    <td className="text-right py-2">${row.balance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default BusinessLoanEMI;
