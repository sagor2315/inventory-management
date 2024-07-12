import { z } from "zod";

const OrderValidationSchema = z.object({
  email: z.string().email("Email is not valid").min(5, "Email is mandatory"),
  productId: z.string().min(5, "Product id needed"),
  price: z.number().min(0, "Price must be a non-negative number"),
  quantity: z.coerce
    .number()
    .int()
    .nonnegative()
    .min(1, "Quantity must be at least 1"),
});

export default OrderValidationSchema;
