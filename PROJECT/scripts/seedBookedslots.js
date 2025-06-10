const mongoose = require('mongoose');
const { BookedSlots } = require('../models/bookingModel');

const bookedSlotsSeedData = [
  // Past 4 Years (May 15, 2021 – May 14, 2025) with "Completed" status
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea", // Dr. Shriya Patel
    userId: "681a2e4baa87dbed1e645e3e", // Saketh17
    username: "Saketh17",
    date: "2022-03-10",
    time: "10:00",
    consultationType: "Online",
    status: "Completed",
    paymentId: "pay_201",
    amount: 600,
    paymentMethod: "Credit Card",
    createdAt: new Date("2022-03-10T04:30:00.000Z"), // 10:00 AM IST
    updatedAt: new Date("2022-03-10T04:30:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9eb", // Dr. Laura Sen
    userId: "681a2e75aa87dbed1e645e42", // Saketh Pabbu
    username: "Saketh Pabbu",
    date: "2022-06-15",
    time: "14:00",
    consultationType: "Online",
    status: "Completed",
    paymentId: "pay_202",
    amount: 2000,
    paymentMethod: "PayPal",
    createdAt: new Date("2022-06-15T08:30:00.000Z"), // 2:00 PM IST
    updatedAt: new Date("2022-06-15T08:30:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea", // Dr. Shriya Patel
    userId: "681ae6e389d21e0cc98e3ef7", // Pradeep
    username: "Pradeep",
    date: "2025-05-10",
    time: "13:00",
    consultationType: "In-person",
    status: "Completed",
    paymentId: "pay_214",
    amount: 750,
    paymentMethod: "Credit Card",
    createdAt: new Date("2025-05-10T07:30:00.000Z"), // 1:00 PM IST
    updatedAt: new Date("2025-05-10T07:30:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9eb", // Dr. Laura Sen
    userId: "681a2e4baa87dbed1e645e3e", // Saketh17
    username: "Saketh17",
    date: "2025-05-12",
    time: "11:00",
    consultationType: "Online",
    status: "Completed",
    paymentId: "pay_215",
    amount: 1700,
    paymentMethod: "PayPal",
    createdAt: new Date("2025-05-12T05:30:00.000Z"), // 11:00 AM IST
    updatedAt: new Date("2025-05-12T05:30:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea", // Dr. Shriya Patel
    userId: "681a2e75aa87dbed1e645e42", // Saketh Pabbu
    username: "Saketh Pabbu",
    date: "2025-05-14",
    time: "15:30",
    consultationType: "Online",
    status: "Completed",
    paymentId: "pay_216",
    amount: 1000,
    paymentMethod: "Credit Card",
    createdAt: new Date("2025-05-14T10:00:00.000Z"), // 3:30 PM IST
    updatedAt: new Date("2025-05-14T10:00:00.000Z"),
  },
];

// New slots for Saketh17
const newBookedSlotsForSaketh17 = [
  // May 16, 2025 (Friday)
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea", // Dr. Shriya Patel
    userId: "681a2e4baa87dbed1e645e3e", // Saketh17
    username: "Saketh17",
    date: "2025-05-16",
    time: "14:00",
    consultationType: "Online",
    status: "Completed",
    paymentId: "pay_300",
    amount: 600,
    paymentMethod: "Credit Card",
    createdAt: new Date("2025-05-16T08:30:00.000Z"), // 2:00 PM IST
    updatedAt: new Date("2025-05-16T08:30:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-16",
    time: "15:30",
    consultationType: "In-person",
    status: "Completed",
    paymentId: "pay_301",
    amount: 750,
    paymentMethod: "UPI",
    createdAt: new Date("2025-05-16T10:00:00.000Z"), // 3:30 PM IST
    updatedAt: new Date("2025-05-16T10:00:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-16",
    time: "17:00",
    consultationType: "Online",
    status: "Completed",
    paymentId: "pay_302",
    amount: 1000,
    paymentMethod: "PayPal",
    createdAt: new Date("2025-05-16T11:30:00.000Z"), // 5:00 PM IST
    updatedAt: new Date("2025-05-16T11:30:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-16",
    time: "18:30",
    consultationType: "In-person",
    status: "Completed",
    paymentId: "pay_303",
    amount: 500,
    paymentMethod: "Credit Card",
    createdAt: new Date("2025-05-16T13:00:00.000Z"), // 6:30 PM IST
    updatedAt: new Date("2025-05-16T13:00:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-16",
    time: "20:00",
    consultationType: "Online",
    status: "Completed",
    paymentId: "pay_304",
    amount: 1200,
    paymentMethod: "UPI",
    createdAt: new Date("2025-05-16T14:30:00.000Z"), // 8:00 PM IST
    updatedAt: new Date("2025-05-16T14:30:00.000Z"),
  },
  // May 17, 2025 (Saturday)
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-17",
    time: "09:00",
    consultationType: "Online",
    status: "Completed",
    paymentId: "pay_305",
    amount: 800,
    paymentMethod: "PayPal",
    createdAt: new Date("2025-05-17T03:30:00.000Z"), // 9:00 AM IST
    updatedAt: new Date("2025-05-17T03:30:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-17",
    time: "10:30",
    consultationType: "In-person",
    status: "Completed",
    paymentId: "pay_306",
    amount: 700,
    paymentMethod: "Credit Card",
    createdAt: new Date("2025-05-17T05:00:00.000Z"), // 10:30 AM IST
    updatedAt: new Date("2025-05-17T05:00:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-17",
    time: "12:00",
    consultationType: "Online",
    status: "Completed",
    paymentId: "pay_307",
    amount: 1500,
    paymentMethod: "UPI",
    createdAt: new Date("2025-05-17T06:30:00.000Z"), // 12:00 PM IST
    updatedAt: new Date("2025-05-17T06:30:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-17",
    time: "13:30",
    consultationType: "In-person",
    status: "Completed",
    paymentId: "pay_308",
    amount: 600,
    paymentMethod: "Credit Card",
    createdAt: new Date("2025-05-17T08:00:00.000Z"), // 1:30 PM IST
    updatedAt: new Date("2025-05-17T08:00:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-17",
    time: "15:00",
    consultationType: "Online",
    status: "Completed",
    paymentId: "pay_309",
    amount: 1000,
    paymentMethod: "PayPal",
    createdAt: new Date("2025-05-17T09:30:00.000Z"), // 3:00 PM IST
    updatedAt: new Date("2025-05-17T09:30:00.000Z"),
  },
  // May 18, 2025 (Sunday)
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-18",
    time: "09:30",
    consultationType: "Online",
    status: "Completed",
    paymentId: "pay_310",
    amount: 900,
    paymentMethod: "Credit Card",
    createdAt: new Date("2025-05-18T04:00:00.000Z"), // 9:30 AM IST
    updatedAt: new Date("2025-05-18T04:00:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-18",
    time: "11:00",
    consultationType: "In-person",
    status: "Completed",
    paymentId: "pay_311",
    amount: 700,
    paymentMethod: "UPI",
    createdAt: new Date("2025-05-18T05:30:00.000Z"), // 11:00 AM IST
    updatedAt: new Date("2025-05-18T05:30:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-18",
    time: "12:30",
    consultationType: "Online",
    status: "Completed",
    paymentId: "pay_312",
    amount: 1200,
    paymentMethod: "PayPal",
    createdAt: new Date("2025-05-18T07:00:00.000Z"), // 12:30 PM IST
    updatedAt: new Date("2025-05-18T07:00:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-18",
    time: "14:00",
    consultationType: "In-person",
    status: "Completed",
    paymentId: "pay_313",
    amount: 500,
    paymentMethod: "Credit Card",
    createdAt: new Date("2025-05-18T08:30:00.000Z"), // 2:00 PM IST
    updatedAt: new Date("2025-05-18T08:30:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-18",
    time: "15:30",
    consultationType: "Online",
    status: "Completed",
    paymentId: "pay_314",
    amount: 1500,
    paymentMethod: "UPI",
    createdAt: new Date("2025-05-18T10:00:00.000Z"), // 3:30 PM IST
    updatedAt: new Date("2025-05-18T10:00:00.000Z"),
  },
  // May 19, 2025 (Monday)
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-19",
    time: "09:00",
    consultationType: "Online",
    status: "Completed",
    paymentId: "pay_315",
    amount: 600,
    paymentMethod: "PayPal",
    createdAt: new Date("2025-05-19T03:30:00.000Z"), // 9:00 AM IST
    updatedAt: new Date("2025-05-19T03:30:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-19",
    time: "10:30",
    consultationType: "In-person",
    status: "Completed",
    paymentId: "pay_316",
    amount: 800,
    paymentMethod: "Credit Card",
    createdAt: new Date("2025-05-19T05:00:00.000Z"), // 10:30 AM IST
    updatedAt: new Date("2025-05-19T05:00:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-19",
    time: "12:00",
    consultationType: "Online",
    status: "Completed",
    paymentId: "pay_317",
    amount: 1000,
    paymentMethod: "UPI",
    createdAt: new Date("2025-05-19T06:30:00.000Z"), // 12:00 PM IST
    updatedAt: new Date("2025-05-19T06:30:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-19",
    time: "13:30",
    consultationType: "In-person",
    status: "Completed",
    paymentId: "pay_318",
    amount: 700,
    paymentMethod: "Credit Card",
    createdAt: new Date("2025-05-19T08:00:00.000Z"), // 1:30 PM IST
    updatedAt: new Date("2025-05-19T08:00:00.000Z"),
  },
  {
    dietitianId: "681b00e3631ebf6f8f63f9ea",
    userId: "681a2e4baa87dbed1e645e3e",
    username: "Saketh17",
    date: "2025-05-19",
    time: "15:00",
    consultationType: "Online",
    status: "Completed",
    paymentId: "pay_319",
    amount: 1200,
    paymentMethod: "PayPal",
    createdAt: new Date("2025-05-19T09:30:00.000Z"), // 3:00 PM IST
    updatedAt: new Date("2025-05-19T09:30:00.000Z"),
  },
];

// Combine original and new data
const allSeedData = [...bookedSlotsSeedData, ...newBookedSlotsForSaketh17];

async function seedDatabase() {
  await mongoose.connect('mongodb://localhost:27017/NutriConnectDB');

  try {
    await BookedSlots.deleteMany({});
    await BookedSlots.insertMany(allSeedData);
    console.log('Seed data inserted successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();