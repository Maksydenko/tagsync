import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ICart } from '@/entities/cart';
import { IProduct } from '@/entities/product';

import { QueryKey } from '@/shared/model';

const DEFAULT_LOCAL_CART: ICart = {
  cart_price: 0,
  items: [],
  total_quantity: 0
};

interface ILocalCartState {
  addToLocalCart: (product: IProduct) => void;
  clearLocalCart: () => void;
  decrementLocalCartQuantity: (product: IProduct['product_id']) => void;
  incrementLocalCartQuantity: (product: IProduct['product_id']) => void;
  localCart: ICart;
  removeFromLocalCart: (product: IProduct['product_id']) => void;
}

export const useLocalCart = create<ILocalCartState>()(
  persist(
    set => ({
      addToLocalCart: product =>
        set(({ localCart }) => ({
          localCart: {
            cart_price: localCart.cart_price + +product.price,
            items: [
              ...localCart.items,
              {
                ...product,
                all_price: +product.price,
                quantity: 1
              }
            ],
            total_quantity: ++localCart.total_quantity
          }
        })),
      clearLocalCart: () =>
        set(() => ({
          localCart: structuredClone(DEFAULT_LOCAL_CART)
        })),
      decrementLocalCartQuantity: productId =>
        set(({ localCart }) => {
          const existingProduct = localCart.items.find(
            item => item.product_id === productId
          );

          if (!existingProduct) {
            return {
              localCart
            };
          }

          return {
            localCart: {
              cart_price: localCart.cart_price - +existingProduct.price,
              items: [
                ...localCart.items.filter(
                  item => item.product_id !== productId
                ),
                {
                  ...existingProduct,
                  all_price:
                    +existingProduct.all_price - +existingProduct.price,
                  quantity: --existingProduct.quantity
                }
              ],
              total_quantity: --localCart.total_quantity
            }
          };
        }),
      incrementLocalCartQuantity: productId =>
        set(({ localCart }) => {
          const existingProduct = localCart.items.find(
            item => item.product_id === productId
          );

          if (!existingProduct) {
            return {
              localCart
            };
          }

          return {
            localCart: {
              cart_price: localCart.cart_price + +existingProduct.price,
              items: [
                ...localCart.items.filter(
                  item => item.product_id !== productId
                ),
                {
                  ...existingProduct,
                  all_price:
                    +existingProduct.all_price + +existingProduct.price,
                  quantity: ++existingProduct.quantity
                }
              ],
              total_quantity: ++localCart.total_quantity
            }
          };
        }),
      localCart: structuredClone(DEFAULT_LOCAL_CART),
      removeFromLocalCart: productId =>
        set(({ localCart }) => {
          const existingProduct = localCart.items.find(
            item => item.product_id === productId
          );

          if (!existingProduct) {
            return {
              localCart
            };
          }

          return {
            localCart: {
              cart_price: localCart.cart_price - +existingProduct.all_price,
              items: localCart.items.filter(
                item => item.product_id !== productId
              ),
              total_quantity:
                localCart.total_quantity - +existingProduct.quantity
            }
          };
        })
    }),
    {
      name: QueryKey.Cart
    }
  )
);
