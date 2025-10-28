import { createContext, useContext, useState } from "react";
import z, { email } from "zod";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setstate] = useState({
    open: true,
    theme: "light",
    globalfilter: "",
  });

  const updateState = (key, value) => {
    setstate((prev) => ({ ...prev, [key]: value }));
  };

  const universal_schema = {
    username: {
      schema: z
        .string()
        .min(5, "Username must be at least 5 characters")
        .max(50, "max char reached ")
        .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, underscores allowed"),
      label: "Username",
      type: "textArea",
      placeholder: "Enter username",
    },
    longText: {
      schema: z
        .string()
        .min(25, "Username must be at least 25 characters")
        .max(500, "max char reached "),

      label: "long text",
      type: "text",
      placeholder: "Enter text",
    },

     uniqueId: {
   schema: z.string().regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, underscores, and dashes allowed"),
      label: "unique identifier",
      type: "text",
      placeholder: "Enter unique identifier",
    },


     Date: {
      schema:   z.string().min(1, "Install date required"),

      label: "long text",
      type: "date",
      placeholder: "Enter text",
    },

    email: {
      schema: z.string().email("Invalid email address"),
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
    },

    ipAddress: {
      schema: z
        .string()
        .regex(
          /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/,
          "Invalid IP address"
        ),
      label: "IP Address",
      type: "text",
      placeholder: "192.168.1.1",
    },

    macAddress: {
      schema: z
        .string()
        .regex(
          /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
          "Invalid MAC address"
        ),
      label: "MAC Address",
      type: "text",
      placeholder: "00:1B:44:11:3A:B7",
    },

    makeAndModel: {
      schema: z.string().min(1, "Make and model required"),
      label: "Make and Model",
      type: "text",
      placeholder: "Dell Inspiron 15",
    },

    pcType: {
      schema: z.enum(["Desktop", "Laptop", "Server"]),
      label: "Type of PC",
      type: "select",
      options: ["Desktop", "Laptop", "Server"],
    },

    osInstallDate: {
      schema: z.string().min(1, "Install date required"),
      label: "OS Install Date",
      type: "date",
    },

    biosInfo: {
      schema: z.string().min(1, "BIOS info required"),
      label: "BIOS Info",
      type: "text",
      placeholder: "Enter BIOS details",
    },
    textArea: {
      schema: z.string().min(1, "BIOS info required"),
      label: "BIOS Info",
      type: "textarea",
      placeholder: "Enter BIOS details",
    },
    password: {
      schema: z
        .string()
        .min(6, "At least 6 characters")
        .regex(/[A-Z]/, "Must contain one uppercase letter")
        .regex(/[0-9]/, "Must contain one number"),
      label: "Password",
      type: "password",
      placeholder: "Enter password",
    },
  };

  return (
    <AppContext.Provider value={{ state, updateState, universal_schema }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier consumption
export const useAppContext = () => useContext(AppContext);
