// src/data/mockData.js

// Orders
export const mockOrders = [
  {
    id: "ORD001",
    customer: "John Doe",
    table: "Table 4",
    total: 1450,
    status: "Pending",
  },
  {
    id: "ORD002",
    customer: "Mary Ann",
    table: "Table 1",
    total: 2300,
    status: "Preparing",
  },
  {
    id: "ORD003",
    customer: "Chris Kamau",
    table: "Table 7",
    total: 1200,
    status: "Served",
  },
  {
    id: "ORD004",
    customer: "Sarah Njeri",
    table: "Table 3",
    total: 900,
    status: "Cancelled",
  },
  {
    id: "ORD005",
    customer: "Peter Otieno",
    table: "Table 2",
    total: 3100,
    status: "Served",
  },
  {
    id: "ORD006",
    customer: "Musa Otieno",
    table: "Table 9",
    total: 3800,
    status: "Served",
  },
];

// Customers
export const mockCustomers = [
  { id: 1, name: "John Doe", visits: 5, totalSpent: 5500 },
  { id: 2, name: "Jane Smith", visits: 3, totalSpent: 3200 },
  { id: 3, name: "Alex Kim", visits: 8, totalSpent: 9000 },
];

// Menu
export const mockMenu = [
  {
    id: "1",
    name: "Grilled Chicken",
    category: "Main",
    description: "Juicy grilled chicken with spices",
    price: 650,
    inStock: true,
    imageUrl: "https://source.unsplash.com/400x300/?chicken,food",
    stockQty: 20,
  },
  {
    id: "2",
    name: "French Fries",
    category: "Side",
    description: "Crispy golden fries",
    price: 200,
    inStock: true,
    imageUrl: "https://source.unsplash.com/400x300/?fries,food",
    stockQty: 50,
  },
  {
    id: "3",
    name: "Chocolate Cake",
    category: "Dessert",
    description: "Rich chocolate cake slice",
    price: 400,
    inStock: false,
    imageUrl: "https://source.unsplash.com/400x300/?cake,dessert",
    stockQty: 0,
  },
  {
    id: "4",
    name: "Coca-Cola",
    category: "Drink",
    description: "Chilled soft drink",
    price: 120,
    inStock: true,
    imageUrl: "https://source.unsplash.com/400x300/?coke,drink",
    stockQty: 100,
  },
  {
    id: "5",
    name: "Pizza",
    category: "Main",
    description: "Juicy grilled chicken with spices",
    price: 650,
    inStock: true,
    imageUrl: "https://source.unsplash.com/400x300/?chicken,food",
    stockQty: 20,
  },
  {
    id: "6",
    name: "Donut",
    category: "Side",
    description: "Crispy golden fries",
    price: 200,
    inStock: true,
    imageUrl: "https://source.unsplash.com/400x300/?fries,food",
    stockQty: 50,
  },
  {
    id: "7",
    name: "Chocolate Cake",
    category: "Dessert",
    description: "Rich chocolate cake slice",
    price: 400,
    inStock: false,
    imageUrl: "https://source.unsplash.com/400x300/?cake,dessert",
    stockQty: 0,
  },
  {
    id: "8",
    name: "Coca-Cola",
    category: "Drink",
    description: "Chilled soft drink",
    price: 120,
    inStock: true,
    imageUrl: "https://source.unsplash.com/400x300/?coke,drink",
    stockQty: 100,
  },
];

// Tables
export const mockTables = [
  {
    id: "1",
    number: 1,
    qrData: "https://restaurantpro.com/tables/1",
    qrCode: "/qrcodes/table1.png",
    status: "Available",
    capacity: 4,
  },
  {
    id: "2",
    number: 2,
    qrData: "https://restaurantpro.com/tables/2",
    qrCode: "/qrcodes/table2.png",
    status: "Occupied",
    capacity: 2,
  },
  {
    id: "3",
    number: 3,
    qrData: "https://restaurantpro.com/tables/3",
    qrCode: "/qrcodes/table3.png",
    status: "Reserved",
    capacity: 6,
  },
  {
    id: "4",
    number: 4,
    qrData: "https://restaurantpro.com/tables/4",
    qrCode: "/qrcodes/table4.png",
    status: "Available",
    capacity: 4,
  },
];

// Staff
export const mockStaff = [
  {
    id: 1,
    name: "James Kariuki",
    email: "james.kariuki@example.com",
    phone: "+254712345678",
    role: "Waiter",
    assignedTables: [1, 2],
    isAvailable: true,
    activeOrders: 3,
  },
  {
    id: 2,
    name: "Sarah Mwangi",
    email: "sarah.mwangi@example.com",
    phone: "+254722334455",
    role: "Waiter",
    assignedTables: [3],
    isAvailable: false,
    activeOrders: 0,
  },
  {
    id: 3,
    name: "Peter Otieno",
    email: "peter.otieno@example.com",
    phone: "+254733112233",
    role: "Cleaner",
    assignedTables: [],
    isAvailable: true,
    activeOrders: 1,
  },
];

// Payments
export const mockPayments = [
  { id: 1, orderId: 1, amount: 1200, method: "M-Pesa", status: "Completed" },
  { id: 2, orderId: 2, amount: 1500, method: "Card", status: "Pending" },
  { id: 3, orderId: 3, amount: 3000, method: "Cash", status: "Completed" },
];

// Sessions
export const mockSessions = [
  { id: 1, table: "T1", startTime: "12:00", status: "Active" },
  { id: 2, table: "T3", startTime: "13:30", status: "Active" },
  { id: 3, table: "T5", startTime: "14:00", status: "Closed" },
];
