// BizFlow AI - Mock Database

export interface BranchData {
  id: string;
  name: string;
  revenue: number;
  salesGrowth: number;
  expenses: number;
  activeCustomers: number;
  lowStockCount: number;
  revenueHistory: { month: string; amount: number; profit: number; expenses: number }[];
  topProducts: { name: string; sales: number; revenue: number }[];
  customerCategories: { name: string; value: number }[];
}

export const BRANCHES: BranchData[] = [
  {
    id: "delhi",
    name: "Delhi HQ",
    revenue: 1254000,
    salesGrowth: 15.4,
    expenses: 420000,
    activeCustomers: 1240,
    lowStockCount: 4,
    revenueHistory: [
      { month: "Jan", amount: 150000, profit: 90000, expenses: 60000 },
      { month: "Feb", amount: 180000, profit: 110000, expenses: 70000 },
      { month: "Mar", amount: 210000, profit: 130000, expenses: 80000 },
      { month: "Apr", amount: 190000, profit: 115000, expenses: 75000 },
      { month: "May", amount: 240000, profit: 150000, expenses: 90000 },
      { month: "Jun", amount: 284000, profit: 184000, expenses: 100000 },
    ],
    topProducts: [
      { name: "Leather Shoes Pro", sales: 320, revenue: 640000 },
      { name: "Suede Loafers", sales: 240, revenue: 360000 },
      { name: "Sports Sneakers X", sales: 180, revenue: 270000 },
      { name: "Formal Boots", sales: 90, revenue: 180000 },
      { name: "Canvas Slip-ons", sales: 150, revenue: 90000 },
    ],
    customerCategories: [
      { name: "Retail", value: 65 },
      { name: "Wholesale", value: 20 },
      { name: "Corporate", value: 15 },
    ],
  },
  {
    id: "mumbai",
    name: "Mumbai Branch",
    revenue: 985000,
    salesGrowth: 12.8,
    expenses: 350000,
    activeCustomers: 950,
    lowStockCount: 7,
    revenueHistory: [
      { month: "Jan", amount: 120000, profit: 70000, expenses: 50000 },
      { month: "Feb", amount: 140000, profit: 85000, expenses: 55000 },
      { month: "Mar", amount: 165000, profit: 100000, expenses: 65000 },
      { month: "Apr", amount: 155000, profit: 95000, expenses: 60000 },
      { month: "May", amount: 190000, profit: 120000, expenses: 70000 },
      { month: "Jun", amount: 215000, profit: 135000, expenses: 80000 },
    ],
    topProducts: [
      { name: "Leather Shoes Pro", sales: 210, revenue: 420000 },
      { name: "Sports Sneakers X", sales: 220, revenue: 330000 },
      { name: "Suede Loafers", sales: 110, revenue: 165000 },
      { name: "Canvas Slip-ons", sales: 200, revenue: 120000 },
      { name: "Formal Boots", sales: 40, revenue: 80000 },
    ],
    customerCategories: [
      { name: "Retail", value: 55 },
      { name: "Wholesale", value: 30 },
      { name: "Corporate", value: 15 },
    ],
  },
  {
    id: "bangalore",
    name: "Bangalore Hub",
    revenue: 1420000,
    salesGrowth: 18.2,
    expenses: 480000,
    activeCustomers: 1560,
    lowStockCount: 2,
    revenueHistory: [
      { month: "Jan", amount: 180000, profit: 110000, expenses: 70000 },
      { month: "Feb", amount: 200000, profit: 125000, expenses: 75000 },
      { month: "Mar", amount: 230000, profit: 145000, expenses: 85000 },
      { month: "Apr", amount: 220000, profit: 135000, expenses: 85000 },
      { month: "May", amount: 280000, profit: 175000, expenses: 105000 },
      { month: "Jun", amount: 310000, profit: 195000, expenses: 115000 },
    ],
    topProducts: [
      { name: "Sports Sneakers X", sales: 410, revenue: 615000 },
      { name: "Leather Shoes Pro", sales: 280, revenue: 560000 },
      { name: "Suede Loafers", sales: 190, revenue: 285000 },
      { name: "Canvas Slip-ons", sales: 250, revenue: 150000 },
      { name: "Formal Boots", sales: 65, revenue: 130000 },
    ],
    customerCategories: [
      { name: "Retail", value: 70 },
      { name: "Wholesale", value: 10 },
      { name: "Corporate", value: 20 },
    ],
  },
];

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  minStock: number;
  price: number;
  supplier: string;
  category: string;
  prediction: string; // AI prediction string
  branch: string; // "delhi" | "mumbai" | "bangalore"
}

export const INVENTORY: InventoryItem[] = [
  // Delhi
  { id: "inv-1", name: "Leather Shoes Pro", sku: "LSP-001", stock: 120, minStock: 20, price: 2000, supplier: "Apex Leather Works", category: "Formal", prediction: "High demand expected during festival season. No restock needed for 45 days.", branch: "delhi" },
  { id: "inv-2", name: "Suede Loafers", sku: "SL-002", stock: 15, minStock: 25, price: 1500, supplier: "TrendCraft Ltd.", category: "Casual", prediction: "Stock running low. Order 40 units immediately to avoid out-of-stock in 5 days.", branch: "delhi" },
  { id: "inv-3", name: "Sports Sneakers X", sku: "SSX-003", stock: 85, minStock: 15, price: 1500, supplier: "FitStride Supplies", category: "Sports", prediction: "Stable demand. Restock recommended in 20 days.", branch: "delhi" },
  { id: "inv-4", name: "Formal Boots", sku: "FB-004", stock: 8, minStock: 10, price: 2500, supplier: "Apex Leather Works", category: "Formal", prediction: "Low stock alert. Predict sales spike of 12% in rains. Reorder 20 units now.", branch: "delhi" },
  { id: "inv-5", name: "Canvas Slip-ons", sku: "CS-005", stock: 110, minStock: 30, price: 600, supplier: "TrendCraft Ltd.", category: "Casual", prediction: "Overstocked. Run a weekend discount campaign to liquidate surplus.", branch: "delhi" },
  
  // Mumbai
  { id: "inv-6", name: "Leather Shoes Pro", sku: "LSP-001", stock: 45, minStock: 20, price: 2000, supplier: "Apex Leather Works", category: "Formal", prediction: "Moderate demand. Restock in 15 days.", branch: "mumbai" },
  { id: "inv-7", name: "Suede Loafers", sku: "SL-002", stock: 5, minStock: 25, price: 1500, supplier: "TrendCraft Ltd.", category: "Casual", prediction: "Critical Low Stock. Demand is up 15%. Order 50 units today.", branch: "mumbai" },
  { id: "inv-8", name: "Sports Sneakers X", sku: "SSX-003", stock: 120, minStock: 15, price: 1500, supplier: "FitStride Supplies", category: "Sports", prediction: "High volume sales in Mumbai. Order 50 additional units for upcoming sales.", branch: "mumbai" },
  { id: "inv-9", name: "Formal Boots", sku: "FB-004", stock: 2, minStock: 10, price: 2500, supplier: "Apex Leather Works", category: "Formal", prediction: "Low stock. Slow seller in Mumbai, recommend transfer 5 units from Delhi.", branch: "mumbai" },
  
  // Bangalore
  { id: "inv-10", name: "Leather Shoes Pro", sku: "LSP-001", stock: 90, minStock: 20, price: 2000, supplier: "Apex Leather Works", category: "Formal", prediction: "Stable demand. Restock in 30 days.", branch: "bangalore" },
  { id: "inv-11", name: "Suede Loafers", sku: "SL-002", stock: 65, minStock: 25, price: 1500, supplier: "TrendCraft Ltd.", category: "Casual", prediction: "Demand stable. Next restock in 25 days.", branch: "bangalore" },
  { id: "inv-12", name: "Sports Sneakers X", sku: "SSX-003", stock: 350, minStock: 40, price: 1500, supplier: "FitStride Supplies", category: "Sports", prediction: "Extremely high demand due to marathon promo. Stock level is healthy.", branch: "bangalore" },
];

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  totalSpent: number;
  branch: string;
  insights: string;
  risk: "Low" | "Medium" | "High";
}

export const CUSTOMERS: Customer[] = [
  { id: "cust-1", name: "Aarav Mehta", email: "aarav.mehta@gmail.com", phone: "+91 98765 43210", lastVisit: "2026-06-28", totalSpent: 24500, branch: "delhi", insights: "High loyalty customer. Prefers sports sneakers. Responds well to SMS alerts.", risk: "Low" },
  { id: "cust-2", name: "Priya Sharma", email: "priya.sharma@yahoo.com", phone: "+91 99112 23344", lastVisit: "2026-06-15", totalSpent: 12000, branch: "delhi", insights: "Frequent buyer of casual wear. Potential cross-sell candidate for loafers.", risk: "Low" },
  { id: "cust-3", name: "Vikram Malhotra", email: "v.malhotra@corporate.com", phone: "+91 98223 34455", lastVisit: "2026-04-10", totalSpent: 48000, branch: "delhi", insights: "Inactive for 84 days. High churn risk. Suggest automatic WhatsApp discount code.", risk: "High" },
  { id: "cust-4", name: "Ananya Iyer", email: "ananya.iyer@outlook.com", phone: "+91 91234 56789", lastVisit: "2026-06-30", totalSpent: 8500, branch: "mumbai", insights: "New customer. Purchased Formal boots. Keep engaged with onboarding campaign.", risk: "Low" },
  { id: "cust-5", name: "Rohan Das", email: "rohan.das@gmail.com", phone: "+91 88776 65544", lastVisit: "2026-05-02", totalSpent: 15400, branch: "mumbai", insights: "Inactive for 62 days. Churn warning. Send a 'We Miss You' WhatsApp voucher.", risk: "Medium" },
  { id: "cust-6", name: "Siddharth Rao", email: "sidd.rao@techcorp.in", phone: "+91 77665 54433", lastVisit: "2026-07-02", totalSpent: 89000, branch: "bangalore", insights: "VIP wholesale client. Orders bulk shoes. Active and extremely profitable.", risk: "Low" },
  { id: "cust-7", name: "Kirti Patel", email: "kirti.patel@outlook.com", phone: "+91 96543 21098", lastVisit: "2026-06-25", totalSpent: 18500, branch: "bangalore", insights: "Prefers formal footwear. Good response rate to email newsletters.", risk: "Low" },
];

export interface Employee {
  id: string;
  name: string;
  role: string;
  branch: string;
  attendance: string; // "95%"
  salary: number;
  status: "Active" | "On Leave" | "Suspended";
  leaveBalance: number;
}

export const EMPLOYEES: Employee[] = [
  { id: "emp-1", name: "Amit Kumar", role: "Store Manager", branch: "delhi", attendance: "98%", salary: 45000, status: "Active", leaveBalance: 12 },
  { id: "emp-2", name: "Neha Gupta", role: "Billing Specialist", branch: "delhi", attendance: "92%", salary: 28000, status: "Active", leaveBalance: 8 },
  { id: "emp-3", name: "Rajesh Shinde", role: "Sales Associate", branch: "mumbai", attendance: "96%", salary: 22000, status: "Active", leaveBalance: 14 },
  { id: "emp-4", name: "Suresh Pillai", role: "Store Manager", branch: "mumbai", attendance: "85%", salary: 42000, status: "On Leave", leaveBalance: 4 },
  { id: "emp-5", name: "Karthik Nair", role: "Store Manager", branch: "bangalore", attendance: "99%", salary: 48000, status: "Active", leaveBalance: 15 },
  { id: "emp-6", name: "Sneha Reddy", role: "Sales Associate", branch: "bangalore", attendance: "94%", salary: 24000, status: "Active", leaveBalance: 10 },
];

export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: "Delivered" | "Processing" | "Pending" | "Cancelled";
  items: string;
  branch: string;
}

export const ORDERS: Order[] = [
  { id: "ord-101", customerName: "Aarav Mehta", date: "2026-07-02", total: 4000, status: "Delivered", items: "Leather Shoes Pro x 2", branch: "delhi" },
  { id: "ord-102", customerName: "Priya Sharma", date: "2026-07-02", total: 1500, status: "Processing", items: "Suede Loafers x 1", branch: "delhi" },
  { id: "ord-103", customerName: "Ananya Iyer", date: "2026-07-01", total: 2500, status: "Delivered", items: "Formal Boots x 1", branch: "mumbai" },
  { id: "ord-104", customerName: "Rohan Das", date: "2026-06-30", total: 3000, status: "Cancelled", items: "Sports Sneakers X x 2", branch: "mumbai" },
  { id: "ord-105", customerName: "Siddharth Rao", date: "2026-07-03", total: 15000, status: "Processing", items: "Sports Sneakers X x 10", branch: "bangalore" },
  { id: "ord-106", customerName: "Kirti Patel", date: "2026-07-01", total: 3500, status: "Delivered", items: "Suede Loafers x 1, Canvas Slip-ons x 3", branch: "bangalore" },
];

// AI Chatbot simulation
export const CHATBOT_RULES = [
  {
    keywords: ["sales", "today", "revenue"],
    response: (branch: string) => {
      const activeBranch = BRANCHES.find(b => b.id === branch) || BRANCHES[0];
      return `Today's consolidated revenue for **${activeBranch.name}** is **₹${(activeBranch.revenue / 30).toFixed(2)}** (simulated daily average). Total revenue this month is **₹${activeBranch.revenue.toLocaleString()}**, showing a growth of **+${activeBranch.salesGrowth}%**!`;
    }
  },
  {
    keywords: ["products", "most", "selling", "top"],
    response: (branch: string) => {
      const activeBranch = BRANCHES.find(b => b.id === branch) || BRANCHES[0];
      const top = activeBranch.topProducts[0];
      return `The top-selling product in **${activeBranch.name}** is **${top.name}** with **${top.sales} units sold** generating **₹${top.revenue.toLocaleString()}** in revenue.`;
    }
  },
  {
    keywords: ["stock", "low", "inventory"],
    response: (branch: string) => {
      const activeBranch = BRANCHES.find(b => b.id === branch) || BRANCHES[0];
      const items = INVENTORY.filter(i => i.branch === branch && i.stock < i.minStock);
      if (items.length === 0) return `All inventory items in **${activeBranch.name}** are currently at healthy levels.`;
      return `Warning! You have **${items.length} items** running low in **${activeBranch.name}**:\n` + 
        items.map(i => `- **${i.name}**: Stock ${i.stock} (Min ${i.minStock}) - _AI Prediction: ${i.prediction}_`).join("\n");
    }
  },
  {
    keywords: ["predict", "next month", "forecast"],
    response: (branch: string) => {
      const activeBranch = BRANCHES.find(b => b.id === branch) || BRANCHES[0];
      const nextMonthEst = activeBranch.revenue * (1 + activeBranch.salesGrowth / 100);
      return `BizFlow AI predicts a **${activeBranch.salesGrowth}% sales spike** for next month in **${activeBranch.name}**. Estimated revenue: **₹${nextMonthEst.toLocaleString(undefined, { maximumFractionDigits: 0 })}** with strong retail momentum.`;
    }
  },
  {
    keywords: ["inactive", "visit", "60", "customers"],
    response: (branch: string) => {
      const inactive = CUSTOMERS.filter(c => c.branch === branch && c.risk !== "Low");
      if (inactive.length === 0) return `All customers in this branch have visited within 60 days.`;
      return `Found **${inactive.length} customers** at risk (no visits in >60 days):\n` +
        inactive.map(c => `- **${c.name}** (${c.phone}): Last visit: ${c.lastVisit} (Churn risk: **${c.risk}**)`).join("\n") + 
        `\n\nWould you like to trigger an automated WhatsApp campaign for these customers?`;
    }
  }
];

export const getResponse = (query: string, branch: string): string => {
  const q = query.toLowerCase();
  for (const rule of CHATBOT_RULES) {
    if (rule.keywords.every(kw => q.includes(kw))) {
      return rule.response(branch);
    }
  }
  return "I'm sorry, I couldn't find details on that. Try asking: 'Show today's sales', 'Which products sold the most?', 'Show customers who haven't visited in 60 days', or 'Predict next month's sales'.";
};
