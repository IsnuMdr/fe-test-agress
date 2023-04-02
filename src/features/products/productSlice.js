import { createSlice } from "@reduxjs/toolkit";
import { productData } from "../../data/dummy-data";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: productData,
  },
  reducers: {
    getProducts: (state) => {
      // eslint-disable-next-line no-self-assign
      state.products = state.products;
    },
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    updateProduct: (state, action) => {
      const { id, name, description, sku, brand, variants } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === id
      );

      if (existingProduct) {
        existingProduct.name = name;
        existingProduct.description = description;
        existingProduct.sku = sku;
        existingProduct.brand = brand;
        existingProduct.variants = variants;
      }
    },
    deleteProduct: (state, action) => {
      const { id } = action.payload;
      const productSelected = state.products.find(
        (product) => product.id === id
      );
      if (productSelected) {
        state.products = state.products.filter((product) => product.id !== id);
      }
    },
  },
});

export const { getProducts, addProduct, updateProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
