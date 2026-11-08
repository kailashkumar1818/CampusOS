import React, { useState } from 'react';
import { Download, Printer, CheckCircle2, AlertCircle, CreditCard, DollarSign } from 'lucide-react';
import Modal from '../../components/common/Modal';

const StudentFinance = () => {
  const [activeTab, setActiveTab] = useState('paid'); // 'paid' | 'due' | 'verification' | 'acknowledgment' | 'bank'
  const [payModal, setPayModal] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paySuccess, setPaySuccess] = useState('');

  const [dues, setDues] = useState([
    {
      id: 'DUE-2026-0501',
      sem: 5,
      head: 'Tuition & Academic Term Fee (Odd Semester 2026-2027)',
      dueDate: '20-Nov-2026',
      fine: '₹ 0.00',
      amount: 65000,
    },
    {
      id: 'DUE-2026-0502',
      sem: 5,
      head: 'Semester End Examination & Grade Card Assessment Fee',
      dueDate: '25-Nov-2026',
      fine: '₹ 0.00',
      amount: 3500,
    },
  ]);

  const [paidReceipts, setPaidReceipts] = useState([
    {
      challanNo: 'REC-2026-0091',
      ay: '2026-2027',
      sem: 5,
      head: 'Hostel Accommodation & Mess Advance (Term 1)',
      amount: '₹ 38,000.00',
      bankRef: 'HDFC-TXN-902148',
      mode: 'NetBanking / Razorpay',
      date: '02-Aug-2026',
    },
    {
      challanNo: 'REC-2025-8840',
      ay: '2025-2026',
      sem: 4,
      head: 'Tuition Fee (Even Semester 2025-2026)',
      amount: '₹ 65,000.00',
      bankRef: 'ICICI-UPI-884021',
      mode: 'UPI / Direct Debit',
      date: '10-Jan-2026',
    },
    {
      challanNo: 'REC-2025-7192',
      ay: '2025-2026',
      sem: 3,
      head: 'Tuition Fee (Odd Semester 2025-2026)',
      amount: '₹ 65,000.00',
      bankRef: 'SBI-NEFT-719203',
      mode: 'NEFT Transfer',
      date: '15-Jul-2025',
    },
  ]);

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newPaid = {
        challanNo: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        ay: '2026-2027',
        sem: payModal.sem,
        head: payModal.head,
        amount: `₹ ${payModal.amount.toLocaleString()}.00`,
        bankRef: `PAY-GATE-${Math.floor(100000 + Math.random() * 900000)}`,
        mode: 'Online Payment Gateway',
        date: '05-Nov-2026',
      };
      setPaidReceipts([newPaid, ...paidReceipts]);
      setDues(dues.filter((d) => d.id !== payModal.id));
      setPaySuccess(`Payment of ₹${payModal.amount.toLocaleString()} processed successfully! Challan generated: ${newPaid.challanNo}`);
      setPayModal(null);
    }, 1200);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Header Banner */}
      <div className="bg-[#d2ecf7] dark:bg-sky-950/50 py-3 px-5 rounded-t-sm shadow-sm border-b border-[#b7dfef] dark:border-sky-900">
        <h1 className="text-[17px] font-bold text-[#1d607e] dark:text-sky-300 tracking-wide uppercase">
          FINANCE & FEE DETAILS
        </h1>
      </div>

      {/* 2. Gray Status Banner */}
      <div className="bg-[#6b7280] dark:bg-slate-700 text-white py-2 px-4 rounded-md text-center shadow-sm">
        <p className="text-xs sm:text-[13px] font-semibold tracking-wide">
          Directorate of Finance, Accounts & Institutional Remittance
        </p>
      </div>

      {/* Success Notification */}
      {paySuccess && (
        <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
          {paySuccess}
        </div>
      )}

      {/* 3. Sub-tabs matching the Sidebar Finance items */}
      <div className="flex flex-wrap gap-2 border-b border-slate-300 dark:border-surface-700 pb-1">
        {[
          { id: 'paid', label: 'Fee Paid Details' },
          { id: 'due', label: 'Fee Due Details' },
          { id: 'verification', label: 'Online Payment Verification' },
          { id: 'acknowledgment', label: 'Payment Acknowledgment' },
          { id: 'bank', label: 'Bank Account Details' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
              activeTab === tab.id
                ? 'bg-[#1f3a52] text-white'
                : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Fee Paid Details */}
      {activeTab === 'paid' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-32">Challan / Rec No.</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-24">Academic Year</th>
                  <th className="py-2.5 px-2 border-r border-slate-400 w-16 text-center">Sem</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Fee Head Description</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-right">Amount Paid</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-36">Bank Ref Number</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-36">Payment Mode</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-24">Date</th>
                  <th className="py-2.5 px-3 w-24 text-center">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {paidReceipts.map((row) => (
                  <tr key={row.challanNo} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {row.challanNo}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {row.ay}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold border-r border-slate-200 dark:border-surface-800">
                      {row.sem}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {row.head}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-right border-r border-slate-200 dark:border-surface-800 text-slate-900 dark:text-white">
                      {row.amount}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[10px] border-r border-slate-200 dark:border-surface-800 text-slate-600 dark:text-slate-400">
                      {row.bankRef}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {row.mode}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {row.date}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => alert(`Downloading verified institutional PDF receipt: ${row.challanNo}`)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-[10px] font-bold shadow-sm"
                      >
                        <Download className="w-3 h-3" /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Fee Due Details */}
      {activeTab === 'due' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          {dues.length === 0 ? (
            <div className="p-8 text-center text-xs text-emerald-700 font-bold">
              All academic and hostel fee dues for the current semester are fully settled.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                    <th className="py-2.5 px-3 border-r border-slate-400 w-32">Due ID</th>
                    <th className="py-2.5 px-2 border-r border-slate-400 w-16 text-center">Sem</th>
                    <th className="py-2.5 px-4 border-r border-slate-400">Fee Component</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-28">Due Date</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-24 text-right">Fine</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-32 text-right">Total Payable</th>
                    <th className="py-2.5 px-3 w-28 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                  {dues.map((item) => (
                    <tr key={item.id} className="hover:bg-amber-50/40 dark:hover:bg-amber-950/20 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        {item.id}
                      </td>
                      <td className="py-2.5 px-2 text-center font-bold border-r border-slate-200 dark:border-surface-800">
                        {item.sem}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        {item.head}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-rose-600 dark:text-rose-400 border-r border-slate-200 dark:border-surface-800">
                        {item.dueDate}
                      </td>
                      <td className="py-2.5 px-3 text-right font-medium border-r border-slate-200 dark:border-surface-800">
                        {item.fine}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        ₹ {item.amount.toLocaleString()}.00
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => setPayModal(item)}
                          className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold shadow-sm"
                        >
                          Pay Online
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Online Payment Verification */}
      {activeTab === 'verification' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 p-5 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-[#1b2b4d] dark:text-sky-300 uppercase">
            Real-Time Bank & Gateway Transaction Reconciliation
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            If money was debited from your bank account or UPI but status did not update automatically, submit your 12-digit Bank UTR / Transaction Reference below for instant verification.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Reconciliation query dispatched to SBI/HDFC Payment Gateway API. Transaction confirmed as settled.');
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Bank UTR / Transaction ID
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 429188402194"
                className="w-full p-2 text-xs border border-slate-300 dark:border-surface-700 rounded bg-white dark:bg-surface-800 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Payment Channel
              </label>
              <select className="w-full p-2 text-xs border border-slate-300 dark:border-surface-700 rounded bg-white dark:bg-surface-800">
                <option>UPI (Google Pay / PhonePe / Paytm)</option>
                <option>Net Banking (HDFC / SBI / ICICI)</option>
                <option>Debit / Credit Card</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 px-3 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-xs font-bold shadow-sm"
              >
                Verify Transaction
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 4: Payment Acknowledgment */}
      {activeTab === 'acknowledgment' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="text-sm font-bold text-[#1b2b4d] dark:text-white uppercase">
                OFFICIAL PAYMENT ACKNOWLEDGMENT SLIP
              </h2>
              <p className="text-[11px] text-slate-500">Document Reference: ACK-2026-AUG-0091</p>
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-300 dark:border-surface-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" /> Print Acknowledgment
            </button>
          </div>

          <div className="grid grid-cols-2 text-xs gap-3 py-2">
            <div>
              <span className="text-slate-500 font-medium">Student Name:</span>
              <p className="font-bold text-slate-900 dark:text-white">RAHUL KUMAR</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Register Number:</span>
              <p className="font-bold text-slate-900 dark:text-white font-mono">EN2024CS042</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Program / Department:</span>
              <p className="font-bold text-slate-900 dark:text-white">B.Tech Computer Science & Engineering</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Payment Head:</span>
              <p className="font-bold text-slate-900 dark:text-white">Hostel Accommodation & Mess Advance</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Amount Received:</span>
              <p className="font-bold text-emerald-700 dark:text-emerald-400 font-mono text-sm">₹ 38,000.00</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Status:</span>
              <p className="font-bold text-emerald-700 dark:text-emerald-400">DIGITALLY VERIFIED & CREDITED</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Bank Account Details */}
      {activeTab === 'bank' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="bg-[#1f3a52] text-white py-2 px-4">
            <h2 className="text-xs font-bold tracking-wide">
              Official University Remittance Bank Coordinates
            </h2>
          </div>
          <table className="w-full text-left border-collapse text-xs">
            <tbody className="divide-y divide-slate-200 dark:divide-surface-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-surface-800/40">
                <td className="py-2.5 px-4 font-bold text-slate-600 dark:text-slate-400 w-64 border-r border-slate-200 dark:border-surface-700">
                  Beneficiary Account Name
                </td>
                <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white">
                  CAMPUSOS UNIVERSITY TRUST - STUDENT FEE COLLECTION A/C
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-surface-800/40">
                <td className="py-2.5 px-4 font-bold text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-surface-700">
                  Virtual Account Number (Student Specific)
                </td>
                <td className="py-2.5 px-4 font-mono font-bold text-brand-700 dark:text-brand-300">
                  CAMPUS2024EN042
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-surface-800/40">
                <td className="py-2.5 px-4 font-bold text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-surface-700">
                  Bank Name & Branch
                </td>
                <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white">
                  State Bank of India (SBI) - University Campus Branch
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-surface-800/40">
                <td className="py-2.5 px-4 font-bold text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-surface-700">
                  IFSC Code
                </td>
                <td className="py-2.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                  SBIN0014290
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-surface-800/40">
                <td className="py-2.5 px-4 font-bold text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-surface-700">
                  Swift Code (For International Remittance)
                </td>
                <td className="py-2.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                  SBININBB429
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Online Payment */}
      {payModal && (
        <Modal
          isOpen={!!payModal}
          onClose={() => setPayModal(null)}
          title="Online Fee Remittance Gateway"
        >
          <form onSubmit={handlePay} className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-surface-800 rounded border border-slate-200 dark:border-surface-700 space-y-1">
              <span className="text-slate-500 font-medium">Payment Head:</span>
              <p className="font-bold text-slate-900 dark:text-white">{payModal.head}</p>
              <div className="pt-2 flex justify-between font-bold text-sm">
                <span>Total Amount:</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-mono">
                  ₹ {payModal.amount.toLocaleString()}.00
                </span>
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1">Select Payment Gateway</label>
              <select className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800">
                <option>State Bank of India Multi Option Payment System (MOPS)</option>
                <option>HDFC SmartHub Portal</option>
                <option>Razorpay UPI / Instant NetBanking</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPayModal(null)}
                className="px-3 py-1.5 rounded border border-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              >
                {isProcessing ? 'Connecting to Gateway...' : 'Proceed to Pay Securely'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default StudentFinance;
