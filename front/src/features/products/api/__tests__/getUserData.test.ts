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
  beforeEach(() => {
    (axiosInstance.get as jest.Mock).mockResolvedValue({
      data: mockProductsData
    });
  });

  it('should return a successful response', async () => {
    const productsData = await ProductsService.getAll();

    expect(productsData.data).toEqual(mockProductsData);
  });

  it('должен корректно обрабатывать ошибку', async () => {
    (axiosInstance.get as jest.Mock).mockRejectedValue(
      new Error('Network error')
    );

    await expect(ProductsService.getAll()).rejects.toThrow('Network error');
  });
});
