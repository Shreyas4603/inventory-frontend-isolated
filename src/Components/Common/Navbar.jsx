import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { ProfileButton } from "../Profile/ProfileButton";
import { ModeToggle } from "../ui/mode-toggle";
import { setOpen } from "../../Slices/sidebarOpenSlice";

export const Navbar = () => {
  //Hooks
  const dispatch = useDispatch();

  return (
    <header className="flex  w-full items-center justify-between px-2 py-3 md:px-4 bg-green-9 00 sticky top-0  bord er-b border-input/60  bg-background border-b border-x-muted">
      <div className="flex  items-center justify-center gap-2">
        <Button
          size="icon"
          variant="outline"
          className="border-none"
          onClick={() => dispatch(setOpen())}
        >
          <Menu />
        </Button>

        <Link to='/'>
          <span className="font-semibold text-2xl font-teachers">ARS Enterprises</span>
        </Link>
      </div>
      <nav className=" items-center gap-2 flex">
        <span>
          <ModeToggle />
        </span>
        <span>
          <ProfileButton />
        </span>
      </nav>
    </header>
  );
};
