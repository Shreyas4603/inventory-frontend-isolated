import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  useGetAllProductsQuery,
} from "@/Slices/productSlice";
import { TextCard } from "@/Components/Common/TextCards";
export const Dashboard = () => {

  const [resultProducts, setresultProducts] = useState([]); // Stores fetched products
  const [lowCount, setLowCount] = useState(0); // Stores products to be displayed after filtering
  const { data, error, isLoading, refetch } = useGetAllProductsQuery();
  useEffect(() => {
    console.log(data);
    if (data) {
      setresultProducts(data?.data); // Update state with fetched products
      setLowCount(data?.data.filter((product) => product.units <= product.minimumQuantity).length);
    }
    else if (error) {
      toast.error("Error occurred, try again"); // Show error toast if fetch fails
    }
  }, [data, isLoading,]); // Dependencies: data and isLoading
  return (
    <section className="px-8 py-5">
      <div className="text-4xl font-jakarta font-semibold">Dashboard</div>
      <div className="flex justify-end">
        <div className="mt-4 flex flex-col gap-6 ">
          <TextCard name="total items" data={resultProducts.length} />
          <TextCard name="low items" data={lowCount} />
          <TextCard name="profits" data="5" />
          <TextCard name="best Seller" data="5" />
        </div>
      </div>
    </section>
  );
};
