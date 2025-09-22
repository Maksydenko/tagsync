import { graphqlClient } from '@/application/api';

import { ICountries } from './interfaces';
import { GET_COUNTRIES } from './queries';

export const CountriesService = {
  getCountries: async () => {
    try {
      const response = await graphqlClient.request<ICountries>(GET_COUNTRIES);

      return response;
    } catch (err) {
      throw err;
    }
  }
};
