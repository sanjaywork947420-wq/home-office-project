import FallingWord from "@/CustomComponents/FORMS/FallingWord";
import SmallForm from "@/CustomComponents/FORMS/SmallForm";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import z from "zod";
import styles from "../../../../CustomComponents/FORMS/SmallForm.module.css";
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

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import RegisterItems from "./RegisterItems";

// schema
const formSchema = z.object({
  username: z.string().min(2).max(50),
  category: z.string().min(2).max(50),
});

export default function AssetsForm1() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      category: "",
    },
  });

  function onSubmit(values: any) {
    console.log(values);
  }
  const [formdata, setformdata] = useState({
    type: "hardware",

    Details: {
      hardwareDetails: {
        computerDetails: {
          serialNum: "",
          ipAddress: "",
        },
      },
    },
  });

  const [theme, setTheme] = useState("");

  useEffect(() => {}, []);

  let [steps, setsteps] = useState(1);

  const next = () => setsteps((p) => p + 1);
  const prev = () => setsteps((p) => p - 1);

  const optionsMap = {
    hardware: [
      { value: "computer", label: "Computer" },
      { value: "printer", label: "Printer" },
      { value: "ups", label: "UPS" },
      { value: "servers", label: "Servers" },
    ],
    network: [
      { value: "switches", label: "Switches" },
      { value: "camera", label: "Cameras" },
      { value: "projector", label: "Projectors" },
    ],
    misc: [
      { value: "tools", label: "Tools" },
      { value: "furniture", label: "Furniture" },
    ],
  };

  let arr=[1,2,"jara"]

  return (
    <div className="bg-red-200 flex flex-col items-center justify-center h-[80%] overflow-hidden">
      <h1 className="mb-6">registration of assest steps {steps}</h1>

      {steps == 1 && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`${styles.formContainerWithoutAnimation} space-y-4 rounded w-[350px]`}
          >
            <FallingWord text="new assets" />
            <h2>select the category of the item</h2>
            {/* single form items started */}

            <Select
              onValueChange={(value) => {
                form.setValue("category", value);
                setformdata((p) => ({
                  ...p,
                  type: value,
                }));
              }}
            >
              <SelectTrigger
                className={`${styles.formItem} text-title bg-cyan-200`}
              >
                <SelectValue placeholder="Item type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hardware">hardware</SelectItem>
                <SelectItem value="network">network</SelectItem>
                <SelectItem value="misc">misc</SelectItem>
              </SelectContent>
            </Select>

           

            <Select
              disabled={!form.watch("category")}
              onValueChange={(value) =>
                setformdata((p) => ({
                  ...p,
                  deviceType: value,
                }))
              }
            >
              <SelectTrigger
                className={`${styles.formItem} text-title bg-cyan-200`}
              >
                <SelectValue placeholder="select the device" />
              </SelectTrigger>

              {/* ✅ Always one SelectContent */}
              <SelectContent>
                {(optionsMap[formdata.type] || []).map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <span
              className={`${styles.footerBtn} mt-6 flex w-[100%] justify-around `}
            >
              <Button
                onClick={prev}
                className={`${styles.submitButton} bg-amber-500 cursor-pointer`}
              >
                Go back
              </Button>
              <Button
                onClick={next}
                className={`${styles.submitButton} cursor-pointer`}
              >
                next
              </Button>
            </span>
          </form>
        </Form>
      )}

      {steps == 2 && (
       <RegisterItems arr={arr}/>
      )}

      {steps == 3 && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`${styles.formContainerWithoutAnimation} space-y-4 rounded w-[350px]`}
          >
            <FallingWord text="new assets" />
            <h2>select the category of the item</h2>
            {/* single form items started */}

            <Select
              onValueChange={(value) =>
                setformdata((p) => ({
                  ...p,
                  type: value,
                }))
              }
            >
              <SelectTrigger
                className={`${styles.formItem} text-title bg-cyan-200`}
              >
                <SelectValue placeholder="Item type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hardware">hardware</SelectItem>
                <SelectItem value="network">network</SelectItem>
                <SelectItem value="misc">misc</SelectItem>
              </SelectContent>
            </Select>

            {/* <Select onValueChange={setSelectedQuestion}> */}
            {/* is same as <Select onValueChange={(value)=>setSelectedQuestion(value)}> */}
            {/* both are smae thigns as teh onvaluechage expects a fucniton whihc can take the vale as paramenter so it work the same its react featuer */}

            <span
              className={`${styles.footerBtn} mt-6 flex w-[100%] justify-around `}
            >
              <Button
                onClick={prev}
                className={`${styles.submitButton} bg-amber-500 cursor-pointer`}
              >
                Go back
              </Button>
              <Button
                onClick={next}
                className={`${styles.submitButton} cursor-pointer`}
              >
                next
              </Button>
            </span>
          </form>
        </Form>
      )}
    </div>
  );
}
