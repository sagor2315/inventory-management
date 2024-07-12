import { ProductModel } from "../../ProductModules/EcommerceProduct/product.model";
import { TOrderDetails } from "./order.interface";
import { OrderModel } from "./order.model";

interface OrderFilter {
  email?: string;
}

const createOrderDB = async (order: TOrderDetails) => {
  const { productId } = order;
  const OrderableProduct = await ProductModel.findOne({ _id: productId });

  if (!OrderableProduct) {
    throw new Error("Product not found");
  } else if (OrderableProduct.inventory.quantity < order.quantity) {
    throw new Error("Insufficient quantity available in inventory");
  } else {
    const result = await OrderModel.create(order);
    console.log(result);

    OrderableProduct.inventory.quantity -= order.quantity;
    if (OrderableProduct.inventory.quantity <= 0) {
      OrderableProduct.inventory.quantity = 0;
      OrderableProduct.inventory.inStock = false;
    }
    await OrderableProduct.save();

    return result;
  }
};

const getOrderDB = async (email: string) => {
  const filter: OrderFilter = {};

  if (email) {
    filter.email = email;
  }
  const result = await OrderModel.find(filter);
  return result;
};

export const OrderService = {
  createOrderDB,
  getOrderDB,
};
