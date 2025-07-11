import app from "./src/app.js";
import dotenv from "dotenv";
import { createTripTable } from "./src/models/tripModel.js";
import { createUserTable } from "./src/models/userModel.js";
import { createPlanTable } from "./src/models/planModel.js";
import { createDocumentTable } from "./src/models/documentModel.js";

dotenv.config();

const port = process.env.PORT;

const startServer = async () => {
  await createTripTable();
  await createUserTable();
  await createPlanTable();
  await createDocumentTable();
  app.listen(port, () => {
    console.log(`server running at ${port}`);
  });
};

startServer();
