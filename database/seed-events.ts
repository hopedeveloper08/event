import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "node:fs";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const filePath = "./database/fake-data.json"

async function seedEvents() {
  try {
    console.log("Connecting to MongoDB...");

    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await mongoose.connect(MONGODB_URI);

    console.log("Connected to MongoDB.");

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const events = JSON.parse(fileContent);

    if (!Array.isArray(events)) {
      throw new Error("fake-data.json must contain an array of events.");
    }

    const db = mongoose.connection.db;

    if (!db) {
      throw new Error("Database connection is not available.");
    }

    const collection = db.collection("events");

    await collection.insertMany(events);

    console.log(`Successfully inserted ${events.length} events.`);

    await mongoose.disconnect();

    console.log("Disconnected from MongoDB.");
  } catch (error) {
    console.error("Failed to seed events:");

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    await mongoose.disconnect();
    process.exit(1);
  }
}

seedEvents();