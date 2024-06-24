import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' }); // Set your backend server URL
<<<<<<< HEAD
// const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:8080', credentials: 'include' }); // Set your backend server URL
=======
// const baseQuery = fetchBaseQuery({ baseUrl: 'https://inventory-backend-isolated.onrender.com' ,credentials:'include'}); // Set your backend server URL
>>>>>>> f666f572778d067c4f5f71f0ddb0df0d0f75f281

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'], // used for caching instead of fetching everytime from database
  endpoints: (builder) => ({}),
    refetchOnMountOrArgChange:true,
})