// BizFlow AI - Mock Database & Dynamic SME Data Generator

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

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  minStock: number;
  price: number;
  supplier: string;
  category: string;
  prediction: string;
  branch: string;
}

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

export interface Employee {
  id: string;
  name: string;
  role: string;
  branch: string;
  attendance: string;
  salary: number;
  status: "Active" | "On Leave" | "Suspended";
  leaveBalance: number;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: "Delivered" | "Processing" | "Pending" | "Cancelled";
  items: string;
  branch: string;
}

// Default Shoe Shop static data (for fallback)
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

export const INVENTORY: InventoryItem[] = [
  { id: "inv-1", name: "Leather Shoes Pro", sku: "LSP-001", stock: 120, minStock: 20, price: 2000, supplier: "Apex Leather Works", category: "Formal", prediction: "High demand expected. Restock in 45 days.", branch: "delhi" },
  { id: "inv-2", name: "Suede Loafers", sku: "SL-002", stock: 15, minStock: 25, price: 1500, supplier: "TrendCraft Ltd.", category: "Casual", prediction: "Stock running low. Order 40 units immediately.", branch: "delhi" },
  { id: "inv-3", name: "Sports Sneakers X", sku: "SSX-003", stock: 85, minStock: 15, price: 1500, supplier: "FitStride Supplies", category: "Sports", prediction: "Stable demand. Restock recommended in 20 days.", branch: "delhi" },
  { id: "inv-4", name: "Formal Boots", sku: "FB-004", stock: 8, minStock: 10, price: 2500, supplier: "Apex Leather Works", category: "Formal", prediction: "Low stock alert. Reorder 20 units now.", branch: "delhi" },
  { id: "inv-5", name: "Canvas Slip-ons", sku: "CS-005", stock: 110, minStock: 30, price: 600, supplier: "TrendCraft Ltd.", category: "Casual", prediction: "Overstocked. Run a discount campaign.", branch: "delhi" },
  { id: "inv-6", name: "Leather Shoes Pro", sku: "LSP-001", stock: 45, minStock: 20, price: 2000, supplier: "Apex Leather Works", category: "Formal", prediction: "Moderate demand. Restock in 15 days.", branch: "mumbai" },
  { id: "inv-7", name: "Suede Loafers", sku: "SL-002", stock: 5, minStock: 25, price: 1500, supplier: "TrendCraft Ltd.", category: "Casual", prediction: "Critical Low Stock. Order 50 units today.", branch: "mumbai" },
  { id: "inv-8", name: "Sports Sneakers X", sku: "SSX-003", stock: 120, minStock: 15, price: 1500, supplier: "FitStride Supplies", category: "Sports", prediction: "High volume sales in Mumbai. Order 50 additional units.", branch: "mumbai" },
  { id: "inv-9", name: "Formal Boots", sku: "FB-004", stock: 2, minStock: 10, price: 2500, supplier: "Apex Leather Works", category: "Formal", prediction: "Low stock. Slow seller, recommend transfer 5 units.", branch: "mumbai" },
  { id: "inv-10", name: "Leather Shoes Pro", sku: "LSP-001", stock: 90, minStock: 20, price: 2000, supplier: "Apex Leather Works", category: "Formal", prediction: "Stable demand. Restock in 30 days.", branch: "bangalore" },
  { id: "inv-11", name: "Suede Loafers", sku: "SL-002", stock: 65, minStock: 25, price: 1500, supplier: "TrendCraft Ltd.", category: "Casual", prediction: "Demand stable. Next restock in 25 days.", branch: "bangalore" },
  { id: "inv-12", name: "Sports Sneakers X", sku: "SSX-003", stock: 350, minStock: 40, price: 1500, supplier: "FitStride Supplies", category: "Sports", prediction: "Extremely high demand due to marathon promo.", branch: "bangalore" },
];

export const CUSTOMERS: Customer[] = [
  { id: "cust-1", name: "Aarav Mehta", email: "aarav.mehta@gmail.com", phone: "+91 98765 43210", lastVisit: "2026-06-28", totalSpent: 24500, branch: "delhi", insights: "High loyalty customer. Responds well to SMS alerts.", risk: "Low" },
  { id: "cust-2", name: "Priya Sharma", email: "priya.sharma@yahoo.com", phone: "+91 99112 23344", lastVisit: "2026-06-15", totalSpent: 12000, branch: "delhi", insights: "Frequent buyer of casual range.", risk: "Low" },
  { id: "cust-3", name: "Vikram Malhotra", email: "v.malhotra@corporate.com", phone: "+91 98223 34455", lastVisit: "2026-04-10", totalSpent: 48000, branch: "delhi", insights: "Inactive for 84 days. High churn risk. WhatsApp discount suggested.", risk: "High" },
  { id: "cust-4", name: "Ananya Iyer", email: "ananya.iyer@outlook.com", phone: "+91 91234 56789", lastVisit: "2026-06-30", totalSpent: 8500, branch: "mumbai", insights: "New customer. Purchased Formal gear.", risk: "Low" },
  { id: "cust-5", name: "Rohan Das", email: "rohan.das@gmail.com", phone: "+91 88776 65544", lastVisit: "2026-05-02", totalSpent: 15400, branch: "mumbai", insights: "Inactive for 62 days. Send a WhatsApp voucher.", risk: "Medium" },
  { id: "cust-6", name: "Siddharth Rao", email: "sidd.rao@techcorp.in", phone: "+91 77665 54433", lastVisit: "2026-07-02", totalSpent: 89000, branch: "bangalore", insights: "VIP client. Active and extremely profitable.", risk: "Low" },
  { id: "cust-7", name: "Kirti Patel", email: "kirti.patel@outlook.com", phone: "+91 96543 21098", lastVisit: "2026-06-25", totalSpent: 18500, branch: "bangalore", insights: "Good response rate to emails.", risk: "Low" },
];

export const EMPLOYEES: Employee[] = [
  { id: "emp-1", name: "Amit Kumar", role: "Store Manager", branch: "delhi", attendance: "98%", salary: 45000, status: "Active", leaveBalance: 12 },
  { id: "emp-2", name: "Neha Gupta", role: "Billing Specialist", branch: "delhi", attendance: "92%", salary: 28000, status: "Active", leaveBalance: 8 },
  { id: "emp-3", name: "Rajesh Shinde", role: "Sales Associate", branch: "mumbai", attendance: "96%", salary: 22000, status: "Active", leaveBalance: 14 },
  { id: "emp-4", name: "Suresh Pillai", role: "Store Manager", branch: "mumbai", attendance: "85%", salary: 42000, status: "On Leave", leaveBalance: 4 },
  { id: "emp-5", name: "Karthik Nair", role: "Store Manager", branch: "bangalore", attendance: "99%", salary: 48000, status: "Active", leaveBalance: 15 },
  { id: "emp-6", name: "Sneha Reddy", role: "Sales Associate", branch: "bangalore", attendance: "94%", salary: 24000, status: "Active", leaveBalance: 10 },
];

export const ORDERS: Order[] = [
  { id: "ord-101", customerName: "Aarav Mehta", date: "2026-07-02", total: 4000, status: "Delivered", items: "Leather Shoes Pro x 2", branch: "delhi" },
  { id: "ord-102", customerName: "Priya Sharma", date: "2026-07-02", total: 1500, status: "Processing", items: "Suede Loafers x 1", branch: "delhi" },
  { id: "ord-103", customerName: "Ananya Iyer", date: "2026-07-01", total: 2500, status: "Delivered", items: "Formal Boots x 1", branch: "mumbai" },
  { id: "ord-104", customerName: "Rohan Das", date: "2026-06-30", total: 3000, status: "Cancelled", items: "Sports Sneakers X x 2", branch: "mumbai" },
  { id: "ord-105", customerName: "Siddharth Rao", date: "2026-07-03", total: 15000, status: "Processing", items: "Sports Sneakers X x 10", branch: "bangalore" },
  { id: "ord-106", customerName: "Kirti Patel", date: "2026-07-01", total: 3500, status: "Delivered", items: "Suede Loafers x 1, Canvas Slip-ons x 3", branch: "bangalore" },
];

// Product Templates by Business Type
const PRODUCT_TEMPLATES: Record<string, { name: string; price: number; category: string; supplier: string }[]> = {
  "Shoe Shop": [
    { name: "Leather Shoes Pro", price: 2000, category: "Formal", supplier: "Apex Leather Works" },
    { name: "Suede Loafers", price: 1500, category: "Casual", supplier: "TrendCraft Ltd." },
    { name: "Sports Sneakers X", price: 1500, category: "Sports", supplier: "FitStride Supplies" },
    { name: "Formal Boots", price: 2500, category: "Formal", supplier: "Apex Leather Works" },
    { name: "Canvas Slip-ons", price: 600, category: "Casual", supplier: "TrendCraft Ltd." }
  ],
  "Retail Store": [
    { name: "Fresh Milk 1L", price: 60, category: "Dairy", supplier: "Amul Distributors" },
    { name: "Organic Eggs (Doz)", price: 120, category: "Poultry", supplier: "Greenfield Farms" },
    { name: "Whole Wheat Bread", price: 45, category: "Bakery", supplier: "Harvest Gold Bakery" },
    { name: "Sunflower Oil 1L", price: 180, category: "Groceries", supplier: "Fortune Foods" },
    { name: "Basmati Rice 5kg", price: 450, category: "Groceries", supplier: "IndiaGate Rice Mill" }
  ],
  "Restaurant & Cafe": [
    { name: "Espresso Blend Bean", price: 220, category: "Beverages", supplier: "Blue Tokai Coffee" },
    { name: "Cappuccino Cup", price: 150, category: "Beverages", supplier: "In-House Dairy" },
    { name: "Margherita Pizza", price: 320, category: "Food", supplier: "Pizza Base Supplies" },
    { name: "Avocado Toast", price: 180, category: "Food", supplier: "Organic Farms Pvt" },
    { name: "Chocolate Brownie", price: 90, category: "Desserts", supplier: "Royal Bakers" }
  ],
  "Hospital & Clinic": [
    { name: "Paracetamol 500mg", price: 40, category: "Pharmacy", supplier: "Cipla Pharmaceuticals" },
    { name: "Disinfectant Spray", price: 120, category: "Sanitation", supplier: "Dettol Corp" },
    { name: "Syringes 5ml (Box)", price: 150, category: "Consumables", supplier: "Hindustan Syringes" },
    { name: "Surgical Masks (Box)", price: 100, category: "Safety", supplier: "Hindustan Syringes" },
    { name: "Vitamin C Supplements", price: 300, category: "Pharmacy", supplier: "Cipla Pharmaceuticals" }
  ],
  "Educational Institute": [
    { name: "Textbooks Grade 10", price: 400, category: "Books", supplier: "NCERT Publishers" },
    { name: "Notebook Pack (10)", price: 150, category: "Stationery", supplier: "Classmate Ltd" },
    { name: "Ballpoint Pens (Box)", price: 50, category: "Stationery", supplier: "Cello Writing" },
    { name: "Geometry Set Pro", price: 180, category: "Stationery", supplier: "Camelin Art" },
    { name: "Drawing Pad A3", price: 90, category: "Books", supplier: "Camelin Art" }
  ],
  "Service Business": [
    { name: "Brand Design Package", price: 15000, category: "Design", supplier: "Internal Design Team" },
    { name: "Web Development Consult", price: 5000, category: "Tech Service", supplier: "External Dev Partner" },
    { name: "Tax Filing Service", price: 2000, category: "Legal Audit", supplier: "Apex Audit Partners" },
    { name: "SEO Audit Report", price: 4500, category: "Marketing", supplier: "Internal Marketing Group" },
    { name: "Cloud Migration Consult", price: 8000, category: "Tech Service", supplier: "External Dev Partner" }
  ]
};

// Generates dynamic data for any business
export function generateDataForBusiness(businessType: string, businessName: string) {
  // Fallback to Shoe Shop if type not matched
  const typeKey = PRODUCT_TEMPLATES[businessType] ? businessType : "Shoe Shop";
  const templates = PRODUCT_TEMPLATES[typeKey];

  // Helper to generate SKU
  const getSku = (pName: string) => {
    return pName.split(" ").map(w => w[0]).join("").toUpperCase() + "-" + Math.floor(100 + Math.random() * 900);
  };

  // Generate Inventory
  const generatedInventory: InventoryItem[] = [];
  const branchesList = ["delhi", "mumbai", "bangalore"];
  
  branchesList.forEach(branch => {
    templates.forEach((tmpl, idx) => {
      // Add random stock deviations
      const deviation = Math.floor(Math.random() * 20) - 10;
      const stock = Math.max(2, (idx === 1 || idx === 3 ? 12 : 100) + deviation);
      const minStock = idx === 1 || idx === 3 ? 20 : 30;

      const prediction = stock < minStock
        ? `Low stock alert! Demand is currently trending upwards. Reorder immediately.`
        : `Stock levels are healthy. AI predicts sufficient supply for 25+ days.`;

      generatedInventory.push({
        id: `inv-${branch}-${idx}`,
        name: tmpl.name,
        sku: getSku(tmpl.name),
        stock,
        minStock,
        price: tmpl.price,
        supplier: tmpl.supplier,
        category: tmpl.category,
        prediction,
        branch
      });
    });
  });

  // Generate CRM details matching categories
  const customerInsights = [
    `Frequently purchases ${templates[0].name}. Good loyalty metrics.`,
    `Interested in ${templates[1].name}. Responds well to promo campaigns.`,
    `Has not ordered for 60+ days. Risk of churn. Send WhatsApp discount code.`,
    `New client. Prefers high-end ${templates[0].name}.`,
    `Last order was 45 days ago. Suggest follow up call.`,
    `VIP client. Prefers bulk transactions of ${templates[2].name}.`,
    `High response rate to mailers. Prefers ${templates[1].name}.`
  ];

  const generatedCustomers: Customer[] = [
    { id: "cust-1", name: "Aarav Mehta", email: "aarav.mehta@gmail.com", phone: "+91 98765 43210", lastVisit: "2026-06-28", totalSpent: 24500, branch: "delhi", insights: customerInsights[0], risk: "Low" },
    { id: "cust-2", name: "Priya Sharma", email: "priya.sharma@yahoo.com", phone: "+91 99112 23344", lastVisit: "2026-06-15", totalSpent: 12000, branch: "delhi", insights: customerInsights[1], risk: "Low" },
    { id: "cust-3", name: "Vikram Malhotra", email: "v.malhotra@corporate.com", phone: "+91 98223 34455", lastVisit: "2026-04-10", totalSpent: 48000, branch: "delhi", insights: customerInsights[2], risk: "High" },
    { id: "cust-4", name: "Ananya Iyer", email: "ananya.iyer@outlook.com", phone: "+91 91234 56789", lastVisit: "2026-06-30", totalSpent: 8500, branch: "mumbai", insights: customerInsights[3], risk: "Low" },
    { id: "cust-5", name: "Rohan Das", email: "rohan.das@gmail.com", phone: "+91 88776 65544", lastVisit: "2026-05-02", totalSpent: 15400, branch: "mumbai", insights: customerInsights[4], risk: "Medium" },
    { id: "cust-6", name: "Siddharth Rao", email: "sidd.rao@techcorp.in", phone: "+91 77665 54433", lastVisit: "2026-07-02", totalSpent: 89000, branch: "bangalore", insights: customerInsights[5], risk: "Low" },
    { id: "cust-7", name: "Kirti Patel", email: "kirti.patel@outlook.com", phone: "+91 96543 21098", lastVisit: "2026-06-25", totalSpent: 18500, branch: "bangalore", insights: customerInsights[6], risk: "Low" },
  ];

  // Generate branches revenue history & top products
  const generatedBranches: BranchData[] = [
    {
      id: "delhi",
      name: "Delhi HQ",
      revenue: 1254000,
      salesGrowth: 15.4,
      expenses: 420000,
      activeCustomers: 1240,
      lowStockCount: 2,
      revenueHistory: [
        { month: "Jan", amount: 150000, profit: 90000, expenses: 60000 },
        { month: "Feb", amount: 180000, profit: 110000, expenses: 70000 },
        { month: "Mar", amount: 210000, profit: 130000, expenses: 80000 },
        { month: "Apr", amount: 190000, profit: 115000, expenses: 75000 },
        { month: "May", amount: 240000, profit: 150000, expenses: 90000 },
        { month: "Jun", amount: 284000, profit: 184000, expenses: 100000 },
      ],
      topProducts: [
        { name: templates[0].name, sales: 320, revenue: templates[0].price * 320 },
        { name: templates[1].name, sales: 240, revenue: templates[1].price * 240 },
        { name: templates[2].name, sales: 180, revenue: templates[2].price * 180 },
        { name: templates[3].name, sales: 90, revenue: templates[3].price * 90 },
      ],
      customerCategories: [
        { name: "Retail", value: 65 },
        { name: "Wholesale", value: 20 },
        { name: "Corporate", value: 15 },
      ]
    },
    {
      id: "mumbai",
      name: "Mumbai Branch",
      revenue: 985000,
      salesGrowth: 12.8,
      expenses: 350000,
      activeCustomers: 950,
      lowStockCount: 3,
      revenueHistory: [
        { month: "Jan", amount: 120000, profit: 70000, expenses: 50000 },
        { month: "Feb", amount: 140000, profit: 85000, expenses: 55000 },
        { month: "Mar", amount: 165000, profit: 100000, expenses: 65000 },
        { month: "Apr", amount: 155000, profit: 95000, expenses: 60000 },
        { month: "May", amount: 190000, profit: 120000, expenses: 70000 },
        { month: "Jun", amount: 215000, profit: 135000, expenses: 80000 },
      ],
      topProducts: [
        { name: templates[0].name, sales: 210, revenue: templates[0].price * 210 },
        { name: templates[2].name, sales: 220, revenue: templates[2].price * 220 },
        { name: templates[1].name, sales: 110, revenue: templates[1].price * 110 },
      ],
      customerCategories: [
        { name: "Retail", value: 55 },
        { name: "Wholesale", value: 30 },
        { name: "Corporate", value: 15 },
      ]
    },
    {
      id: "bangalore",
      name: "Bangalore Hub",
      revenue: 1420000,
      salesGrowth: 18.2,
      expenses: 480000,
      activeCustomers: 1560,
      lowStockCount: 1,
      revenueHistory: [
        { month: "Jan", amount: 180000, profit: 110000, expenses: 70000 },
        { month: "Feb", amount: 200000, profit: 125000, expenses: 75000 },
        { month: "Mar", amount: 230000, profit: 145000, expenses: 85000 },
        { month: "Apr", amount: 220000, profit: 135000, expenses: 85000 },
        { month: "May", amount: 280000, profit: 175000, expenses: 105000 },
        { month: "Jun", amount: 310000, profit: 195000, expenses: 115000 },
      ],
      topProducts: [
        { name: templates[2].name, sales: 410, revenue: templates[2].price * 410 },
        { name: templates[0].name, sales: 280, revenue: templates[0].price * 280 },
        { name: templates[1].name, sales: 190, revenue: templates[1].price * 190 },
      ],
      customerCategories: [
        { name: "Retail", value: 70 },
        { name: "Wholesale", value: 10 },
        { name: "Corporate", value: 20 },
      ]
    }
  ];

  // Generate Employee roster roles tailored to business type
  let roles = ["Manager", "Cashier", "Associate", "Staff Assistant"];
  if (businessType === "Restaurant & Cafe") roles = ["Store Manager", "Head Chef", "Barista", "Waiter"];
  if (businessType === "Hospital & Clinic") roles = ["Lead Doctor", "Duty Nurse", "Pharmacist", "Receptionist"];
  if (businessType === "Educational Institute") roles = ["Principal", "Admin Registrar", "Senior Teacher", "Librarian"];

  const generatedEmployees: Employee[] = [
    { id: "emp-1", name: "Amit Kumar", role: roles[0], branch: "delhi", attendance: "98%", salary: 45000, status: "Active", leaveBalance: 12 },
    { id: "emp-2", name: "Neha Gupta", role: roles[1], branch: "delhi", attendance: "92%", salary: 28000, status: "Active", leaveBalance: 8 },
    { id: "emp-3", name: "Rajesh Shinde", role: roles[2], branch: "mumbai", attendance: "96%", salary: 22000, status: "Active", leaveBalance: 14 },
    { id: "emp-4", name: "Suresh Pillai", role: roles[0], branch: "mumbai", attendance: "85%", salary: 42000, status: "On Leave", leaveBalance: 4 },
    { id: "emp-5", name: "Karthik Nair", role: roles[0], branch: "bangalore", attendance: "99%", salary: 48000, status: "Active", leaveBalance: 15 },
    { id: "emp-6", name: "Sneha Reddy", role: roles[2], branch: "bangalore", attendance: "94%", salary: 24000, status: "Active", leaveBalance: 10 },
  ];

  // Generate initial Order history ledger matching product prices
  const generatedOrders: Order[] = [
    { id: "ord-101", customerName: "Aarav Mehta", date: "2026-07-02", total: templates[0].price * 2, status: "Delivered", items: `${templates[0].name} x 2`, branch: "delhi" },
    { id: "ord-102", customerName: "Priya Sharma", date: "2026-07-02", total: templates[1].price, status: "Processing", items: `${templates[1].name} x 1`, branch: "delhi" },
    { id: "ord-103", customerName: "Ananya Iyer", date: "2026-07-01", total: templates[3] ? templates[3].price : templates[0].price, status: "Delivered", items: `${templates[3] ? templates[3].name : templates[0].name} x 1`, branch: "mumbai" },
    { id: "ord-104", customerName: "Rohan Das", date: "2026-06-30", total: templates[2].price * 2, status: "Cancelled", items: `${templates[2].name} x 2`, branch: "mumbai" },
    { id: "ord-105", customerName: "Siddharth Rao", date: "2026-07-03", total: templates[2].price * 10, status: "Processing", items: `${templates[2].name} x 10`, branch: "bangalore" },
    { id: "ord-106", customerName: "Kirti Patel", date: "2026-07-01", total: templates[1].price + templates[4].price * 3, status: "Delivered", items: `${templates[1].name} x 1, ${templates[4].name} x 3`, branch: "bangalore" },
  ];

  return {
    branches: generatedBranches,
    inventory: generatedInventory,
    customers: generatedCustomers,
    employees: generatedEmployees,
    orders: generatedOrders
  };
}

// AI Chatbot simulation with dynamic dataset dependencies
export const getResponse = (
  query: string,
  branch: string,
  branches: BranchData[],
  inventory: InventoryItem[],
  customers: Customer[]
): string => {
  const q = query.toLowerCase();
  const activeBranch = branches.find(b => b.id === branch) || branches[0];

  if (q.includes("sales") || q.includes("today") || q.includes("revenue")) {
    return `Today's consolidated revenue for **${activeBranch.name}** is **₹${(activeBranch.revenue / 30).toFixed(2)}** (simulated daily average). Total revenue this month is **₹${activeBranch.revenue.toLocaleString()}**, showing a growth of **+${activeBranch.salesGrowth}%**!`;
  }
  if (q.includes("products") || q.includes("most") || q.includes("selling") || q.includes("top")) {
    const top = activeBranch.topProducts[0];
    return `The top-selling product in **${activeBranch.name}** is **${top.name}** with **${top.sales} units sold** generating **₹${top.revenue.toLocaleString()}** in revenue.`;
  }
  if (q.includes("stock") || q.includes("low") || q.includes("inventory")) {
    const items = inventory.filter(i => i.branch === branch && i.stock < i.minStock);
    if (items.length === 0) return `All inventory items in **${activeBranch.name}** are currently at healthy levels.`;
    return `Warning! You have **${items.length} items** running low in **${activeBranch.name}**:\n` + 
      items.map(i => `- **${i.name}**: Stock ${i.stock} (Min ${i.minStock}) - _AI Prediction: ${i.prediction}_`).join("\n");
  }
  if (q.includes("predict") || q.includes("next month") || q.includes("forecast")) {
    const nextMonthEst = activeBranch.revenue * (1 + activeBranch.salesGrowth / 100);
    return `BizFlow AI predicts a **${activeBranch.salesGrowth}% sales spike** for next month in **${activeBranch.name}**. Estimated revenue: **₹${nextMonthEst.toLocaleString(undefined, { maximumFractionDigits: 0 })}** with strong retail momentum.`;
  }
  if (q.includes("inactive") || q.includes("visit") || q.includes("60") || q.includes("customers")) {
    const inactive = customers.filter(c => c.branch === branch && c.risk !== "Low");
    if (inactive.length === 0) return `All customers in this branch have visited within 60 days.`;
    return `Found **${inactive.length} customers** at risk (no visits in >60 days):\n` +
      inactive.map(c => `- **${c.name}** (${c.phone}): Last visit: ${c.lastVisit} (Churn risk: **${c.risk}**)`).join("\n") + 
      `\n\nWould you like to trigger an automated WhatsApp campaign for these customers?`;
  }

  return "I'm sorry, I couldn't find details on that. Try asking: 'Show today's sales', 'Which products sold the most?', 'Show customers who haven't visited in 60 days', or 'Predict next month's sales'.";
};
