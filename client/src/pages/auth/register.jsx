import CommonForm from "@/components/common/form";
import { registerFormControles } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";
function AuthRegister(){
    const initialState={
        userName : '',
        email : '',
        password : ''
    }
    const [formData,setFormData]= useState(initialState)
    function onSubmit(){
    }
    return(
        <div className="mx-auto w-full max-w-md space-y-6">
           <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Create New Account</h1>
            <p className="mt-2">Already have an account 
                <Link className="font-medium text-primary ml-2 hover:underline" to='/auth/login'>Login</Link>
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
    )
}

export default AuthRegister;