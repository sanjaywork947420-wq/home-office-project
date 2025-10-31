// import { useAppContext } from "@/CustomComponents/GLOBAL CONTEXT/GlobalContext";
// import React from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import FallingWord from "@/CustomComponents/FORMS/FallingWord";
// import styles from "../../CustomComponents/FORMS/LargeForm.module.css";
// export default function DynamicForm({
//   formConstructor,
//   title,
//   next = "",
//   prev = "",
//   steps = "",
// }) {
//   const { universal_schema } = useAppContext();

//   const labels = formConstructor;
//   // // ✅ use dynamic key and dynamic schema
//   // const formSchema = z.object({
//   //   [label]: universal_schema[label].schema,
//   // });

//   // const form = useForm({
//   //   resolver: zodResolver(formSchema),
//   //   defaultValues: {
//   //     [label]: "sanjay",
//   //   },
//   // });

//   // function onSubmit(values) {
//   //   console.log("✅ validated values:", values);
//   // }

//   const schemaShape = formConstructor.reduce((acc, item) => {
//     acc[item.label] = item.schema;
//     return acc;
//   }, {});

//   const formSchema = z.object(schemaShape);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: formConstructor.reduce((acc, item) => {
//       acc[item.label] = "";
//       return acc;
//     }, {}),
//   });

//   function onSubmit(values) {
//     console.log("✅ Form submitted with values:", values);
//     console.log("📦 Current full form values:", form.getValues());
//     console.log(values.CustodianName);
//     alert(`Form successfully submitted for ${values["Custodian Name"]}.`);

//     next();
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className={` grid 
//     gap-6 
//     p-6 
    
    
//     rounded-xl 
//     sm:grid-cols-1 
//     md:grid-cols-2 
//     auto-rows-min`}
//       >
//         <div className="col-span-full mb-4">
//           <FallingWord text={title} />
//         </div>
//         {formConstructor.map((item, index) => {
//           if (item.subheading) {
//             return <h1>{item.subheading}</h1>;
//           } else {
//             return (
//               <>
//                 <FormField
//                   key={index}
//                   control={form.control}
//                   name={item.label}
//                   render={({ field }) => {
//                     const meta = item; // Get field definition

//                     return (
//                       <FormItem className="w-full ">
//                         <FormLabel>{meta.label}</FormLabel>
//                         <FormControl>
//                           <RenderDynamicInput field={field} meta={meta} />
//                         </FormControl>
//                         {/* {meta.description && (
//     <FormDescription className="text-sm text-gray-600">
//       {meta.description}
//     </FormDescription>
//   )} */}
//                         <FormMessage />
//                       </FormItem>
//                     );
//                   }}
//                 />
//               </>
//             );
//           }
//         })}

//         <div className="flex justify-between items-center w-full col-span-full">
//           {/* Back button */}
//           <div
//             onClick={steps > 1 ? prev : undefined}
//             className={`flex items-center gap-1 p-2 rounded transition ${
//               steps === 1
//                 ? "text-gray-400 cursor-not-allowed"
//                 : "text-gray-700 cursor-pointer hover:bg-amber-300 "
//             }`}
//           >
//             <ArrowLeft className="w-5 h-5" />
//             <span className="text-sm font-medium">Back</span>
//           </div>

//           {/* Next button */}
//           <div
//             onClick={steps < 2 ? next : undefined}
//             className={`flex items-center gap-1 p-2 rounded transition ${
//               steps === 2
//                 ? "text-gray-400 cursor-not-allowed"
//                 : "text-gray-700 cursor-pointer hover:bg-amber-300 "
//             }`}
//           >
//             <span className="text-sm font-medium">Next</span>
//             <ArrowRight className="w-5 h-5" />
//           </div>
//         </div>

//         <div className="col-span-full flex justify-end">
//           <Button type="submit" className="w-full ">
//             Submit
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// function RenderDynamicInput({ field, meta }) {
//   switch (meta.type) {
//     case "text":
//     case "email":
//     case "password":
//     case "date":
//       const isFilled = field.value && field.value.trim() !== "";
//       return (
//         <Input
//           className={`justify-between border rounded-md transition-all duration-200 
//     focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400
//     ${
//       isFilled
//         ? "bg-emerald-50 border-emerald-300"
//         : "bg-slate-100 border-slate-300"
//     }`}
//           type={meta.type}
//           placeholder={meta.placeholder}
//           {...field}
//         />
//       );

//     case "textarea":
//       return (
//         <Textarea
//           className="bg-white"
//           placeholder={meta.placeholder}
//           {...field}
//         />
//       );

//     case "select":
//       return (
//         <Select onValueChange={field.onChange} defaultValue={field.value}>
//           <SelectTrigger className="bg-white w-[full] border border-gray-300 text-gray-900 rounded-md [&>svg]:text-black">
//             <SelectValue placeholder={`Select ${meta.label}`} />
//           </SelectTrigger>

//           <SelectContent className="bg-white text-gray-900 ">
//             {meta.selectionsOptions?.map((opt) => (
//               <SelectItem
//                 key={opt}
//                 value={opt}
//                 className="hover:bg-gray-100 cursor-pointer"
//               >
//                 {opt}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       );
//     default:
//       return <Input placeholder={meta.placeholder} {...field} />;
//   }
// }



























// import { useAppContext } from "@/CustomComponents/GLOBAL CONTEXT/GlobalContext";
// import React from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import FallingWord from "@/CustomComponents/FORMS/FallingWord";
// import styles from "../../CustomComponents/FORMS/LargeForm.module.css";

// export default function DynamicForm({
//   formConstructor,
//   title,
//   next = "",
//   prev = "",
//   steps = "",
//   onSave,
// }) {
//   const { universal_schema } = useAppContext();

//   // ✅ Build schema dynamically based on formConstructor
//   const schemaShape = formConstructor.reduce((acc, item) => {
//     acc[item.label] = item.schema;
//     return acc;
//   }, {});

//   const formSchema = z.object(schemaShape);

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: formConstructor.reduce((acc, item) => {
//       acc[item.label] = "";
//       return acc;
//     }, {}),
//   });

//   // ✅ Handle form submission
//   function onSubmit(values) {
//     console.log("✅ Form submitted with values:", values);

//     if (onSave) onSave(values); // Pass values up to parent

//     next && typeof next === "function" && next(); // move to next step if exists
//   }

//   return (
//     <Form {...form}>
//       {/* ⚡ We use a <div>, not <form>, to allow nesting inside another form safely */}
//       <div
//         className="grid gap-6 p-6 rounded-xl sm:grid-cols-1 md:grid-cols-2 auto-rows-min"
//       >
//         <div className="col-span-full mb-4">
//           <FallingWord text={title} />
//         </div>

//         {/* Dynamically render inputs */}
//         {formConstructor.map((item, index) => {
//           if (item.subheading) {
//             return (
//               <h1 key={`subheading-${index}`} className="col-span-full text-lg font-semibold">
//                 {item.subheading}
//               </h1>
//             );
//           }

//           return (
//             <FormField
//               key={`field-${index}`}
//               control={form.control}
//               name={item.label}
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormLabel>{item.label}</FormLabel>
//                   <FormControl>
//                     <RenderDynamicInput field={field} meta={item} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           );
//         })}

//         {/* Navigation Buttons */}
//         <div className="flex justify-between items-center w-full col-span-full mt-2">
//           <div
//             onClick={steps > 1 ? prev : undefined}
//             className={`flex items-center gap-1 p-2 rounded transition ${
//               steps === 1
//                 ? "text-gray-400 cursor-not-allowed"
//                 : "text-gray-700 cursor-pointer hover:bg-amber-300 "
//             }`}
//           >
//             <ArrowLeft className="w-5 h-5" />
//             <span className="text-sm font-medium">Back</span>
//           </div>

//           <div
//             onClick={steps < 2 ? next : undefined}
//             className={`flex items-center gap-1 p-2 rounded transition ${
//               steps === 2
//                 ? "text-gray-400 cursor-not-allowed"
//                 : "text-gray-700 cursor-pointer hover:bg-amber-300 "
//             }`}
//           >
//             <span className="text-sm font-medium">Next</span>
//             <ArrowRight className="w-5 h-5" />
//           </div>
//         </div>

//         {/* ✅ Submit button — triggers react-hook-form submit manually */}
//         <div className="col-span-full flex justify-end">
//           <Button
//             type="button"
//             className="w-full"
//             onClick={() => form.handleSubmit(onSubmit)()}
//           >
//             Submit
//           </Button>
//         </div>
//       </div>
//     </Form>
//   );
// }

// // ✅ Helper for rendering each input field dynamically
// function RenderDynamicInput({ field, meta }) {
//   switch (meta.type) {
//     case "text":
//     case "email":
//     case "password":
//     case "date": {
//       const isFilled = field.value && field.value.trim() !== "";
//       return (
//         <Input
//           className={`justify-between border rounded-md transition-all duration-200 
//             focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400
//             ${
//               isFilled
//                 ? "bg-emerald-50 border-emerald-300"
//                 : "bg-slate-100 border-slate-300"
//             }`}
//           type={meta.type}
//           placeholder={meta.placeholder}
//           {...field}
//         />
//       );
//     }

//     case "textarea":
//       return (
//         <Textarea
//           className="bg-white"
//           placeholder={meta.placeholder}
//           {...field}
//         />
//       );

//     case "select":
//       return (
//         <Select onValueChange={field.onChange} defaultValue={field.value}>
//           <SelectTrigger className="bg-white w-full border border-gray-300 text-gray-900 rounded-md [&>svg]:text-black">
//             <SelectValue placeholder={`Select ${meta.label}`} />
//           </SelectTrigger>
//           <SelectContent className="bg-white text-gray-900">
//             {meta.selectionsOptions?.map((opt) => (
//               <SelectItem
//                 key={opt}
//                 value={opt}
//                 className="hover:bg-gray-100 cursor-pointer"
//               >
//                 {opt}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       );

//     default:
//       return (
//         <Input
//           placeholder={meta.placeholder}
//           {...field}
//           className="bg-white"
//         />
//       );
//   }
// }





// export default function DynamicForm({
//   formConstructor,
//   title,
//   next = "",
//   prev = "",
//   steps = "",
//   onSave,
// }) {
//   const schemaShape = formConstructor.reduce((acc, item) => {
//     acc[item.label] = item.schema;
//     return acc;
//   }, {});
//   const formSchema = z.object(schemaShape);

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: formConstructor.reduce((acc, item) => {
//       acc[item.label] = "";
//       return acc;
//     }, {}),
//   });

//   // ✅ Watch and update parent live
//   React.useEffect(() => {
//     const subscription = form.watch((values) => {
//       if (onSave) onSave(values);
//     });
//     return () => subscription.unsubscribe();
//   }, [form, onSave]);

//   function onSubmit(values) {
//   console.log("✅ Submitted values from DynamicForm:", values);
//   if (onSave) {
//     console.log("📤 Sending to parent via onSave...");
//     onSave(values);
//   } else {
//     console.log("❌ No onSave handler passed to DynamicForm!");
//   }
//   next();
// }


//   return (
//     <Form {...form}>
//       <div className="grid gap-6 p-6 rounded-xl sm:grid-cols-1 md:grid-cols-2 auto-rows-min">
//         <div className="col-span-full mb-4">
//           <FallingWord text={title} />
//         </div>

//         {formConstructor.map((item, index) => (
//           <FormField
//             key={index}
//             control={form.control}
//             name={item.label}
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormLabel>{item.label}</FormLabel>
//                 <FormControl>
//                   <RenderDynamicInput field={field} meta={item} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         ))}

//         <div className="flex justify-between items-center w-full col-span-full mt-2">
//           <div
//             onClick={steps > 1 ? prev : undefined}
//             className={`flex items-center gap-1 p-2 rounded transition ${
//               steps === 1
//                 ? "text-gray-400 cursor-not-allowed"
//                 : "text-gray-700 cursor-pointer hover:bg-amber-300 "
//             }`}
//           >
//             <ArrowLeft className="w-5 h-5" />
//             <span className="text-sm font-medium">Back</span>
//           </div>

//           <div
//             onClick={steps < 2 ? next : undefined}
//             className={`flex items-center gap-1 p-2 rounded transition ${
//               steps === 2
//                 ? "text-gray-400 cursor-not-allowed"
//                 : "text-gray-700 cursor-pointer hover:bg-amber-300 "
//             }`}
//           >
//             <span className="text-sm font-medium">Next</span>
//             <ArrowRight className="w-5 h-5" />
//           </div>
//         </div>

//         <div className="col-span-full flex justify-end">
//           <Button
//             type="button"
//             className="w-full"
//             onClick={() => form.handleSubmit(onSubmit)()}
//           >
//             Submit
//           </Button>
//         </div>
//       </div>
//     </Form>
//   );
// }

// function RenderDynamicInput({ field, meta }) {
//   switch (meta.type) {
//     case "text":
//     case "email":
//     case "password":
//     case "date":
//       return (
//         <Input
//           {...field}
//           type={meta.type}
//           placeholder={meta.placeholder}
//           className="border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400"
//         />
//       );
//     case "textarea":
//       return <Textarea {...field} placeholder={meta.placeholder} className="bg-white" />;
//     case "select":
//       return (
//         <Select onValueChange={field.onChange} defaultValue={field.value}>
//           <SelectTrigger className="bg-white w-full border border-gray-300 text-gray-900 rounded-md [&>svg]:text-black">
//             <SelectValue placeholder={`Select ${meta.label}`} />
//           </SelectTrigger>
//           <SelectContent className="bg-white text-gray-900">
//             {meta.selectionsOptions?.map((opt) => (
//               <SelectItem key={opt} value={opt} className="hover:bg-gray-100 cursor-pointer">
//                 {opt}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       );
//     default:
//       return <Input {...field} placeholder={meta.placeholder} />;
//   }
// }














import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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


export default function DynamicForm({
  formConstructor,
  title,
  next = "",
  prev = "",
  steps = "",
  onSave,
}) {
  const schemaShape = formConstructor.reduce((acc, item) => {
    acc[item.label] = item.schema;
    return acc;
  }, {});
  const formSchema = z.object(schemaShape);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: formConstructor.reduce((acc, item) => {
      acc[item.label] = "";
      return acc;
    }, {}),
  });

  // ✅ Watch and update parent live
  React.useEffect(() => {
    if (!onSave) return; // guard
    const subscription = form.watch((values) => {
      onSave(values);
    });
    return () => subscription.unsubscribe();
  }, [form, onSave]);

  const handleSubmitForm = (values) => {
    console.log("✅ Submitted values from DynamicForm:", values);
    if (onSave) {
      console.log("📤 Sending to parent via onSave...");
      onSave(values);
    } else {
      console.warn("⚠️ No onSave handler detected at submit time.");
    }
    if (typeof next === "function") next();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="grid gap-6 p-6 rounded-xl sm:grid-cols-1 md:grid-cols-2 auto-rows-min"
      >
        <div className="col-span-full mb-4">
          <FallingWord text={title} />
        </div>

        {formConstructor.map((item, index) => (
          <FormField
            key={index}
            control={form.control}
            name={item.label}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{item.label}</FormLabel>
                <FormControl>
                  <RenderDynamicInput field={field} meta={item} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center w-full col-span-full mt-2">
          <div
            onClick={steps > 1 ? prev : undefined}
            className={`flex items-center gap-1 p-2 rounded transition ${
              steps === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 cursor-pointer hover:bg-amber-300 "
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </div>

          <div
            onClick={steps < 2 ? next : undefined}
            className={`flex items-center gap-1 p-2 rounded transition ${
              steps === 2
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 cursor-pointer hover:bg-amber-300 "
            }`}
          >
            <span className="text-sm font-medium">Next</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>

        <div className="col-span-full flex justify-end">
          <Button type="submit" className="w-full">
            Submit
          </Button>
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
          {...field}
          type={meta.type}
          placeholder={meta.placeholder}
          className="border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400"
        />
      );
    case "textarea":
      return <Textarea {...field} placeholder={meta.placeholder} className="bg-white" />;
    case "select":
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="bg-white w-full border border-gray-300 text-gray-900 rounded-md [&>svg]:text-black">
            <SelectValue placeholder={`Select ${meta.label}`} />
          </SelectTrigger>
          <SelectContent className="bg-white text-gray-900">
            {meta.selectionsOptions?.map((opt) => (
              <SelectItem key={opt} value={opt} className="hover:bg-gray-100 cursor-pointer">
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    default:
      return <Input {...field} placeholder={meta.placeholder} />;
  }
}




