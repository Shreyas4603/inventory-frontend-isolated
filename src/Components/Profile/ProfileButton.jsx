import React from "react";
import { UserCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
// import { Link } from "react-router-dom"
import { Button } from "../ui/button";
import { useUserLogoutMutation } from "@/Slices/usersApiSlice";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { userLogout } from "@/Slices/authSlice";
import { useDispatch } from "react-redux";

export const ProfileButton = () => {
  //hooks
  const [logout] = useUserLogoutMutation();
  const dispatch=useDispatch()

  //handlers
  const handleLogout = async () => {
    try {
      const {  error } = await logout();
      dispatch(userLogout())
      if (error) {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className=" ">
          <span>
            <UserCircle2 />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="outline-none border-none">
        <DropdownMenuItem>
          <Link to={"/profile"} className=" w-full ">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
