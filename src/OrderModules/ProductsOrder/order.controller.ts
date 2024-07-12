import { Request, Response } from "express";
import OrderValidationSchema from "./order.schema";
import { OrderService } from "./order.service";

const createNewOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    const zodParseData = OrderValidationSchema.parse(order);
    const result = await OrderService.createOrderDB(zodParseData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    if (
      err.message === "Product not found" ||
      err.message === "Insufficient quantity available in inventory"
    ) {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    } else {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Order not found",
        error: err.message,
      });
    }
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const result = await OrderService.getOrderDB(email as string);

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Route not found",
      error: error,
    });
  }
};

export const OrderController = {
  createNewOrder,
  getAllOrder,
};
