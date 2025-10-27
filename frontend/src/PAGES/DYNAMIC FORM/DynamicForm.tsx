import { useAppContext } from "@/CustomComponents/GLOBAL CONTEXT/GlobalContext";
import React from "react";
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

export default function DynamicForm({ formConstructor }) {
  const { universal_schema } = useAppContext();

  const labels = formConstructor;
  // // ✅ use dynamic key and dynamic schema
  // const formSchema = z.object({
  //   [label]: universal_schema[label].schema,
  // });

  // const form = useForm({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     [label]: "sanjay",
  //   },
  // });

  // function onSubmit(values) {
  //   console.log("✅ validated values:", values);
  // }


  const schemaShape=formConstructor.reduce((acc,item)=>{
      acc[item.label]=universal_schema[item.label].schema
      return acc;
  },{})

  const formSchema=z.object(schemaShape);

 const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formConstructor.reduce((acc,item)=>{
      acc[item.label]=universal_schema[item.label].label;
      return acc;
    },{})
  })



  function onSubmit(values) {
    console.log(" validated values:", values);
  }



  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col justify-center p-6 bg-amber-200 w-[450px] m-16">
        <h1 className="text-3xl ">{formConstructor[0].title}</h1>
{
  formConstructor.map((item,index)=>{
    return(<>

    <FormField
          control={form.control}
          name={item.label}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{item.labell}</FormLabel>
              <FormControl>
                <Input placeholder={item.label} {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

    </>)
  })
}

        

       
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
