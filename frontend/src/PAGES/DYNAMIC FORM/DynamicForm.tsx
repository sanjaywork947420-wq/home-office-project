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

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import FallingWord from "@/CustomComponents/FORMS/FallingWord";
import styles from "../../CustomComponents/FORMS/LargeForm.module.css";
export default function DynamicForm({ formConstructor, title }) {
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

  const schemaShape = formConstructor.reduce((acc, item) => {
    acc[item.label] = item.schema;
    return acc;
  }, {});

  const formSchema = z.object(schemaShape);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formConstructor.reduce((acc, item) => {
      acc[item.label] = "";
      return acc;
    }, {}),
  });

  function onSubmit(values) {
     console.log("✅ Form submitted with values:", values);
  console.log("📦 Current full form values:", form.getValues());
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
    className={` grid 
    gap-6 
    p-6 
    
    
    rounded-xl 
    sm:grid-cols-1 
    md:grid-cols-2 
    auto-rows-min`}
      >
         <div className="col-span-full mb-4">
    <FallingWord text={title} />
  </div>
        {formConstructor.map((item, index) => {
          if(item.subheading){
            return(
              <h1>{item.subheading}</h1>
            )
          }
          else{
          return (
            <>
              <FormField
                key={index}
                control={form.control}
                name={item.label}
                render={({ field }) => {
                  const meta = item; // Get field definition

                  return (
                    <FormItem  className="w-full">
                      <FormLabel>{meta.label}</FormLabel>
                      <FormControl>
                        <RenderDynamicInput field={field} meta={meta} />
                      </FormControl>
                    
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </>
          );
        }
        })}

         <div className="col-span-full flex justify-end">
    {/* <Button type="submit" className="w-full mt-8">Submit</Button> */}
  </div>
      </form>
    </Form>
  );
}

function RenderDynamicInput({ field, meta }) {
  switch (meta.type) {
    case "text":
    case "email":
    case "password":
    case "date":
      return (
        <Input
          className="bg-white justify-between"
          type={meta.type}
          placeholder={meta.placeholder}
          {...field}
        />
      );

    case "textarea":
      return (
        <Textarea
          className="bg-white"
          placeholder={meta.placeholder}
          {...field}
        />
      );

    case "select":
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="bg-white w-[full] border border-gray-300 text-gray-900 rounded-md [&>svg]:text-black">
            <SelectValue placeholder={`Select ${meta.label}`}  />
          </SelectTrigger>

          <SelectContent className="bg-white text-gray-900 ">
            {meta.selectionsOptions?.map((opt) => (
              <SelectItem
                key={opt}
                value={opt}
                className="hover:bg-gray-100 cursor-pointer"
              >
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    default:
      return <Input placeholder={meta.placeholder} {...field} />;
  }
}
