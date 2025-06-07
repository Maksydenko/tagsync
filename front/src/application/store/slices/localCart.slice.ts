import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICart } from "@/entities/cart";
import { IProduct } from "@/entities/product";

import { QueryKey } from "@/shared/model";

const INITIAL_STATE: ICart = {
  cart_price: 0,
  items: [],
  total_quantity: 0,
};

export const localCartSlice = createSlice({
  initialState: INITIAL_STATE,
  name: QueryKey.Cart,
  reducers: {
    addToLocalCart: (state, { payload: product }: PayloadAction<IProduct>) => {
      const existingProduct = state.items.find(
        (item) => item.product_id === product.product_id
      );

      if (existingProduct) {
        return;
      }

      state.cart_price += +product.price;
      state.items.push({
        ...product,
        all_price: +product.price,
        quantity: 1,
      });
      ++state.total_quantity;
    },

    clearLocalCart: (state) => {
      state.cart_price = 0;
      state.items = [];
      state.total_quantity = 0;
    },

    decrementLocalCartQuantity: (
      state,
      { payload: productId }: PayloadAction<IProduct["product_id"]>
    ) => {
      const existingProduct = state.items.find(
        (item) => item.product_id === productId
      );

      if (!existingProduct) {
        return;
      }

      state.cart_price -= +existingProduct.price;
      state.items = [
        ...state.items.filter((items) => items.product_id !== productId),
        ...(existingProduct.quantity > 1
          ? [
              {
                ...existingProduct,
                all_price: +existingProduct.price * --existingProduct.quantity,
                quantity: existingProduct.quantity,
              },
            ]
          : []),
      ];
      --state.total_quantity;
    },

    incrementLocalCartQuantity: (
      state,
      { payload: productId }: PayloadAction<IProduct["product_id"]>
    ) => {
      const existingProduct = state.items.find(
        (item) => item.product_id === productId
      );

      if (!existingProduct) {
        return;
      }

      state.cart_price += +existingProduct.price;
      state.items = [
        ...state.items.filter((items) => items.product_id !== productId),
        {
          ...existingProduct,
          all_price: +existingProduct.price * ++existingProduct.quantity,
          quantity: existingProduct.quantity,
        },
      ];
      ++state.total_quantity;
    },

    removeFromLocalCart: (
      state,
      { payload: productId }: PayloadAction<IProduct["product_id"]>
    ) => {
      const existingProduct = state.items.find(
        (item) => item.product_id === productId
      );

      if (!existingProduct) {
        return;
      }

      state.cart_price -= +existingProduct.price * existingProduct.quantity;
      state.items = state.items.filter((i) => i.product_id !== productId);
      state.total_quantity -= existingProduct.quantity;
    },
  },
});

export const {
  actions: {
    addToLocalCart,
    clearLocalCart,
    decrementLocalCartQuantity,
    incrementLocalCartQuantity,
    removeFromLocalCart,
  },
  reducer: localCartReducer,
} = localCartSlice;
