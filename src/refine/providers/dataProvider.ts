import dataProviderSimpleRest from "@refinedev/simple-rest";

export const dataProvider = dataProviderSimpleRest(
  "https://api.fake-rest.refine.dev"
);