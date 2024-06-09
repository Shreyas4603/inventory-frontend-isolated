import { useUserLoginMutation } from "@/Slices/usersApiSlice";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "@/Slices/authSlice";
import { toast } from "sonner";

export const Login = () => {
  //statye variables
  const [isVisible, setvisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  //Hooks
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [login] = useUserLoginMutation();

  //useEffects

  //handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);

    setisLoading(true);
    //api call
    try {
      const {data,error} = await login(form);
      console.log("error",error)//backend
      if(data){
        console.log(data)
        dispatch(setUserCredentials(data?.data?.loggedUser))
        navigate('/dashboard')
      }
      if(error){
        console.log(error.message)
        toast.error(error?.data?.message)
      }
    } catch (error) {
      toast.error("Something went wrong, try again")
      console.log(error)
    }

    //api call
    setisLoading(false);
  };

  return (
    <section className="h-screen  w-full flex items-center justify-center p-3">
      {/* <ModeToggle/> */}
      <span className="absolute top-0"></span>
      <form
        onSubmit={handleSubmit}
        className="bg-background p-6  border border-input rounded-lg max-w-[350px]"
      >
        <div className="grid gap-4">
          <div>
            <p className="text-2xl font-bold">Login</p>
            <p className="text-sm text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className=''>Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <div className="grid gap-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={isVisible ? "text" : "password"}
                required
                name="password"
              />
              <Button
                variant="secondary"
                className="absolute right-0 bottom-0 rounded-l-none "
                type="button"
                size="icon"
                onClick={() => setvisible(!isVisible)}
              >
                {isVisible ? <EyeIcon /> : <EyeOffIcon />}
              </Button>
            </div>
            <span className="text-right">
              <Link
                href={"forgot-password"}
                className="text-sm text-secondary-foreground underline"
              >
                Forgot your password ?
              </Link>
            </span>
          </div>
          <Button type="submit">{isLoading ? <div /> : "Login"}</Button>
        </div>
        <p className="text-sm text-center pt-3">
          Don't have account ?{" "}
          <Link to={"/register"} className="text-primary">
            Sign up
          </Link>
        </p>
      </form>
    </section>
  );
};
