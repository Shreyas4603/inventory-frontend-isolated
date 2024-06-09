import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://inventory-backend-isolated.onrender.com',credentials : "include" }); // Set your backend server URL

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'], // used for caching instead of fetching everytime from database
    endpoints: (builder) => ({}),
    // refetchOnMountOrArgChange:true,


})

//folldername change