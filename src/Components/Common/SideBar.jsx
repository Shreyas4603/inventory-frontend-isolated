import {
  ChevronFirst,
  ChevronLast,
  IndianRupeeIcon,
  LayoutDashboardIcon,
  Package2Icon,
} from "lucide-react";
import { useSelector } from "react-redux";
import SidebarItem from "./SidebarItem";
import LowStock from "./LowStock";

// import { useSelector } from "react-redux";
// import SidebarItem from "./SidebarItem";
// import LowStock from "./LowStock";

export const SideBar = () => {
  const isOpen = useSelector((state) => state?.sideBarOpen?.isSidebarOpen);

  const options = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <LayoutDashboardIcon className="w-5" />,
    },
    {
      name: "Inventory", //u can see n n add products
      link: "/inventory",
      icon: <Package2Icon className="w-5" />,
    },
    {
      name: "Orders", //u can see n n add products
      link: "/orders",
      icon: <Package2Icon className="w-5" />,
    },
  ];

  return (
    <div>
      <aside className=" lg:h-[89.3vh] 2xl:h-[93vh] font-teachers font-medium text-lg border-r border-x-muted  left-0 top-16 py-2 px-1 bg-background flex flex-col justify-between ">
        <nav className=" flex flex-col  items-center">
          <ul className="flex flex-col px-1">
            {options.map((item, idx) => (
              <SidebarItem
                key={idx}
                name={item?.name}
                link={item?.link}
                icon={item?.icon}
                isOpen={isOpen}
              />
            ))}
          </ul>
          {/* <LowStock isOpen={isOpen} /> */}
        </nav>
      </aside>
      <div>
        <div className="absolute w-[257px] h-[127px] left-[-130.08px] top-[396px] bg-[rgba(249,115,22,0.25)] rounded-[57px_466px_110px_104px] transform rotate-[15.02deg]"></div>
      </div>
      <div>
        <div className="absolute w-[100.33px] h-[65.87px] left-[125px] top-[410px] bg-[rgba(249,115,22,0.5)] rounded-[200px_33px_240px_34px] transform rotate-[-27.77deg]"></div>
      </div>
      <div>
        <div classn="absolute w-[20px] h-[20px] left-[120px] top-[490px] rounded-full bg-[rgba(249,115,22,0.5)]"></div>
      </div>
    </div>
  );
};
// export const SideBar=()=>{
//   return <div>Sidebar</div>
// }
