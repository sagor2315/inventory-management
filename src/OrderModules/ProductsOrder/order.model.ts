import { Schema, model } from "mongoose";
import { TOrderDetails } from "./order.interface";

const OrderDetailsSchema = new Schema<TOrderDetails>({
  email: {
    type: String,
    required: [true, "Email is mandatory"],
  },
  productId: {
    type: String,
    required: [true, "Product id needed"],
  },
  price: {
    type: Number,
    required: [true, "Need to set a price"],
  },
  quantity: {
    type: Number,
    required: [true, "Set a quentity"],
  },
});
export const OrderModel = model<TOrderDetails>(
  "TOrderDetails",
  OrderDetailsSchema
);
