import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import styles from "./LargeForm.module.css";
import { useNavigate } from "react-router-dom";

// Schema for form validation
const formSchema = z.object({
  name: z.string().min(2).max(50),
  personalID: z.string().min(2).max(50),
  age: z.string(),
  rank: z.string(),
  department: z.string(),
  unit: z.string(),
  roll: z.string(),
  dob: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  security_question_1: z.string().nonempty("Select a question"),
  security_answer_1: z.string().nonempty("Answer is required"),
  security_question_2: z.string().nonempty("Select a question"),
  security_answer_2: z.string().nonempty("Answer is required"),
});

export default function SignupForm() {
  const navigate = useNavigate();
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      personalID: "",
      age: "",
      rank: "",
      department: "",
      unit: "",
      roll: "",
      dob: "",
      password: "",
      security_question_1: "",
      security_answer_1: "",
      security_question_2: "",
      security_answer_2: "",
    },
  });

  async function onSubmit(values: any) {
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        navigate("/");
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (error) {
      alert("Server error or network issue. Please try again later.");
      console.error(error);
    }
  }

  function back() {
    navigate("/");
  }

  const inputstyle = `
    bg-[#FAF8F1]
    shadow-[2px_2px_0_rgba(0,0,0,0.25)]
    focus:ring-2
    focus:ring-amber-400
    transition-all
    duration-200
    border border-gray-300
    rounded-sm
    px-5 py-2
  `;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`w-[850px] ${styles.formContainer} space-y-4 rounded bg-white`}
      >
        <h1 className={`${styles.title} text-title`}>Signup Form</h1>

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} className={inputstyle} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Personal ID */}
        <FormField
          control={form.control}
          name="personalID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personal ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter personal ID" {...field} className={inputstyle} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Set a password" {...field} className={inputstyle} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Security Question 1 */}
        <FormField
          control={form.control}
          name="security_question_1"
          render={() => (
            <FormItem>
              <FormLabel>Security Question 1</FormLabel>
              <Select
                onValueChange={(val) => {
                  form.setValue("security_question_1", val);
                  setQuestion1(val);
                }}
              >
                <SelectTrigger className="bg-[#FAF8F1] border-gray-300">
                  <SelectValue placeholder="Select a question" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pet">Name of your first pet</SelectItem>
                  <SelectItem value="nickname">Childhood nickname</SelectItem>
                  <SelectItem value="mother-maiden">Mother’s maiden name</SelectItem>
                  <SelectItem value="birth-city">City you were born in</SelectItem>
                  <SelectItem value="school">Name of your first school</SelectItem>
                </SelectContent>
              </Select>

              <FormField
                control={form.control}
                name="security_answer_1"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter answer" {...field} className={inputstyle} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>
          )}
        />

        {/* Security Question 2 */}
        <FormField
          control={form.control}
          name="security_question_2"
          render={() => (
            <FormItem>
              <FormLabel>Security Question 2</FormLabel>
              <Select
                onValueChange={(val) => {
                  form.setValue("security_question_2", val);
                  setQuestion2(val);
                }}
              >
                <SelectTrigger className="bg-[#FAF8F1] border-gray-300">
                  <SelectValue placeholder="Select a question" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pet">Name of your first pet</SelectItem>
                  <SelectItem value="nickname">Childhood nickname</SelectItem>
                  <SelectItem value="mother-maiden">Mother’s maiden name</SelectItem>
                  <SelectItem value="birth-city">City you were born in</SelectItem>
                  <SelectItem value="school">Name of your first school</SelectItem>
                </SelectContent>
              </Select>

              <FormField
                control={form.control}
                name="security_answer_2"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter answer" {...field} className={inputstyle} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>
          )}
        />

        {/* Rest of your fields (Age, Rank, Department, etc.) */}
        {/* ... same as before ... */}

        <span className="flex justify-around mt-6">
          <Button onClick={back} className="bg-amber-500">
            Go Back
          </Button>
          <Button type="submit" className="bg-amber-600">
            Submit
          </Button>
        </span>
      </form>
    </Form>
  );
}
