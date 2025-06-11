import { axiosInstance } from '@/application/api';

import { ProductsService } from '../products.service';

import { productsDataMock } from '../__mocks__';

jest.mock('@/application/api', () => ({
  axiosInstance: {
    get: jest.fn()
  }
}));

describe('getAll', () => {
  beforeEach(() => {
    (axiosInstance.get as jest.Mock).mockResolvedValue({
      data: productsDataMock
    });
  });

  it('should return a successful response', async () => {
    const productsData = await ProductsService.getAll();

    expect(productsData.data).toEqual(productsDataMock);
  });
});
