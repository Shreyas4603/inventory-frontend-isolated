import { ImageSelectComponent } from "@/Components/Inventory/ImageSelectComponent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { LoadingIcon } from "@/assets/loaderIcon";

import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  useAddProductMutation,
  useUploadImageMutation,
} from "@/Slices/productSlice";
import { addSchema } from "@/Utils/addProductSchema";

import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export const AddProduct = () => {
// Define a schema for input validation (not shown in the provided code)
const productSchema = addSchema();

// RTK Query hooks for uploading images and adding products
const [uploadImage] = useUploadImageMutation(); // Hook for uploading images to Cloudinary
const [addProduct] = useAddProductMutation(); // Hook for adding a product via POST/PATCH/DELETE methods

// Sample data for demonstration purposes
const sampleData = {
  category: "Game",
  minimumQuantity: 1,
  productId: "P_123",
  productImageURL: "https://res.cloudinary.com/dhm9hywhz/image/upload/v1718562546/sample_upload/mgxyrwmjxkefri6vym9w.png",
  productName: "valorant",
  purchasePrice: 33,
  salePrice: 33,
  units: 345,
};

// State initialization
const [product, setProduct] = useState({ // Default values for product details
  productId: "",
  productName: "",
  productImageURL: "",
  units: 0,
  salePrice: 0,
  purchasePrice: 0,
  minimumQuantity: 0,
  category: "",
});
const [loader, setloader] = useState({ // Track loading states for image upload and product addition
  uploadImageLoader: false,
  addProductLoader: false,
});
const [selectedFile, setSelectedFile] = useState(null); // Hold the selected file for upload
const [uploadedImage, setuploadedImage] = useState(null); // Store the URL of the uploaded image

// Handlers

const handlUploadImage = async () => { // Function to handle image upload
  setloader({...loader, uploadImageLoader: true }); // Start the upload loader
  const formBody = new FormData(); // Prepare form data for upload
  formBody.append("file", selectedFile); // Append the selected file
  formBody.append("upload_preset", "product_preset"); // Specify Cloudinary preset
  formBody.append("cloud_name", "dhm9hywhz"); // Specify Cloudinary collection name
  formBody.append("folder", "sample_upload"); // Optional folder organization
  try {
    const { data, error } = await uploadImage(formBody); // Perform the upload
    setloader({...loader, uploadImageLoader: false }); // Stop the upload loader

    if (data) { // On successful upload
      setuploadedImage(data.secure_url); // Save the secure URL of the uploaded image
      toast.success("Image uploaded successfully"); // Notify success
    } else if (error) { // On upload failure
      toast.error("Failed to upload, Try again"); // Notify failure
    }
  } catch (error) { // Catch any errors during upload
    toast.error("Failed to upload, Try again"); // Notify failure
    console.log(error); // Log the error for debugging
  }
};

const handleChange = (e) => { // Function to handle input changes
  const { name, value } = e.target; // Destructure event target
  let convertedValue = value; // Initialize value to be set

  // Convert value to number if the input is for numeric fields
  if (["units", "salePrice", "purchasePrice", "minimumQuantity"].includes(name)) {
    convertedValue = Number(value);
  }

  setProduct((prevState) => ({ // Update product state
   ...prevState,
    [name]: convertedValue, // Use dynamic key to update specific field
  }));
};

const handleSubmit = async (e) => { // Function to handle form submission
  e.preventDefault(); // Prevent default form submission behavior
  try {
    setloader({...loader,addProductLoader:true}); // Start the product addition loader
    const { data, error } = await addProduct( // Call the mutation to add the product
       {
        category: product.category,
        minimumQuantity: product.minimumQuantity,
        productId: product.productId,
        productImageURL: product.productImageURL,
        productName: product.productName,
        purchasePrice: product.purchasePrice,
        salePrice: product.salePrice,
        units: product.units,
        productImageURL: uploadedImage, // Use the uploaded image URL
      },
    );
    setloader({...loader,addProductLoader:false}); // Stop the product addition loader

    // Handle success or failure of product addition
    if (data) {
      console.log("Success:", data); // Log success message
      toast.success(data?.message); // Display success notification
    } else if (error) {
      console.error("Error:", error); // Log error message
      toast.error(error?.message || "Failed to add product, try again"); // Display error notification
    }
  } catch (error) { // Catch any errors during submission
    console.error("Submission failed:", error); // Log the error for debugging
    toast.error("Failed to add product, try again"); // Display error notification
  }
};

  return (
    <div className="px-8 py-5 bg-inpu t/20 lg:h-[91vh] xl:h-[95vh] overflow-auto font-jakarta  mx-auto xl:w-3/4">
      <div className="pb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/inventory">Inventory</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="inventory/add-product">
                Add Product
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="">
        <p className="text-4xl font-semibold">Add Product</p>
        <p className="text-text/70">Easily your products and their details</p>
        <div className=" grid grid-cols-2 ">
          {/* Product data filling Form */}
          <div className="w-3/4 mt-9 space-y-2">
            {productSchema?.map((item, idx) => (
              <div className="space-y-1" key={idx}>
                <Label>{item.label}</Label>
                <input
                  type={item.type}
                  onChange={(e) => handleChange(e)}
                  label={item?.label}
                  name={item.name}
                  placeholder={item.placeholder}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            ))}
            <Button onClick={handleSubmit}  disabled={loader.addProductLoader} className={ `${loader.addProductLoader?" hover:cursor-not-allowed  disabled:cursor-not-allowed":""}  w-full`}>{loader.addProductLoader? <span className="flex items-center gap-2 "><LoadingIcon/> Submitting...</span>:"Add"}</Button>
          </div>

          {/* image upload section */}
          <div>
            {/* <input type="file" name="" id="" typeof="image"  accept=".png,.jpg,jpeg"  onChange={handleFileChange}/> */}
            <ImageSelectComponent
              file={selectedFile}
              setFile={setSelectedFile}
            />
            <Button onClick={handlUploadImage} disabled={loader.uploadImageLoader} className={ `${loader.uploadImageLoader?" hover:cursor-not-allowed  disabled:cursor-not-allowed":""}  w-full`}>
            {loader.uploadImageLoader? <span className="flex items-center gap-2 "><LoadingIcon/> Uploading...</span>:"Add"}
            </Button>
          </div>
          {/* Image Preview Section */}
        </div>
      </div>
    </div>
  );
};
