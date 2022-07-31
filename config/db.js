const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    console.log("DB Conectada");
  } catch (error) {
    console.log("Error", error);
    process.exit(1); //detiene el servidor
  }
};

module.exports = connectDB;
