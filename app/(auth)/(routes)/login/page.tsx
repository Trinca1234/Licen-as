import LoginForm from "@/components/form/loginForm";
import { Toaster } from "@/components/ui/toaster";

const LoginPage = () => {
    return ( 
        <div className="">
            <Toaster />
            <LoginForm/>
        </div> 
     ); 
} 
 
export default LoginPage;