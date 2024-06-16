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
  const productSchema = addSchema(); // Input field Schema

  //Hooks
  const [uploadImage] = useUploadImageMutation(); //RTK query tht uploads image to cloudinary
  const [addProduct] = useAddProductMutation(); //RTK query tht add a  product (METHOD=POST/PATCH/DELETE)

  const sampleData = {
    category: "Game",
    minimumQuantity: 1,
    productId: "P_123",
    productImageURL:
      "https://res.cloudinary.com/dhm9hywhz/image/upload/v1718562546/sample_upload/mgxyrwmjxkefri6vym9w.png",
    productName: "valorant",
    purchasePrice: 33,
    salePrice: 33,
    units: 345,
  };

  //state
  const [product, setProduct] = useState({
    productId: "",
    productName: "",
    productImageURL: "",
    units: 0,
    salePrice: 0,
    purchasePrice: 0,
    minimumQuantity: 0,
    category: "",
  }); //stores default values
  const [loader, setloader] = useState({
    uploadImageLoader: false,
    addProductLoader: false,
  }); //Loaders all loading process
  const [selectedFile, setSelectedFile] = useState(null); //hold the selected file
  const [uploadedImage, setuploadedImage] = useState(null); //Stores the Uploaded file

  //handlers


  const handlUploadImage = async () => {
    setloader({ ...loader, uploadImageLoader: true });
    const formBody = new FormData();
    formBody.append("file", selectedFile);
    formBody.append("upload_preset", "product_preset"); //Present Name from cloudinary
    formBody.append("cloud_name", "dhm9hywhz"); // Collection Name
    formBody.append("folder", "sample_upload"); //Folder name (Optional) better to keep to make things organised
    try {
      const { data, error } = await uploadImage(formBody);
    setloader({ ...loader, uploadImageLoader: false });

      if (data) {
        setuploadedImage(data.secure_url); //Storing the uploaded URL
        toast.success("Image uploaded successfully");
      } else if (error) {
        toast.error("Failed to upload, Try again");
      }
    } catch (error) {
      toast.error("Failed to upload, Try again");
      console.log(error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    let convertedValue = value;

    // Check if the input type is number and convert the value accordingly
    if (
      ["units", "salePrice", "purchasePrice", "minimumQuantity"].includes(name)
    ) {
      convertedValue = Number(value);
    }

    setProduct((prevState) => ({
      ...prevState,
      [name]: convertedValue,
    }));
  };

  //track the change and update the state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit the form data to the server
      setloader({...loader,addProductLoader:true})
      const { data, error } = await addProduct(
         {
          category: product.category,
          minimumQuantity: product.minimumQuantity,
          productId: product.productId,
          productImageURL: product.productImageURL,
          productName: product.productName,
          purchasePrice: product.purchasePrice,
          salePrice: product.salePrice,
          units: product.units,
          productImageURL: uploadedImage,
        },
      );
      setloader({...loader,addProductLoader:false})


      // Handle success or failure
      if (data) {
        console.log("Success:", data);
        toast.success(data?.message)
      } else if (error) {
        console.error("Error:", error);
        toast.error(error?.message||"Failed to add product, try again")
      }
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to add product, try again")

    }
  };

  //useEffects
  useEffect(() => {
    console.log(loader);
  }, [loader]);

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
                {/* <Input
                onChange={(e)=>handleChange(e)}
                  label={item?.label}
                  name={item.name}
                  type={item.type}
                  placeholder={item.placeholder}
                /> */}
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
// <div className="p-2 rounded-md   mt-5">
//   {/* If image link is present in the UploadedImage state display the image else display message */}
//   {uploadedImage?<div><p className="text-xl  font-semibold text-text/60 pb-2 ">Product Image</p><img className="w-64 aspect-video rounded-md" src={uploadedImage} alt="Uploaded Image"/></div>:<p className="text-center text-text/50 font-medium text-lg">No images uploaded yet</p>}
// </div>
