import React from "react";
import { TextCard } from "@/Components/Common/TextCards";
export const Dashboard = () => {
  return (
    <section className="px-8 py-5">
      <div className="text-4xl font-jakarta font-semibold">Dashboard</div>
      <div className="flex justify-end">
        <div className="mt-4 flex flex-col gap-6 ">
          <TextCard name="total items" data="5" />
          <TextCard name="low items" data="5" />
          <TextCard name="profits" data="5" />
          <TextCard name="best Seller" data="5" />
        </div>
      </div>
    </section>
  );
};
