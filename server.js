import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import StockRoute from "./routes/app/stock.js";
import bodyParser from "body-parser";
import * as CONSTANT from "./constant/constant.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/stock", StockRoute);





mongoose
  .connect(CONSTANT.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(CONSTANT.PORT, () =>
      console.log(`Server is Running on PORT: ${CONSTANT.PORT}`)
    )
  )
  .catch((error) => {
    console.log(error);
  });

