import { IProduct } from '@/entities/product';

export const productMock: IProduct = {
  characteristics: [
    {
      name: 'price',
      translations: {
        en: 'Price',
        uk: 'Ціна'
      },
      value: '12123',
      value_translations: {
        en: '12123 ₴',
        uk: '12123 ₴'
      }
    }
  ],
  images: [],
  price: '',
  product_id: 1,
  rating: 5,
  slug: 'gpu',
  title: 'RX 7700 XT',
  translations_slug: {
    en: 'Graphics cards',
    uk: 'Відеокарти'
  },
  views: 1
};
