import { useGetAllProductsQuery } from "@/Slices/productSlice";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { LoadingIcon } from "@/assets/loaderIcon";
import { Input } from "../ui/input";
import { Edit, LucideTrash, PlusCircle, Search, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Link, useNavigate } from "react-router-dom";

export const ProductContainer = () => {
// State declarations
const [resultProducts, setresultProducts] = useState([]); // Stores fetched products
const [displayProducts, setdisplayProducts] = useState([]); // Stores products to be displayed after filtering
const [searchTerm, setSearchTerm] = useState(""); // Holds the current search term


//React Hooks
const navigate=useNavigate()


// Custom hook for API call
const { data, error, isLoading, refetch } = useGetAllProductsQuery();

// Effect to update products state when data changes
useEffect(() => {
  if (data) {
    console.log(data?.data); // Log fetched data for debugging
    setresultProducts(data?.data); // Update state with fetched products
    setdisplayProducts(data?.data); // Also update display products initially
  } else if (error) {
    toast.error("Error occurred, try again"); // Show error toast if fetch fails
  }
}, [data, isLoading]); // Dependencies: data and isLoading

// Handler for search input changes
const handleSearchChange = (event) => {
  setSearchTerm(event.target.value); // Update searchTerm state with input value
};

// Effect to filter products based on searchTerm
useEffect(() => {
  if (searchTerm === "") {
    setdisplayProducts(resultProducts); // Reset display products if searchTerm is empty
  } else {
    const filteredProducts = resultProducts.filter(product =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productId.toLowerCase().includes(searchTerm.toLowerCase())
    ); // Filter products by name or ID
    setdisplayProducts(filteredProducts); // Update display products with filtered results
  }
}, [searchTerm, resultProducts]); // Dependencies: searchTerm and resultProducts

//Handlers
const handleClick=(id)=>{
  navigate(`${id}`)
}

// Render loading state
if (isLoading) {
  return (
    <div className="...">
      <span className="flex items-center justify-center gap-2">
        <LoadingIcon />
        Loading products...
      </span>
    </div>
  );
}

// Render error state
else if (error) {
  return (
    <div className="...">
      Error occurred, try again...
    </div>
  );
}

// Main render
  return (
    <section >
      <div>
        <p className="text-4xl font-semibold">All Products</p>
        <p className="text-text/70">
          Manage your products and view stock data.
        </p>
      </div>

      <div className="bg-red-9 00 ">
        <div className="py-3 flex items-center justify-start gap-3">
          <div className="relative   ">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products by name, id..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[406px]"
              onChange={handleSearchChange}
            />
          </div>
          <div><Link to='/add-product' className='flex gap-2 items-center bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md'> <span><PlusCircle/></span>Add product</Link></div>
        </div>
        <div>
          <Card className='border border-input'>
            <Table>
              <TableHeader>
                <TableRow className='border-input'>
                  <TableHead>Sl no.</TableHead>
                  <TableHead>Product Id</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Stoct status</TableHead>
                  <TableHead>Purchase Price</TableHead>
                  <TableHead>Sale Price</TableHead>
                  <TableHead className=''>Minimum Quantity</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>
                    <span className="">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayProducts?.map((item, idx) => (
                  <TableRow key={idx} className='border-input' onClick={()=>handleClick(item._id)}>
                    <TableCell>
                      {idx+1}
                    </TableCell>
                    <TableCell>
                      {item.productId}
                    </TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{(item.units<item.minimumQuantity) ? <Badge className={'bg-red-700 hover:bg-red-900'} > Low stock</Badge> : <Badge className={'bg-green-700 hover:bg-green-900'} > In stock</Badge>}</TableCell>
                    <TableCell >{item.purchasePrice}</TableCell>
                    <TableCell >{item.salePrice}</TableCell>
                    <TableCell className=''>{item.minimumQuantity}</TableCell>
                    <TableCell>{item.units}</TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Button size='icon' className='' variant='secondary'> <Edit   className="w-5"/></Button>
                        <Button size='icon' className='' variant='destructive'> <LucideTrash   className="w-5"/></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </section>
  );
};
