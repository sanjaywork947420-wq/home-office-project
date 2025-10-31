import FallingWord from "@/CustomComponents/FORMS/FallingWord";
import SmallForm from "@/CustomComponents/FORMS/SmallForm";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

export default function ComplaintForm() {
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
    subcategory: "",

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

  const next = () => setsteps((p) => Math.min(p + 1, 2)); // prevent going beyond 3
  const prev = () => setsteps((p) => Math.max(p - 1, 1)); // prevent going below 1

  const optionsMap = {
    hardware: [
      { value: "pc_not_booting", label: "PC Not Booting" },
      { value: "no_display", label: "No Display / Monitor Issue" },
      { value: "keyboard_mouse", label: "Keyboard / Mouse Issue" },
      { value: "ups_issue", label: "UPS Issue" },
      { value: "slow_performance", label: "PC Slow / Lagging" },
      { value: "power_issue", label: "No Power / System Dead" },
      { value: "other_hardware", label: "Other Hardware Problem" },
    ],

    network: [
      { value: "no_connectivity", label: "No Network Connectivity" },
      { value: "switch_not_working", label: "Switch Not Working" },
      { value: "new_connection", label: "Need New Connection / Port" },
      { value: "lan_cable_fault", label: "LAN Cable Fault" },
      { value: "ip_conflict", label: "IP Conflict / Duplicate IP" },
      { value: "config_change", label: "Configuration Change Needed" },
      { value: "wifi_issue", label: "Wi-Fi / Access Point Issue" },
      { value: "other_network", label: "Other Network Problem" },
    ],

    software: [
      {
        value: "application_missing",
        label: "Application Missing / Not Installed",
      },
      { value: "license_issue", label: "Software License / Activation Issue" },
      { value: "not_opening", label: "Software Not Opening / Crashing" },
      { value: "update_required", label: "Needs Update / Version Change" },
      { value: "os_issue", label: "Windows / Linux OS Issue" },
      {
        value: "new_installation",
        label: "Request for New Software Installation",
      },
      { value: "other_software", label: "Other Software Problem" },
    ],

    printer: [
      { value: "not_printing", label: "Printer Not Printing" },
      { value: "driver_issue", label: "Driver Missing / Incorrect" },
      { value: "paper_jam", label: "Paper Jam / Feed Error" },
      { value: "toner_issue", label: "Toner / Cartridge Problem" },
      {
        value: "network_printer_issue",
        label: "Network Printer Not Reachable",
      },
      { value: "usb_connection", label: "USB Printer Not Detected" },
      { value: "other_printer", label: "Other Printer Problem" },
    ],

    other: [
      { value: "tools", label: "Tools / Equipment" },
      { value: "furniture", label: "Furniture / Fixtures" },
      { value: "general_query", label: "General Query / Miscellaneous" },
    ],
  };

  let arr = [1, 2, "jara"];
  const isFilled = (value: string | undefined) => value && value.trim() !== "";

  return (
    <div className=" flex flex-col items-center justify-center  ">
      <h1 className="mb-6">registration of complaint step: {steps}</h1>

      {steps == 1 && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`${styles.formContainerWithoutAnimation} space-y-4 rounded w-[350px]`}
          >
            <FallingWord text="complaint form" />
            <h2>select the category of the complaint</h2>
            {/* single form items started */}

            <FormLabel>
              Please select the type of problem you’re facing.
            </FormLabel>
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
                className={`
    ${styles.formItem} ${styles.formItem} text-title
    text-title justify-between border rounded-md transition-all duration-200 
    focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400
    ${
      isFilled(form.watch("category"))
        ? "bg-text-placeholder" // Filled look
        : " bg-text-subtitle" // Empty look
    }
  `}
              >
                <SelectValue placeholder="select category" />
              </SelectTrigger>
              <SelectContent className="bg-bg-contrast text-text-placeholder">
                <SelectItem value="hardware">Hardware Issue</SelectItem>
                <SelectItem value="network">Network Issue</SelectItem>
                <SelectItem value="software">Software Issue</SelectItem>
                <SelectItem value="printer">Printer Issue</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select
              disabled={!form.watch("category")}
              onValueChange={(value) =>
                setformdata((p) => ({
                  ...p,
                  subcategory: value,
                }))
              }
            >
              <SelectTrigger
                className={`
      ${
        styles.formItem
      } text-title justify-between border rounded-md transition-all duration-200 
      focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400
      ${
        !form.watch("category")
          ? "bg-red-200 border-gray-300 text-gray-500 cursor-not-allowed" // 🔒 Disabled state
          : isFilled(form.watch("subcategory"))
          ? "bg-text-placeholder" // Filled look
          : " bg-text-placeholder" // Empty look
      }
    `}
              >
                <SelectValue
                  placeholder={
                    form.watch("category") === "software"
                      ? "Select the device installed in "
                      : "Select the device"
                  }
                />
              </SelectTrigger>

              <SelectContent className="bg-bg-contrast text-white">
                {(optionsMap[formdata.type] || []).map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex justify-between items-center w-full col-span-full">
              {/* Back button */}
              <div
                onClick={steps > 1 ? prev : undefined}
                className={`flex items-center gap-1 p-2 rounded transition ${
                  steps === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 cursor-pointer hover:bg-amber-300 hover:text-amber-500"
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back</span>
              </div>

              {/* Next button */}
              <div
                onClick={steps < 3 ? next : undefined}
                className={`flex items-center gap-1 p-2 rounded transition ${
                  steps === 3
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 cursor-pointer hover:bg-amber-300 "
                }`}
              >
                <span className="text-sm font-medium">Next</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>



          </form>
        </Form>
      )}

      {steps == 2 && (
        <RegisterItems arr={arr} formdata={formdata} next={next} steps={steps} prev={prev} />
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
