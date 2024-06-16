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
import { Link } from "react-router-dom";

export const ProductContainer = () => {
  //state
  const [resultProducts, setresultProducts] = useState([]); //store the products from the server
  const [displayProducts, setdisplayProducts] = useState([]); //store the products from the server
  const [searchTerm, setSearchTerm] = useState(""); // New state for holding the search term

  //hooks
  const { data, error, isLoading, refetch } = useGetAllProductsQuery(); //hook that does the api call and gets the products
  
  //useEffects
  useEffect(() => {
    if (data) {
      console.log(data?.data);
      setresultProducts(data?.data);
      setdisplayProducts(data?.data);
    } else if (error) {
      toast.error("Error occured, try again");
    }
  }, [data, isLoading]);

  //handlers

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm === "") {
      setdisplayProducts(resultProducts);
    } else {
      const filteredProducts = resultProducts.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())||
        product.productId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setdisplayProducts(filteredProducts);
    }
  }, [searchTerm, resultProducts]);


  //loading and Errors

  if (isLoading) {
    return (
      <div className="font-medium text-xl text-center text-text/80 font-jakarta">
        <span className="mr-1 flex items-center justify-center gap-1">
          <LoadingIcon />
          Loading products...
        </span>
      </div>
    );
  } else if (error) {
    return (
      <div className="font-medium text-xl text-center text-red-500">
        Error occured, try again...
      </div>
    );
  }
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
                  <TableRow key={idx} className='border-input'>
                    <TableCell>
                      {idx+1}
                    </TableCell>
                    <TableCell>
                      {item.productId}
                    </TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.lowOnStock ? <Badge variant={'destructive'} >Low</Badge>:<Badge className={'bg-green-700'} > In stock</Badge>}</TableCell>
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
