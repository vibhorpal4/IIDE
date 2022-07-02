import app from "./configs/app";
import dotenv from "dotenv";

dotenv.config();

//Handling Uncaught Exception
process.on("uncaughtException", (error: any) => {
  console.log(`Error: ${error.message}`);
  console.log(`Shutting down server due to Uncaught Exception`);
  process.exit(1);
});

//connect server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//handle Promise Rejection
process.on("unhandledRejection", (error: any) => {
  console.log(`Error: ${error.message}`);
  console.log(`Shutting down server due to Unhandled Promise Rejection`);
});
