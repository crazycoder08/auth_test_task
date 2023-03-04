const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb+srv://developer:developer@cluster.vnrt6la.mongodb.net/auth?retryWrites=true&w=majority", {
    dbName: "auth",
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => console.log(err));

mongoose.connection.on("connected", () => {
  console.log("mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoose connection is disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
