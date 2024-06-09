import {
  AlertCircleIcon,
  AlertTriangleIcon,
  BoxesIcon,
  LucideMessageCircleQuestion,
  OctagonAlertIcon,
  SignalLowIcon,
} from "lucide-react";
import React from "react";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

const LowStock = ({ isOpen }) => {
  const name = "Low Stocks";
  const alerts = 3;
  const icon = alerts > 0 ? <OctagonAlertIcon /> : <BoxesIcon />;
  const active =window.location.pathname;

  return (
    <Link to={"/low-stock"}>
      <div
        className={`
          relative flex items-center py-2 px-3 my-1 
          rounded-md cursor-pointer
          transition-colors group
          ${
            active === "/low-stock"
              ? "bg-primary/30 text-orange-600 font-semibold"
              : "hover:bg-primary/30 text-text hover:text-"
          }
        `}
      >
        
        {isOpen ? icon : <div className=" relative">{icon} <Badge className={'p-1 py-0 absolute -top-2 left-3'} variant={"destructive"}>{alerts}</Badge></div>}
        <span
          className={`flex items-center justify-between overflow-hidden transition-all line-clamp-1 ${
            isOpen ? "w-52 ml-3" : "w-0 h-0"
          }`}
        >
          {name}
          <Badge variant={"destructive"}>{alerts}</Badge>
        </span>

        {!isOpen && (
          <div
            className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-primary /10 text-white text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
              w-max
            `}
          >
            {name}
          </div>
        )}
      </div>
    </Link>
  );
};

export default LowStock;
