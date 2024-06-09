import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://inventory-management-system-opal.vercel.app',credentials : "include" }); // Set your backend server URL

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'], // used for caching instead of fetching everytime from database
    endpoints: (builder) => ({}),
    // refetchOnMountOrArgChange:true,


})

//folldername change