import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import styles from "./SmallForm.module.css";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import FallingWord from './FallingWord';
import { loginUser } from '@/api';

// schema 
const formSchema = z.object({
    personalID: z.string().min(2).max(50),
    password: z.string().min(5).max(14)
});

// function component
export default function LoginForm() {
    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            personalID: "",
            password: ""
        },
    });

    async function onSubmit(values: any,e:React.FormEvent) {
        console.log(e);
        e.preventDefault();
        const {personalID,password}=values;
        console.log(personalID)
        const result=await loginUser(personalID,password);
        alert(result)
        navigate("/landing");
       
    }

    return (
        // form container starts
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={`${styles.formContainer} space-y-4 rounded bg-pink-500 w-[350px]`}
            >
                {/* <h1 className={`${styles.title} text-title `}>login form</h1> */}

                  <FallingWord text="Welcome to crm" />
                  {/* <h2 className='justify-content-start'>login or create a account</h2> */}
                {/* personalID form item */}
                <FormField
                    control={form.control}
                    name="personalID"
                    render={({ field }) => (
                        <FormItem className={`${styles.formItem} text-title`}>
                            <FormLabel className={`${styles.formLabel} text-title`}>Personal ID</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter personal ID"
                                    {...field}
                                    className={`${styles.formInput}`}
                                />
                            </FormControl>
                           
                            <FormMessage className={`${styles.formMessage}`} />
                        </FormItem>
                    )}
                />
                {/* password form item */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className={`${styles.formItem} text-title`}>
                            <FormLabel className={`${styles.formLabel} text-title`}>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter password"
                                    {...field}
                                    className={`${styles.formInput}`}
                                />
                            </FormControl>
                            
                            <FormMessage className={`${styles.formMessage}`} />
                        </FormItem>
                    )}
                />


                
<Link
  to="/forgot-password"
  className="text-sm text-blue-500 w-[80%] hover:underline mr-auto"
>
  Forgot password?
</Link>
              <span className='flex justify-between w-[100%]'>
                  <Button type="submit" className={`${styles.submitButton} cursor-pointer`}>
                    Login
                </Button>
                 <span>
                    <Link to="/signup" className="text-[15px] text-blue-800 font-medium w-[80%] hover:underline mr-auto">New user?</Link> 
                </span>
              </span>

               
            </form>
        </Form>
    );
}
