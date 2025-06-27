import app from "./app.js";
import connectToDb from "./db/database.js";

async function main() {
  try {
    await connectToDb();
    console.log("BD OK");

    const PORT = 4444;
    app.listen(PORT, () => {
      console.log("Server OK");
    });
  } catch (error) {
    console.error(error);
  }
}

main();
