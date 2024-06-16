import { ProductContainer } from "@/Components/Inventory/ProductContainer";
import React from "react";

export const Inventory = () => {
  return (
    <section className="px-8 py-5 bg-inpu t/20 lg:h-[91vh] xl:h-[95vh] overflow-auto font-jakarta">
      <div>
        {/* <p className="text-4xl font-semibold">Inventory</p> */}
        
      </div>
      <div><ProductContainer/></div>
    </section>
  );
};
