import React, { useEffect, useState } from 'react';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import FallingWord from './FallingWord';



// schema 
const formSchema = z.object({
    username: z.string().min(2).max(50),
});

// function component
export default function SmallForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    });

    function onSubmit(values: any) {
        console.log(values);
       
    }



    const [theme, setTheme] = useState("");
    
    useEffect(()=>{
       
    },[])

    return (
        // form container starts
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={`${styles.formContainer} space-y-4 rounded`}
            >
                <h1 className={`${styles.title} text-title `}>small form</h1>
                <FallingWord text="Login" />
                {/* single form items started */}
                <FormField
                
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className={`${styles.formItem} text-title`}>
                            <FormLabel className={`${styles.formLabel} text-title`}>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="shadcn"
                                    {...field}
                                    className={`${styles.formInput}`}
                                />
                            </FormControl>
                            <FormDescription className={`${styles.formDescription}`}>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage className={`${styles.formMessage}`} />
                        </FormItem>
                    )}
                />


{/* <Select onValueChange={setSelectedQuestion}> */}
{/* is same as <Select onValueChange={(value)=>setSelectedQuestion(value)}> */}
{/* both are smae thigns as teh onvaluechage expects a fucniton whihc can take the vale as paramenter so it work the same its react featuer */}


                <Select onValueChange={(value) => setTheme(value)}  >
                    <SelectTrigger className={`${styles.formItem} text-title`}>
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System 234</SelectItem>
                    </SelectContent>
                </Select>



                
                <span className={`${styles.footerBtn} flex w-[100%] justify-around `}>
          <Button
            
            className={`${styles.submitButton} bg-amber-500 cursor-pointer`}
          >
            Go back
          </Button>
          <Button
            type="submit"
            className={`${styles.submitButton} cursor-pointer`}
          >
            Submit
          </Button>
        </span>
            </form>
        </Form>
    );
}
