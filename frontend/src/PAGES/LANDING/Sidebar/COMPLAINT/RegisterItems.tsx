import { Button } from "@/components/ui/button";
import { useAppContext } from "@/CustomComponents/GLOBAL CONTEXT/GlobalContext";
import DynamicForm from "@/PAGES/DYNAMIC FORM/DynamicForm";
import React from "react";
import z from "zod";
import styles from "../../../../CustomComponents/FORMS/SmallForm.module.css";


export default function RegisterItems({ arr, formdata, prev, next, steps, onSave }) {



  const { universal_schema } = useAppContext();

  const baseFields = [
    {
      label: "Asset Identifier",
      type: "text",
      placeholder: "Enter a unique asset ID or serial number",
      schema: z.string().min(8, "Please enter at least 8 characters"),
      description: "Provide a unique ID for this item (e.g., serial number, asset tag, or barcode).",
    },
    {
      label: "Complaint Description",
      type: "textarea",
      placeholder: "Briefly describe the issue you’re facing...",
      schema: z.string().min(5, "Please provide a detailed complaint description."),
    },
    {
      label: "Department / Section",
      type: "text",
      placeholder: "Enter your department name",
      schema: z.string().min(2, "Enter a valid department name"),
    },
    {
      label: "Office / Location",
      type: "text",
      placeholder: "Enter office or building location",
      schema: z.string().min(2, "Enter a valid office/location"),
    },
    {
      label: "Contact Number / Extension",
      type: "text",
      placeholder: "Enter your phone or extension number",
      schema: z.string().min(3, "Enter a valid contact number"),
    },
  ];

  const complaintForms = {
    pc_not_booting: [
      ...baseFields,
      {
        label: "PC Asset Tag / Serial Number",
        type: "text",
        placeholder: "Enter PC asset tag or serial number",
        schema: z.string().min(3, "Enter a valid serial number"),
      },
    ],
    no_display: [
      ...baseFields,
      {
        label: "Monitor Model",
        type: "text",
        placeholder: "Enter monitor make and model",
        schema: z.string().min(2, "Enter a valid monitor model"),
      },
    ],
    other_hardware: baseFields,
  };

  const title1 = formdata.subcategory || "Complaint Form";

  return (
    <div className="mb-16 bg-white w-[800px] rounded-xl shadow-[0_4px_20px_0_rgba(250,250,246,1)]">
     <DynamicForm
  formConstructor={complaintForms[formdata.subcategory] || baseFields}
  title={title1.replaceAll("_", " ").toUpperCase()}
  next={next}
  prev={prev}
  steps={steps}
  onSave={(values) => {
    console.log("📥 Received in RegisterItems:", values);
    if (onSave) onSave(values); // ✅ Pass values to parent AssetsForm1
  }}
/>



    </div>
  );
}
