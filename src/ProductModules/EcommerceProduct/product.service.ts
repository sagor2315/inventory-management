import { TProductDetails } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductDB = async (product: TProductDetails) => {
  const result = await ProductModel.create(product);
  return result;
};

const getProductFromDB = async (searchTerm: string | undefined) => {
  if (searchTerm) {
    const Searchproduct = new RegExp(searchTerm, "i");
    const result = await ProductModel.find({
      $or: [
        { name: Searchproduct },
        { description: Searchproduct },
        { category: Searchproduct },
      ],
    });
    return result;
  } else {
    const result = await ProductModel.find();
    return result;
  }
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findOne({ _id });
  return result;
};

const updateSingleProductFromDB = async (_id: string, update: object) => {
  const result = await ProductModel.findOneAndUpdate({ _id }, update, {
    new: true,
    upsert: true,
  });
  return result;
};
const deleteSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.deleteOne({ _id });
  return result;
};

export const productService = {
  createProductDB,
  getProductFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteSingleProductFromDB,
};
