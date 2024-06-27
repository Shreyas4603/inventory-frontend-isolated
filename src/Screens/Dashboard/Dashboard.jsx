import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

export const Dashboard = () => {
  return (
    <section className="px-8 py-5">
      <div className="text-4xl font-jakarta font-semibold">Dashboard</div>
      <div className="flex justify-end">
        <div className="mt-4 flex flex-col gap-6 ">
          <div
            className="select-none max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 
            dark:bg-black dark:border-gray-700 dark:hover:bg-white/20 "
          >
            Total items:
          </div>
          <div
            className="select-none max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 
            dark:bg-black dark:border-gray-700 dark:hover:bg-white/20"
          >
            Low Stocks:
          </div>
          <div className="select-none max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-black dark:border-white/10 dark:hover:bg-white/20 ">
            something 1
          </div>
          <div className="select-none max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-black dark:border-white/10 dark:hover:bg-white/20 ">
            something 2
          </div>
        </div>
      </div>
    </section>
  );
};
