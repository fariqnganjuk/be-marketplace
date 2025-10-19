import env from "./env";
import { Xendit } from "xendit-node"; // ✅ gunakan named import

const secretKey = env.XENDIT_SECRET_API_KEY;
const useXendit = !!secretKey && secretKey.startsWith("xnd_");

let Invoice: any;
let Payout: any;
let Balance: any;

if (useXendit) {
  console.log("✅ Xendit LIVE mode aktif");

  // Inisialisasi instance
  const x = new Xendit({ secretKey });

  // Ambil modul-modulnya dari instance
  Invoice = x.Invoice;
  Payout = x.Payout;
  Balance = x.Balance;
} else {
  console.log("⚠️  Xendit belum diaktifkan — pakai DUMMY mode");

  Invoice = {
    create: async (data: any) => ({
      id: "dummy_invoice_001",
      external_id: data.external_id || "ext_001",
      amount: data.amount || 0,
      invoice_url: "http://localhost:3000/dummy-invoice",
      status: "PENDING",
    }),
  };

  Payout = {
    create: async (data: any) => ({
      id: "dummy_payout_001",
      amount: data.amount || 0,
      status: "SUCCESS",
    }),
  };

  Balance = {
    getBalance: async () => ({
      balance: 999999,
      currency: "IDR",
    }),
  };
}

export { Invoice, Payout, Balance };
