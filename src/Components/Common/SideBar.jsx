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
  ];

  return (
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
        <LowStock isOpen={isOpen} />
      </nav>
    </aside>
  );
};
// export const SideBar=()=>{
//   return <div>Sidebar</div>
// }
