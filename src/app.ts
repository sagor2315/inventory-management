import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import { productRoute } from "./ProductModules/EcommerceProduct/product.route";
import { orderRoute } from "./OrderModules/ProductsOrder/order.route";

// parser
app.use(express.json());
app.use(cors());

// all apps routes
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello customers!");
});

export default app;
