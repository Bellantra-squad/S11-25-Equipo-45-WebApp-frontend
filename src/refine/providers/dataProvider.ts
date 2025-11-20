import dataProviderSimpleRest from "@refinedev/simple-rest";

// export const dataProvider = dataProviderSimpleRest(
//   "https://api.fake-rest.refine.dev"
// );

// import type { LogicalFilter } from "@refinedev/core";
import { DataProvider } from "@refinedev/core";
import { API_BASE } from "../config/env";
import { httpApi } from "../api/httpApi";

const baseProvider = dataProviderSimpleRest(API_BASE, httpApi);

// interface ListParams {
//   page: number;
//   page_size: number;
//   [key: string]: string | number | boolean | undefined;
// }

export const dataProvider: DataProvider = {
    ...baseProvider,
    // getList: async ({ resource, pagination, filters, sorters }) => {
    //   const { currentPage = 1, pageSize = 10 } = pagination ?? {};
    //   const params: ListParams = { page: currentPage, page_size: pageSize };

    //   filters?.forEach((filter) => {
    //     const f = filter as LogicalFilter;
    //     params[f.field] = f.value;
    //   });

    //   if (sorters && sorters.length > 0) {
    //     params.ordering = sorters
    //       .map((s) => (s.order === "asc" ? s.field : `-${s.field}`))
    //       .join(",");
    //   }

    //   const { data } = await httpApi.get(`/${resource}/`, { params });
    //   return { data: data.results ?? data, total: data.count ?? data.length };
    // },

};