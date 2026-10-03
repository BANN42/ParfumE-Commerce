import "dotenv/config";
import app from "./app.js";
import connectToDatabase from "./config/db.js";

const port = Number(process.env.PORT) || 3000;

try {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error("Failed to connect to the database:", error);
  process.exitCode = 1;
}
