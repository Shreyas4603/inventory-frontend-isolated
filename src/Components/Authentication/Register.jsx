
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useUserRegisterMutation } from "@/Slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "@/Slices/authSlice";


export const Register = () => {
  // State variables
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConf, setIsVisibleConf] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  const [register]=useUserRegisterMutation()
  const navigate = useNavigate()
  const dispatch=useDispatch()

  // Handlers
  const handleSubmit =async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    console.log(form);

    setIsLoading(true);
    if (form.password == form.confirmPassword) {
      try {
        const {data,error} = await register({
          username:form.name,
          email:form.email,
          password:form.password,
          gender:form.gender,
          empId:form.empId,
        });
        if(data){
          console.log(data)
          dispatch(setUserCredentials(data?.data))
          navigate("/dashboard")
        }
        else if(error){
          console.log(error)
          toast.error(error?.data?.message)
        }
      } catch (error) {
        toast.error("Something went wrong, try again")
        console.log(error)
      }

      // API call //remove confirm password
      // API call
    }
    
    else{
      toast.error("Passwords mismatch", {
        description: 'Make sure password and confirm password match.',
      })
      setIsLoading(false);
    }

    // router.push('/dashboard') //after successful signup, redirect
  };

  return (
    <section className="h-screen w-full flex  items-center p-4 justify-center overflow-y-auto  ">
      <form
        onSubmit={handleSubmit}
        className="bg-background p-6 border border-input rounded-xl  md:w-3/4 lg:w-1/2 2xl:w-1/3"
      >
        {" "}
        <div className="pb-4">
          <p className="text-2xl font-bold">Sign Up</p>
          <p className="text-sm text-muted-foreground">
            Create your account by filling out the form below
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              required
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              // required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              required
              id="email"
              type="email"
              name="email"
              placeholder="name@example.com"
              // required
            />
          </div>
          <div className="grid gap-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              required
              id="password"
              type={isVisible ? "text" : "password"}
              // required
              name="password"
              placeholder="*******"
            />
            <Button
              variant="secondary"
              className="absolute right-0 bottom-0 rounded-l-none"
              type="button"
              size="icon"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
          </div>

          <div className="grid gap-2 relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              required
              id="confirmPassword"
              type={isVisibleConf ? "text" : "password"}
              // required
              name="confirmPassword"
              placeholder="*******"
            />
            <Button
              variant="secondary"
              className="absolute right-0 bottom-0 rounded-l-none"
              type="button"
              size="icon"
              onClick={() => setIsVisibleConf(!isVisibleConf)}
            >
              {isVisibleConf ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="gender">Gender</Label>
            <Select name="gender" defaultValue="male">
              <SelectTrigger className="">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="empId">Employee ID</Label>
            <Input
              required
              id="empId"
              type="text"
              name="empId"
              placeholder="Employee ID"
              // required
            />
          </div>
          <Button type="submit" className="col-span-2">
            {isLoading ? <div /> : "Sign Up"}
          </Button>
        </div>
        <p className="text-sm text-center pt-3">
          Already have an account?{" "}
          <Link to={"/login"} className="text-primary">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};
