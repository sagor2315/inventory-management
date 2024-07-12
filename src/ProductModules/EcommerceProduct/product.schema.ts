import { z } from "zod";

const VariantValidationSchema = z.object({
  type: z.string({
    required_error: "define a product type",
    invalid_type_error: "Type must be a string",
  }),
  value: z.string({
    required_error: "specific value needed",
    invalid_type_error: "Value must be a string",
  }),
});

const InventoryValidationSchema = z.object({
  quantity: z.coerce
    .number({
      required_error: "Set the product quantity",
      invalid_type_error: "Quantity must be a number",
    })
    .int()
    .nonnegative()
    .min(1, "Quantity must be at least 1"),
  inStock: z.boolean({
    required_error: "Stock must be required",
    invalid_type_error: "inStock must be a boolean",
  }),
});

const ProductDetailsValidationSchema = z.object({
  name: z.string({
    required_error: "product name is required",
    invalid_type_error: "Name must be a string",
  }),
  description: z.string({
    required_error: "Description needed for this product",
    invalid_type_error: "Description must be a string",
  }),
  price: z.number({
    required_error: "Price must be needed",
    invalid_type_error: "Price must be a number",
  }),
  category: z.string({
    required_error: "Category Needed",
    invalid_type_error: "Category must be a string",
  }),
  tags: z.array(z.string(), {
    required_error: "create some tags",
    invalid_type_error: "Tags must be an array of strings",
  }),
  variants: z.array(VariantValidationSchema, {
    required_error: "Add productVariant",
    invalid_type_error: "Variants must be an array of VariantSchema",
  }),
  inventory: InventoryValidationSchema,
});

export default ProductDetailsValidationSchema;
