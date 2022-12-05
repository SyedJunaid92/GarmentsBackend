import express from "express";
import {
  AddStock,
  GetStock,
  UpdateStock,SaleStock
} from "../../controller/app/stock.js";

const router = express.Router();
router.post("/", AddStock);
router.post("/update", UpdateStock);
router.get("/", GetStock);
router.post('/sale',SaleStock)



export default router;
