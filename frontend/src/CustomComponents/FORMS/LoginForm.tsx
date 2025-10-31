import React from "react";
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
import styles from "./SmallForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import FallingWord from "./FallingWord";

// 🧩 Validation schema
const formSchema = z.object({
  personalID: z.string().min(2, "Enter valid Personal ID").max(50),
  password: z.string().min(5, "Password must be at least 5 characters").max(20),
});

export default function LoginForm() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalID: "",
      password: "",
    },
  });

  // ✅ Backend connection
  async function onSubmit(values: any, e: React.FormEvent) {
    e.preventDefault();
    const { personalID, password } = values;

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personalID, password }),
      });

      const data = await res.json();

      // ✅ Handle responses based on backend logic
      if (res.ok && data.success) {
        alert("✅ Login successful!");
        navigate("/landing");
      } else if (data.message?.includes("not found")) {
        alert("❌ Personal ID not found. Please sign up first.");
      } else if (data.message?.includes("Password")) {
        alert("❌ Incorrect password. Try again.");
      } else {
        alert(data.message || "❌ Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("⚠️ Unable to connect to server. Try again later.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`${styles.formContainer} space-y-4 rounded bg-white shadow-md w-[350px] p-4`}
      >
        <FallingWord text="Welcome to CRM" />

        {/* Personal ID */}
        <FormField
          control={form.control}
          name="personalID"
          render={({ field }) => (
            <FormItem className={`${styles.formItem} text-title`}>
              <FormLabel>Personal ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your Personal ID"
                  {...field}
                  className={`${styles.formInput}`}
                />
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
            <FormItem className={`${styles.formItem} text-title`}>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...field}
                  className={`${styles.formInput}`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Link
          to="/forgot-password"
          className="text-sm text-blue-500 hover:underline"
        >
          Forgot password?
        </Link>

        <div className="flex justify-between items-center w-full pt-2">
          <Link
            to="/signup"
            className="text-[15px] text-blue-800 font-medium hover:underline"
          >
            New user?
          </Link>

          <Button type="submit" className="cursor-pointer bg-amber-500">
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}
