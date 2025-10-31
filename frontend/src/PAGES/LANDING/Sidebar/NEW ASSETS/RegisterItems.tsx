import { Button } from "@/components/ui/button";
import { useAppContext } from "@/CustomComponents/GLOBAL CONTEXT/GlobalContext";
import DynamicForm from "@/PAGES/DYNAMIC FORM/DynamicForm";
import React from "react";
import z, { object } from "zod";
import styles from "../../../../CustomComponents/FORMS/SmallForm.module.css";

export default function RegisterItems({ arr, formdata, prev, next }) {
  const { universal_schema } = useAppContext();

  let primeId = {
    label: "Asset Identifier",
    type: "text",
    placeholder: "Enter a unique asset ID or serial number ",
    schema: z
      .string()
      .min(8, "Please enter a valid unique identifier (at least 3 characters)"),
    description:
      "Provide a unique ID for this item (e.g., serial number, asset tag, or barcode).",
  };

  const deviceForms = {
    computer: [
      primeId,
      {
        label: "Serial Number",
        type: "text",
        placeholder: "Enter the serial number",
        schema: z
          .string()
          .min(3, "Serial number must be at least 3 characters"),
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
          ),
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
    printer: [
      primeId,
      {
        label: "Serial Number",
        type: "text",
        placeholder: "Enter the serial number",
        schema: z
          .string()
          .min(3, "Serial number must be at least 3 characters"),
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
        selectionsOptions: [
          "MFP printer",
          "Standalone printer",
          "network printer",
        ],
        get schema() {
          return z.enum(this.selectionsOptions as [string, ...string[]]);
        },
      },
    ],
    ups: [
      primeId,
      {
        label: "Serial Number",
        type: "text",
        placeholder: "Enter the serial number",
        schema: z
          .string()
          .min(3, "Serial number must be at least 3 characters"),
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
        label: "name of the pc connected with",
        type: "text",
        placeholder: "Enter make and model of the system",
        schema: z.string().min(2, "Enter a valid make and model"),
      },
      {
        label: "Capacity (VA/W)",
        type: "select",
        placeholder: "Select the capacity of the UPS",
        selectionsOptions: [
          "600VA / 360W",
          "1000VA / 600W",
          "1500VA / 900W",
          "2000VA / 1200W",
        ],
        get schema() {
          return z.enum(this.selectionsOptions as [string, ...string[]]);
        },
      },
    ],

    servers: [
      primeId,
      {
        label: "Serial Number",
        type: "text",
        placeholder: "Enter the serial number",
        schema: z
          .string()
          .min(3, "Serial number must be at least 3 characters"),
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
          ),
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
        placeholder: "Enter make and model of the server",
        schema: z.string().min(2, "Enter a valid make and model"),
      },
      {
        label: "Server Role",
        type: "select",
        placeholder: "Select the server's role",
        selectionsOptions: [
          "Application Server",
          "Database Server",
          "File Server",
          "Domain Controller",
          "Mail Server",
          "gernal user Server",
        ],
        get schema() {
          return z.enum(this.selectionsOptions as [string, ...string[]]);
        },
      },
      {
        label: "BIOS Date",
        type: "date",
        placeholder: "Select BIOS date",
        schema: z.string().min(1, "Please select a BIOS date"),
      },
      {
        label: "OS Installed Date",
        type: "date",
        placeholder: "Select OS installation date",
        schema: z.string().min(1, "Please select OS installation date"),
      },
      {
        label: "Operating System Type",
        type: "text",
        placeholder: "Enter OS type (e.g., Windows Server, Linux)",
        schema: z.string().min(3, "Enter a valid OS type"),
      },
      {
        label: "OS Version",
        type: "text",
        placeholder: "Enter OS version (e.g., Windows Server 2022)",
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
        label: "Processor Details",
        type: "text",
        placeholder: "Enter processor model and details",
        schema: z.string().min(3, "Enter valid processor details"),
      },
      {
        label: "RAM Capacity",
        type: "text",
        placeholder: "Enter RAM size (e.g., 32GB DDR4)",
        schema: z.string().min(2, "Enter valid RAM capacity"),
      },
      {
        label: "Storage Capacity",
        type: "text",
        placeholder: "Enter total storage capacity (e.g., 2TB SSD)",
        schema: z.string().min(2, "Enter valid storage capacity"),
      },
      {
        label: "Rack Location / Unit Number",
        type: "text",
        placeholder: "Enter physical rack location",
        schema: z.string().min(2, "Enter a valid location"),
      },
    ],
    switches: [
      primeId,
      {
        label: "Serial Number",
        type: "text",
        placeholder: "Enter the serial number",
        schema: z
          .string()
          .min(3, "Serial number must be at least 3 characters"),
      },
      {
        label: "Make and Model",
        type: "text",
        placeholder: "Enter make and model of the switch",
        schema: z.string().min(2, "Enter a valid make and model"),
      },
      {
        label: "IP Address",
        type: "text",
        placeholder: "Enter the switch IP address",
        schema: z
          .string()
          .regex(
            /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/,
            "Invalid IP address format (e.g., 192.168.1.1)"
          ),
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
        label: "Number of Ports",
        type: "text",
        placeholder: "Enter number of ports (e.g., 24, 48)",
        schema: z.string().regex(/^\d+$/, "Enter a valid number of ports"),
      },
      {
        label: "Switch Type",
        type: "select",
        placeholder: "Select switch type",
        selectionsOptions: ["Managed", "Unmanaged", "PoE", "Smart"],
        get schema() {
          return z.enum(this.selectionsOptions as [string, ...string[]]);
        },
      },
      {
        label: "Department / Location",
        type: "text",
        placeholder: "Enter department or location",
        schema: z.string().min(2, "Enter a valid department or location"),
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
        label: "Date of Installation",
        type: "date",
        placeholder: "Select installation date",
        schema: z.string().min(1, "Please select installation date"),
      },
    ],

    misc_Devices: [
      primeId,

      {
        label: "Serial Number / Tag ID",
        type: "text",
        placeholder: "Enter the serial number or asset tag",
        schema: z.string().min(3, "Enter a valid serial or tag ID"),
      },
      {
        label: "Device Name / Description",
        type: "text",
        placeholder: "Enter device name or brief description",
        schema: z.string().min(3, "Enter a valid description"),
      },
      {
        label: "Make and Model",
        type: "text",
        placeholder: "Enter make and model of the device",
        schema: z.string().min(2, "Enter a valid make and model"),
      },
      {
        label: "Department / Location",
        type: "text",
        placeholder: "Enter department or physical location",
        schema: z.string().min(2, "Enter a valid department or location"),
      },
      {
        label: "Purchase Date",
        type: "date",
        placeholder: "Select purchase date",
        schema: z.string().min(1, "Please select a purchase date"),
      },
      {
        label: "Warranty Expiry Date",
        type: "date",
        placeholder: "Select warranty expiry date",
        schema: z.string().min(1, "Please select warranty expiry date"),
      },
      {
        label: "Condition",
        type: "select",
        placeholder: "Select device condition",
        selectionsOptions: ["New", "Good", "Needs Repair", "Decommissioned"],
        get schema() {
          return z.enum(this.selectionsOptions as [string, ...string[]]);
        },
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
        label: "Remarks / Notes",
        type: "textarea",
        placeholder: "Enter any additional notes about the device",
        schema: z.string().optional(),
      },
    ],
  };

  let title1 = formdata.deviceType + " Details";
  console.log(formdata);

  return (
    <div className="mb-16  bg-white w-[800px] rounded-xl shadow-[0_4px_20px_0_rgba(250,250,246,1)]  ">
      <DynamicForm
        formConstructor={deviceForms[formdata.deviceType] || []}
        title={title1}
        next={next} prev={prev}
      />

      {/* <div className="flex justify-around w-full mb-6 ">
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
      </div> */}
    </div>
  );
}
