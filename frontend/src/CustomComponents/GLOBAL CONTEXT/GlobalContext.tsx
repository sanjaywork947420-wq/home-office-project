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
        .min(3, "username must be more than 3 char")
        .max(50)
        .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, underscores allowed"),

      label: "username is the label for this ",
      type: "text",
      placeholder: "enter the username",
    },

     email: {
    schema: z.string().email("Invalid email"),
    label: "Email this is for theemalil schema",
    type: "email",
    placeholder: "you@example.com",
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
  }
  } ;

  return (
    <AppContext.Provider value={{ state, updateState,universal_schema }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier consumption
export const useAppContext = () => useContext(AppContext);
