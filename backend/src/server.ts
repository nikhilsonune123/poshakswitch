import "dotenv/config";

import app from "./app.js";

import {
  connectDatabase,
  disconnectDatabase,
} from "./config/database.js";

const port = Number(process.env.PORT ?? 5000);

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(port, () => {
      console.log(
        `PoshakSwitch API running on port ${port}`
      );
    });
  } catch (error) {
    console.error("Failed to start PoshakSwitch API", error);

    await disconnectDatabase().catch(console.error);

    process.exit(1);
  }
};

void startServer();