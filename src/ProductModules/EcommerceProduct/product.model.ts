import { Schema, model } from "mongoose";
import { TInventory, TProductDetails, TVariant } from "./product.interface";

const VariantSchema = new Schema<TVariant>(
  {
    type: {
      type: String,
      required: [true, "define a product type"],
    },
    value: {
      type: String,
      required: [true, "specific value needed"],
    },
  },
  { _id: false }
);

const InventorySchema = new Schema<TInventory>(
  {
    quantity: {
      type: Number,
      required: [true, "Set the product quentity"],
    },
    inStock: {
      type: Boolean,
      required: [true, "Stock must be required"],
    },
  },
  { _id: false }
);

const ProductDetailsSchema = new Schema<TProductDetails>({
  name: {
    type: String,
    unique: true,
    required: [true, "product name is required"],
  },

  description: {
    type: String,
    required: [true, "Description needed for this product"],
  },
  price: {
    type: Number,
    required: [true, "Price must be needed"],
  },
  category: {
    type: String,
    required: [true, "Category Needed"],
  },
  tags: {
    type: [String],
    required: [true, "create some tags"],
  },
  variants: {
    type: [VariantSchema],
    required: [true, "Add productVariant"],
    validate: {
      validator: function (value: object[]) {
        return value && value.length > 0;
      },
      message: "Variants array cannot be empty",
    },
  },
  inventory: {
    type: InventorySchema,
    required: [true, "product inventory needed"],
  },
});

export const ProductModel = model<TProductDetails>(
  "TProductDetails",
  ProductDetailsSchema
);
