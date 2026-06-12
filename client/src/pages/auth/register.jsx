import CommonForm from "@/components/common/form";
import { registerFormControles } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link , useNavigate} from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

function AuthRegister() {
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {toast}=useToast()


  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data)=>{
      if(data?.payload?.success)
      {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      }
      else{
        toast({
          title: data?.payload?.message,
          variant: 'destructive'
        });
      }

    })
  }
  return (
    <div className="mx-auto w-full max-w-md">
      <Card className="border-none shadow-xl">
        <CardHeader className="items-center space-y-3 pb-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Create an account</h1>
            <p className="text-sm text-muted-foreground">Sign up to start shopping with us</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CommonForm
            FormControles={registerFormControles}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            buttonText="Sign Up"
          />
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?
            <Link className="font-medium text-primary ml-1 hover:underline" to="/auth/login">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default AuthRegister;
