import type { Fruit } from "~/types";
import ApiClient from "../api-client";
import type ApiOptions from "../api-options";

export default {
  getAllFruits: (options: ApiOptions = {}) => {
    const api = new ApiClient(options);
    return api.get("/api/fruit/all");
  },

  getFruitsByNutrition: (
    {
      nutrition,
      min = 0,
      max = 1000,
    }: { nutrition: string; min: number; max: number },
    options: ApiOptions = {},
  ) => {
    const api = new ApiClient(options);
    return api.get(`/api/fruit/${nutrition}?min=${min}&max=${max}`);
  },

  getFruitsByFamily: (family: string, options: ApiOptions = {}) => {
    const api = new ApiClient(options);
    return api.get(`/api/fruit/family/${family}`);
  },

  getFruitsByGenus: (genus: string, options: ApiOptions = {}) => {
    const api = new ApiClient(options);
    return api.get(`/api/fruit/genus/${genus}`);
  },

  getFruitsByOrder: (order: string, options: ApiOptions = {}) => {
    const api = new ApiClient(options);
    return api.get(`/api/fruit/order/${order}`);
  },

  addFruit: (data: Fruit, options: ApiOptions = {}) => {
    const api = new ApiClient(options);
    return api.post(`/api/fruit`, data);
  },
};
