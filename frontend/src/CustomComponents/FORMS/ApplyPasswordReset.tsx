import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import styles from "./SmallForm.module.css";
import FallingWord from "./FallingWord";
import { useNavigate } from "react-router-dom";

// schema
const formSchema = z.object({
  personId: z.string().min(2).max(50),
});

// function component
export default function ApplyPasswordReset() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personId: "",
    },
  });

  const navigate=useNavigate();
  function onSubmit(values: any) {
    alert(`Successfully applied for password reset with id ${values.personId}`)
    navigate("/")
  }

  useEffect(() => {}, []);

  return (
    // form container starts
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`${styles.formContainer} space-y-4 rounded w-[350px]`}
      >
        <FallingWord text="Reset password" />

        {/* single form item */}
        <FormField
          control={form.control}
          name="personId"
          render={({ field }) => (
            <FormItem className={`${styles.formItem} text-title`}>
              <FormLabel className={`${styles.formLabel} text-title`}>
                Person ID
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Person ID"
                  {...field}
                  className={`${styles.formInput}`}
                />
              </FormControl>
              <FormMessage className={`${styles.formMessage}`} />
            </FormItem>
          )}
        />

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
            Apply
          </Button>
        </span>
      </form>
    </Form>
  );
}
