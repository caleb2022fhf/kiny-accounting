'use client';
import { useState } from 'react';

export default function Dashboard() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(15000);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [smsNotification, setSmsNotification] = useState('');
  const [transactions, setTransactions] = useState([
    { id: 'TXN-001', type: 'DEPOSIT', amount: 15000, phone: '0788123456', status: 'SUCCESS', date: '2026-10-27 10:30' }
  ]);

  const handleDeposit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setSmsNotification('');

    try {
      const res = await fetch('/api/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, amount: Number(amount) }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Ubusabe bwo kubitsa bwoherejwe! Reba kuri telefoni yawe wemeze PIN.');
        
        setTimeout(() => {
          const addedAmount = Number(amount);
          setBalance((prev) => prev + addedAmount);
          setSmsNotification(`📱 SMS Nshya: "Yello! Uhemerewe kubitsa RWF ${addedAmount.toLocaleString()} kuri Account yawe. Balance nshya ni RWF ${(balance + addedAmount).toLocaleString()}."`);
          
          setTransactions((prev) => [
            {
              id: `TXN-00${prev.length + 1}`,
              type: 'DEPOSIT',
              amount: addedAmount,
              phone: phone,
              status: 'SUCCESS',
              date: new Date().toLocaleString()
            },
            ...prev
          ]);

          setPhone('');
          setAmount('');
        }, 3000);

      } else {
        setMessage(`Ikosa: ${data.error || 'Habaye ikibazo'}`);
      }
    } catch (err) {
      setMessage('Habaye ikibazo cya Network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6">
      <header className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Kinyarwanda Accounting</h1>
          <p className="text-xs sm:text-sm text-gray-500">System y'Icungamutungo & Kubitsa</p>
        </div>
        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Active</span>
      </header>

      {smsNotification && (
        <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded shadow-sm flex items-center justify-between">
          <p className="font-medium text-sm sm:text-base">{smsNotification}</p>
          <button onClick={() => setSmsNotification('')} className="text-xs bg-yellow-200 hover:bg-yellow-300 text-yellow-900 px-2 py-1 rounded">
            Funga
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-blue-600 text-white rounded-xl p-5 shadow-md">
            <p className="text-xs uppercase tracking-wide opacity-80">Amafaranga ariho (Balance)</p>
            <h2 className="text-3xl font-extrabold mt-1">{balance.toLocaleString()} RWF</h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Kubitsa Amafaranga</h3>
            <form onSubmit={handleDeposit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Telefoni (MTN / Airtel)</label>
                <input
                  type="tel"
                  placeholder="0788123456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Amafaranga (RWF)</label>
                <input
                  type="number"
                  placeholder="5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="100"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg transition text-sm disabled:opacity-50"
              >
                {loading ? 'Tegereza...' : 'Bitsa Sasa'}
              </button>
            </form>

            {message && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
                {message}
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Igitabo cy'Imari (Accounting Ledger)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 border-b">
                <tr>
                  <th className="py-3 px-3">ID</th>
                  <th className="py-3 px-3">Ubwoko</th>
                  <th className="py-3 px-3">Telefoni</th>
                  <th className="py-3 px-3">Amafaranga</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50">
                    <td className="py-3 px-3 font-mono text-xs">{txn.id}</td>
                    <td className="py-3 px-3 text-xs font-semibold text-green-600">{txn.type}</td>
                    <td className="py-3 px-3">{txn.phone}</td>
                    <td className="py-3 px-3 font-bold text-gray-800">+{txn.amount.toLocaleString()} RWF</td>
                    <td className="py-3 px-3">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded font-medium">
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}