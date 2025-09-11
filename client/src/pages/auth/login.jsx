import CommonForm from "@/components/common/form";
import { loginFormControles, registerFormControles } from "@/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link , useNavigate} from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";


function AuthLogin(){
    const initialState={
        email : '',
        password : ''
    }
    const [formData,setFormData]= useState(initialState);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {toast}=useToast()
    function onSubmit(event){
        event.preventDefault();
        dispatch(loginUser(formData)).then((data)=>{
            console.log(data)
            if(data?.payload?.success)
            {
                toast({
                title: data?.payload?.message,
            });
            }
            else{
                toast({
                  title: data?.payload?.message,
                  variant: 'destructive'
            });
        }      
    })
    }
    return(
        <div className="mx-auto w-full max-w-md space-y-6">
           <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign In</h1>
            <p className="mt-2">Don't have an Account
                <Link className="font-medium text-primary ml-2 hover:underline" to='/auth/register'>Register</Link>
            </p>
           </div>
           <CommonForm
            FormControles={loginFormControles}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            buttonText="Sign In"
            />
        </div>
    )
}

export default AuthLogin;