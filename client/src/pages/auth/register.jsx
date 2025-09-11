import CommonForm from "@/components/common/form";
import { registerFormControles } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link , useNavigate} from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create New Account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium text-primary ml-2 hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        FormControles={registerFormControles}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText="Sign Up"
      />
    </div>
  );
}

export default AuthRegister;
