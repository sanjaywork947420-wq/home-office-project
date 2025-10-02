import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/select";
import FallingWord from "./FallingWord";
import { useNavigate } from "react-router-dom";
import { Value } from "@radix-ui/react-select";

// schema
const formSchema = z.object({
  password1: z.string().min(2).max(50),
//   password2: z.string().min(2).max(50),
  password2:z.string().min(6,"confirm passwrod required")
}).refine((data)=>data.password1===data.password2,{
    message:"password must match",
    path:["password2"],

});

// function component
export default function SetPassword() {
  const naviagate = useNavigate();
  function goback() {
    naviagate("/forgot-password");
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode:"onChange",
    defaultValues: {
      password1: "",
      password2: "",
    },
  });

  function onSubmit(values: any) {

    if(values.password1==values.password2){

        alert(values.password1);
    }
    else{
        alert("error password not same")
    }
    console.log(values)
  }

  const [theme, setTheme] = useState("");

  useEffect(() => {
    console.log("hello aima theme");
  }, []);

  return (
    // form container starts
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`${styles.formContainer} space-y-4 rounded w-[350px]`}
      >
        <FallingWord text="set password" />
        {/* single form items started */}
        <FormField
          control={form.control}
          name="password1"
          render={({ field }) => (
            <FormItem className={`${styles.formItem} text-title`}>
              <FormLabel className={`${styles.formLabel} text-title`}>
                Enter new password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="shadcn"
                  {...field}
                  className={`${styles.formInput}`}
                />
              </FormControl>

              <FormMessage className={`${styles.formMessage}`} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ConfirmPassword"
          render={({ field }) => (
            <FormItem className={`${styles.formItem} text-title`}>
              <FormLabel className={`${styles.formLabel} text-title`}>
               Confirm password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  type="password"
                  {...field}
                  className={`${styles.formInput}`}
                />
              </FormControl>

              <FormMessage className={`${styles.formMessage}`} />
            </FormItem>
          )}
        />

        {/* <Select onValueChange={setSelectedQuestion}> */}
        {/* is same as <Select onValueChange={(value)=>setSelectedQuestion(value)}> */}
        {/* both are smae thigns as teh onvaluechage expects a fucniton whihc can take the vale as paramenter so it work the same its react featuer */}

        <span className={`${styles.footerBtn} flex w-[100%] justify-around `}>
          <Button
            onClick={goback}
            className={`${styles.submitButton} bg-amber-500 cursor-pointer`}
          >
            Go back
          </Button>
          <Button
          disabled={!form.formState.isValid}
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
