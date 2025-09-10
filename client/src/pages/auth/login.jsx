import CommonForm from "@/components/common/form";
import { loginFormControles, registerFormControles } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";
function AuthLogin(){
    const initialState={
        email : '',
        password : ''
    }
    const [formData,setFormData]= useState(initialState)
    function onSubmit(){
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