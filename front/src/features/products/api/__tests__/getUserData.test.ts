import { axiosInstance } from '@/application/api';

import { ProductsService } from '../products.service';

import { IProducts } from '../interfaces';

const mockProductsData: IProducts = {
  count_category: 1,
  count_pages: 1,
  products: [
    {
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
    }
  ]
};

jest.mock('@/application/api', () => ({
  axiosInstance: {
    get: jest.fn()
  }
}));

describe('getAll', () => {
  it('should return a successful response', async () => {
    (axiosInstance.get as jest.Mock).mockResolvedValue({
      data: mockProductsData
    });

    const productsData = await ProductsService.getAll();

    expect(productsData.data).toEqual(mockProductsData);
  });
});
