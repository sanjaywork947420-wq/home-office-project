import { useAppContext } from "@/CustomComponents/GLOBAL CONTEXT/GlobalContext";
import DynamicForm from "@/PAGES/DYNAMIC FORM/DynamicForm";
import React from "react";
import z from "zod";

export default function Reports() {
  const { universal_schema } = useAppContext();

  let NewAssetsForm =[
    {
      label: "select teh item type",
      type: "select",
      placeholder: "selec the item type  ",
      selectionsOptions: ["hardware","netwrok","misc"],
      get schema() {
        return z.enum(this.selectionsOptions as [string, ...string[]]);
      },
    },

    {
      label: "select the device",
      type: "select",
      placeholder: "select the device ",
      selectionsOptions: ["computer","swtiches","routers","sdf"],
      get schema() {
        return z.enum(this.selectionsOptions as [string, ...string[]]);
      },
    },
  ]

  let title2="new assets"
  let signupFormContent = [
    {
      label: "complaint",
      type: "textarea",
      placeholder: universal_schema.longText.placeholder,
      schema: universal_schema.longText.schema,
    },

    {
      subheading:"about the complaint"
    },

    {
      label: "biod date",
      type: "date",
      placeholder: "enter kars email address",
      schema: universal_schema.email.schema,
    },
    {
      label: "pc type",
      type: "select",
      placeholder: universal_schema.pcType.placeholder,

      selectionsOptions: ["lan", "internet", "inter", "iose"],
      get schema() {
        return z.enum(this.selectionsOptions as [string, ...string[]]);
      },
    },
    {
      label: "select the hardware",
      type: "select",
      placeholder: "selec the hardware eg.: computer mouse ",
      selectionsOptions: ["computer", "mouse", "keybaord"],
      get schema() {
        return z.enum(this.selectionsOptions as [string, ...string[]]);
      },
    },

    {
      label: "serial number",
      type: "text",
      placeholder: "enter the schmea",
      schema: universal_schema.uniqueId.schema,
    },
  ];
  let title1 = "PC details";


  return (
    <div className="report  m-0">
      <DynamicForm formConstructor={signupFormContent} title={title1} />

       <DynamicForm formConstructor={NewAssetsForm} title={title2} />

      {/* <DynamicForm formConstructor={arr2} title={title2}/> */}
    </div>
  );
}
