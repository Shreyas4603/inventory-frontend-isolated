import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  useGetOneProductQuery,
  useUpdateProductMutation,
} from "@/Slices/productSlice";
import { LoadingIcon } from "@/assets/loaderIcon";
import { Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export const ViewAndEditProduct = () => {
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useGetOneProductQuery(id);
  const [productData, setproductData] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isUpdateLoading, setisUpdateLoading] = useState(false);

  //React hooks
  const navigate = useNavigate();

  //RTK Query Hooks
  const [update] = useUpdateProductMutation();

  //Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setproductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setisUpdateLoading(true);
    try {
      const { data, error } = await update(productData);
      if (data.success) {
        await refetch();
        toast.success("Updated succuessfully");
        setIsDisabled(true);
      } else if (error) {
        toast.error("Failed to update");
        console.log(error);
      }
    } catch (error) {
      toast.error("Failed to update");
    } finally {
      setisUpdateLoading(false);
    }
  };

  // Effect to update products state when data changes
  useEffect(() => {
    if (data) {
      console.log(data?.data); // Log fetched data for debugging
      setproductData(data?.data);
      // Also update display products initially
    } else if (error) {
      console.log(error);
      toast.error("Error occurred, try again"); // Show error toast if fetch fails
    }
  }, [data, isLoading]);

  useEffect(() => {
    console.log("productData", productData);
  }, [productData]);

  return (
    <section className="px-8 py-5 bg-inpu t/20 lg:h-[91vh] xl:h-[95vh] overflow-auto font-jakarta  mx-auto xl:w-3/4">
      <div className="pb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/inventory">Inventory</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="">View Product</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="my-5 flex gap-2">
        <Button
          className=" flex gap-2 "
          variant="secondary"
          onClick={() => setIsDisabled(!isDisabled)}
        >
          <Edit />
          Edit
        </Button>

        <Button onClick={handleSubmit} disabled={isUpdateLoading}>
          {" "}
          {isUpdateLoading ? (
            <span className="flex gap-3 items-center">
              <LoadingIcon />
              Updating...
            </span>
          ) : (
            "Update"
          )}
        </Button>
      </div>

      <div className="">
        <div>
          {" "}
          <p className="text-4xl font-semibold">View and Edit Product</p>
          <p className="text-text/70">Seamlessly view and edit your product</p>
          <div className="mt-5">
            <p>Product Image</p>
            <img
              src={productData?.productImageURL}
              alt="Product Image"
              className="max-h-40 rounded-md"
            />
          </div>
        </div>
        <div className="mt-10">
          <Label>Product details</Label>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3   p-5 rounded-md">
            <div className="flex flex-col">
              <label className="text-sm mb-1 text-text">Product ID:</label>
              <Input
                type="text"
                name="productId"
                value={productData?.productId || ""}
                disabled={isDisabled}
                onChange={handleChange}
                className="p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1 text-text">Product Name</label>
              <Input
                type="text"
                name="productName"
                value={productData?.productName || ""}
                disabled={isDisabled}
                onChange={handleChange}
                className="p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1 text-text">Units</label>
              <Input
                type="number"
                name="units"
                value={productData?.units || ""}
                disabled={isDisabled}
                onChange={handleChange}
                className="p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1 text-text">Sale Price</label>
              <Input
                type="number"
                name="salePrice"
                value={productData?.salePrice || ""}
                disabled={isDisabled}
                onChange={handleChange}
                className="p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1 text-text">Purchase Price</label>
              <Input
                type="number"
                name="purchasePrice"
                value={productData?.purchasePrice || ""}
                disabled={isDisabled}
                onChange={handleChange}
                className="p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1 text-text">Category</label>
              <Input
                type="text"
                name="category"
                value={productData?.category || ""}
                disabled={isDisabled}
                onChange={handleChange}
                className="p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1 text-text">Minimum Quantity</label>
              <Input
                type="number"
                name="minimumQuantity"
                value={productData?.minimumQuantity || ""}
                disabled={isDisabled}
                onChange={handleChange}
                className="p-2 border rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
