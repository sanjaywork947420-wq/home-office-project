import { Button } from '@/components/ui/button';
import { useAppContext } from '@/CustomComponents/GLOBAL CONTEXT/GlobalContext';
import DynamicForm from '@/PAGES/DYNAMIC FORM/DynamicForm';
import React from 'react'
import z, { object } from 'zod'
import styles from "../../../../CustomComponents/FORMS/SmallForm.module.css";

  
  
  export default function RegisterItems({arr,formdata,prev,next}) {

    const { universal_schema } = useAppContext();


const deviceForms = {
  computer: [
    {
      label: "Serial Number",
      type: "text",
      placeholder: "Enter the serial number",
      schema: z.string().min(3, "Serial number must be at least 3 characters"),
    },
    {
      label: "IP Address",
      type: "text",
      placeholder: "Enter the IP address",
      schema: z
        .string()
        .regex(
    /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/,
    "Invalid IP address format (e.g., 192.168.1.1)"
  )
    },
    {
      label: "MAC Address",
      type: "text",
      placeholder: "Enter the MAC address",
      schema: z
        .string()
        .regex(
          /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
          "Invalid MAC address format"
        ),
    },
    {
      label: "Make and Model",
      type: "text",
      placeholder: "Enter make and model of the system",
      schema: z.string().min(2, "Enter a valid make and model"),
    },
    {
      label: "Type of PC",
      type: "select",
      placeholder: "Select PC type",
      selectionsOptions: ["Internet PC", "Standalone PC", "Intranet PC"],
      get schema() {
        return z.enum(this.selectionsOptions as [string, ...string[]]);
      },
    },
    {
      label: "BIOS Date",
      type: "date",
      placeholder: "Enter BIOS date",
      schema: z.string().date("Invalid date"),
    },
    {
      label: "OS Installed Date",
      type: "date",
      placeholder: "Enter OS installation date",
      schema: z.string().date("Invalid date"),
    },
    {
      label: "Operating System Type",
      type: "select",
      placeholder: "Select OS type",
      selectionsOptions: ["Windows", "Linux", "MacOS", "Other"],
      get schema() {
        return z.enum(this.selectionsOptions as [string, ...string[]]);
      },
    },
    {
      label: "OS Version",
      type: "text",
      placeholder: "Enter OS version (e.g., Windows 11 Pro)",
      schema: z.string().min(2, "Enter a valid OS version"),
    },
    {
      label: "Custodian Name",
      type: "text",
      placeholder: "Enter custodian name",
      schema: z.string().min(2, "Enter a valid name"),
    },
    {
      label: "Custodian ID Number",
      type: "text",
      placeholder: "Enter custodian ID number",
      schema: z.string().min(2, "Enter a valid ID"),
    },
    {
      label: "Hard Disk Serial Number",
      type: "text",
      placeholder: "Enter hard disk serial number",
      schema: z.string().min(3, "Enter a valid serial number"),
    },
    {
      label: "Motherboard Type and Model",
      type: "text",
      placeholder: "Enter motherboard type and model",
      schema: z.string().min(3, "Enter a valid motherboard info"),
    },
    {
      label: "Processor Details",
      type: "text",
      placeholder: "Enter processor model and details",
      schema: z.string().min(3, "Enter valid processor details"),
    },
  ],
  printer:[
     {
      label: "Serial Number",
      type: "text",
      placeholder: "Enter the serial number",
      schema: z.string().min(3, "Serial number must be at least 3 characters"),
    },

      {
      label: "Custodian Name",
      type: "text",
      placeholder: "Enter custodian name",
      schema: z.string().min(2, "Enter a valid name"),
    },
    {
      label: "Custodian ID Number",
      type: "text",
      placeholder: "Enter custodian ID number",
      schema: z.string().min(2, "Enter a valid ID"),
    },
     {
      label: "Make and Model",
      type: "text",
      placeholder: "Enter make and model of the system",
      schema: z.string().min(2, "Enter a valid make and model"),
    },
     {
      label: "Type of PC connected with",
      type: "select",
      placeholder: "Select PC type printer connected to",
      selectionsOptions: ["Internet PC", "Standalone PC", "Intranet PC"],
      get schema() {
        return z.enum(this.selectionsOptions as [string, ...string[]]);
      },
    },

     {
      label: "Type of printer",
      type: "select",
      placeholder: "Select printer type",
      selectionsOptions: ["MFP printer", "Standalone printer", "network printer"],
      get schema() {
        return z.enum(this.selectionsOptions as [string, ...string[]]);
      },
    },
  ]
};


    
    let title1=formdata.deviceType+" detials";
console.log(formdata);

  return (
    <div className='mb-16  bg-[rgb(115,243,40)] w-[800px] rounded-2xl'>
       <DynamicForm  formConstructor={deviceForms[formdata.deviceType] || []} title={title1} />

      <div className="flex justify-around w-full mb-6 ">
         <Button
                onClick={prev}
                className={`${styles.submitButton} w-1/3 bg-amber-500 cursor-pointer`}
              >
                Go back
              </Button>
              <Button
                onClick={next}
                className={`${styles.submitButton} w-1/3 cursor-pointer`}
              >
                next
              </Button>
      </div>
    </div>
  )
}
