// contains all of the endpoints to work with the backend

import { apiSlice } from "./apiSlice";

const PRODUCT_URL = "api/product";


export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/getall`,
        method: "GET",

      }),
    }),

    uploadImage: builder.mutation({
      query: (body) => ({
        url: `https://api.cloudinary.com/v1_1/dhm9hywhz/image/upload/`,//v1_1/<cloud_name>/image/upload
        method: "POST",
        body:body,
        // credentials : "include"
      }),
    }),

    addProduct: builder.mutation({
      query: (body) => ({
        url: `${PRODUCT_URL}/create`,
        method: "POST",
        body:body,
      }),
    }),
   
  }),
});

export const {
useGetAllProductsQuery,
useUploadImageMutation,
useAddProductMutation
} = productSlice;

// Create our own endpoints in this file and it will inject them into the endpoints in the apiSlice file
// in our form, we just need to dispatch the login action and it will do the work

// Mutation is a specific type of state update operation that modifies the state in a Redux store
// slice is used for grouping
