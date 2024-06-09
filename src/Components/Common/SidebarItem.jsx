// SidebarItem.js

import React from 'react';
import { Link, useResolvedPath } from 'react-router-dom';

const SidebarItem = ({ isOpen, name, icon, link }) => {

  const active = useResolvedPath().pathname;

  return (
    <Link to={link}>
      <li
        className={`
          relative flex items-center py-2 px-3 my-1
          rounded-md cursor-pointer
          transition-colors group
          ${
            active === link
              ? "bg-primary/30 text-orange-600 font-semibold"
              : "hover:bg-primary/30 text-text hover:text-"
          }
        `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            isOpen ? "w-52 ml-3" : "w-0"
          }`}
        >
          {name}
        </span>

        {!isOpen && (
          <div
            className={`
              absolute left-full rounded-md px-2 py-1 ml-6
              bg-primary /10 text-white text-sm
              invisible opacity-20 -translate-x-3 transition-all
              group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            `}
          >
            {name}
          </div>
        )}
      </li>
    </Link>
  );
};

export default SidebarItem;
