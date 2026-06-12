import CommonForm from "@/components/common/form";
import { loginFormControles } from "@/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link , useNavigate} from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LogIn } from "lucide-react";


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
        <div className="mx-auto w-full max-w-md">
           <Card className="border-none shadow-xl">
            <CardHeader className="items-center space-y-3 pb-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <LogIn className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
                    <p className="text-sm text-muted-foreground">Sign in to continue to your account</p>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <CommonForm
                    FormControles={loginFormControles}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={onSubmit}
                    buttonText="Sign In"
                />
                <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?
                    <Link className="font-medium text-primary ml-1 hover:underline" to='/auth/register'>Register</Link>
                </p>
            </CardContent>
           </Card>
        </div>
    )
}

export default AuthLogin;
