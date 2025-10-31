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

export default function AssetsForm1() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", category: "" },
  });

  const [formdata, setformdata] = useState({
    type: "hardware",
    deviceType: "",
    details: {
      hardwareDetails: { computerDetails: { serialNum: "", ipAddress: "" } },
    },
  });

  const [steps, setsteps] = useState(1);
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
      { value: "misc_Devices", label: "Misc Devices 1234" },
    ],
    misc: [
      { value: "tools", label: "Tools" },
      { value: "furniture", label: "Furniture" },
    ],
  };

  const isFilled = (v?: string) => v && v.trim() !== "";

  // ✅ Single persistent submit handler
  async function onSubmit(values: any) {
    try {
      const payload = {
        type: formdata.type,
        deviceType: formdata.deviceType,
        details: formdata.details,
      };

      console.log("📦 Sending payload:", payload);

      const response = await fetch("http://localhost:3000/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("📥 Server response:", data);

      if (data.success) {
        alert("✅ Asset registered successfully!");
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Asset Submission Error:", err);
      alert("Server or network error while saving asset.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-cente">
      <h1 className="mb-6">Registration of asset — Step {steps}</h1>

      {/* ✅ keep form mounted always */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className={`${styles.formContainerWithoutAnimation} bg-white space-y-4 rounded w-[350px]`}
        >
          {steps === 1 && (
            <>
              <FallingWord text="new assets" />
              <h2>Select the category of the item</h2>

              {/* Type select */}
              <Select
                onValueChange={(value) => {
                  form.setValue("category", value);
                  setformdata((p) => ({ ...p, type: value }));
                }}
              >
                <SelectTrigger
                  className={`${styles.formItem} text-title justify-between border rounded-md transition-all duration-200 focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 ${
                    isFilled(form.watch("category"))
                      ? "bg-text-placeholder"
                      : "bg-text-subtitle"
                  }`}
                >
                  <SelectValue placeholder="Item type" />
                </SelectTrigger>
                <SelectContent className="bg-bg-contrast text-text-placeholder">
                  <SelectItem value="hardware">hardware</SelectItem>
                  <SelectItem value="network">network</SelectItem>
                  <SelectItem value="misc">misc</SelectItem>
                </SelectContent>
              </Select>

              {/* Device select */}
              <Select
                disabled={!form.watch("category")}
                onValueChange={(value) =>
                  setformdata((p) => ({ ...p, deviceType: value }))
                }
              >
                <SelectTrigger
                  className={`${styles.formItem} text-title justify-between border rounded-md transition-all duration-200 focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 ${
                    !form.watch("category")
                      ? "bg-red-200 border-gray-300 text-gray-500 cursor-not-allowed"
                      : isFilled(form.watch("deviceType"))
                      ? "bg-text-placeholder"
                      : "bg-text-placeholder"
                  }`}
                >
                  <SelectValue placeholder="Select the device" />
                </SelectTrigger>
                <SelectContent className="bg-bg-contrast text-white">
                  {(optionsMap[formdata.type] || []).map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}

         {steps === 2 && (
  <RegisterItems
  arr={[1, 2, "jara"]}
  formdata={formdata}
  next={next}
  prev={prev}
  steps={steps}
  onSave={(values) => {
    console.log("📤 Data reached AssetsForm1:", values);
    setformdata((prev) => ({ ...prev, details: values }));
  }}
/>

)}


          {steps === 3 && (
            <>
              <FallingWord text="Review & Submit" />
              <p>Ready to register your asset?</p>
              <Button type="submit" className="w-full bg-green-600 text-white">
                Submit Asset
              </Button>
            </>
          )}

          {/* navigation controls */}
          <div className="flex justify-between items-center w-full mt-4">
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

            <div
              onClick={steps < 3 ? next : undefined}
              className={`flex items-center gap-1 p-2 rounded transition ${
                steps === 3
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 cursor-pointer hover:bg-amber-300"
              }`}
            >
              <span className="text-sm font-medium">Next</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
