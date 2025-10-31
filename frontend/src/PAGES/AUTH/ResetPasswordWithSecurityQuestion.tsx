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
import styles from "../../CustomComponents/FORMS/SmallForm.module.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FallingWord from "../../CustomComponents/FORMS/FallingWord";
import { Link, useNavigate } from "react-router-dom";

// ============================
// ✅ Validation Schema
// ============================
const formSchema = z.object({
  personalID: z.string().min(2, "Enter valid ID").max(50),
  security_answer_1: z.string().min(2, "Answer required"),
  security_answer_2: z.string().min(2, "Answer required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

// ============================
// ✅ Component
// ============================
export default function ResetPasswordWithSecurityQuestion() {
  const navigate = useNavigate();
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalID: "",
      security_answer_1: "",
      security_answer_2: "",
      newPassword: "",
    },
  });

  // ============================
  // ✅ Submit Handler
  // ============================
  async function onSubmit(values: any) {
    try {
      const response = await fetch("http://localhost:3000/recover-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personalID: values.personalID,
          answer1: values.security_answer_1,
          answer2: values.security_answer_2,
          newPassword: values.newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ " + data.message);
        navigate("/");
      } else {
        alert("❌ " + (data.message || "Incorrect answers or ID."));
      }
    } catch (error) {
      console.error("Password reset error:", error);
      alert("⚠️ Server error. Please try again later.");
    }
  }

  function tologin() {
    navigate("/");
  }

  return (
    <div className="bg-bg-contrast h-[100vh] flex justify-center items-center ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`${styles.formContainer} space-y-4 mt-[80px] rounded w-[450px] capitalize`}
        >
          <FallingWord text="Password Reset" />

          {/* Personal ID */}
          <FormField
            control={form.control}
            name="personalID"
            render={({ field }) => (
              <FormItem className={`${styles.formItem} text-title`}>
                <FormLabel className={`${styles.formLabel} text-title`}>
                  Personal ID
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your personal ID"
                    {...field}
                    className={`${styles.formInput}`}
                  />
                </FormControl>
                <FormMessage className={`${styles.formMessage}`} />
              </FormItem>
            )}
          />

          {/* Security Question 1 */}
          <FormItem className={`${styles.formItem}`}>
            <FormLabel className={`${styles.formLabel} text-title`}>
              Security Question 1
            </FormLabel>
            <FormControl>
              <Select onValueChange={setQuestion1}>
                <SelectTrigger
                  className={`${styles.formItem} bg-black text-text-inverse capitalize`}
                >
                  <SelectValue placeholder="Select a security question" />
                </SelectTrigger>
                <SelectContent className="text-text-placeholder capitalize">
                  <SelectItem value="pet">Name of your first pet</SelectItem>
                  <SelectItem value="nickname">Childhood nickname</SelectItem>
                  <SelectItem value="mother-maiden">
                    Mother’s maiden name
                  </SelectItem>
                  <SelectItem value="birth-city">
                    City you were born in
                  </SelectItem>
                  <SelectItem value="school">
                    Name of your first school
                  </SelectItem>
                  <SelectItem value="favorite-teacher">
                    Favorite teacher’s name
                  </SelectItem>
                  <SelectItem value="car-model">First car model</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>

            {/* Answer Input */}
            <FormField
              control={form.control}
              name="security_answer_1"
              render={({ field }) => (
                <FormItem className={`${styles.formItem} mt-2`}>
                  <FormLabel className={`${styles.formLabel} text-title`}>
                    Answer
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your answer"
                      {...field}
                      className={`${styles.formInput}`}
                    />
                  </FormControl>
                  <FormMessage className={`${styles.formMessage}`} />
                </FormItem>
              )}
            />
          </FormItem>

          {/* Security Question 2 */}
          <FormItem className={`${styles.formItem}`}>
            <FormLabel className={`${styles.formLabel} text-title`}>
              Security Question 2
            </FormLabel>
            <FormControl>
              <Select onValueChange={setQuestion2}>
                <SelectTrigger
                  className={`${styles.formItem} bg-black text-white capitalize`}
                >
                  <SelectValue placeholder="Select a security question" />
                </SelectTrigger>
                <SelectContent className="capitalize text-text-placeholder">
                  <SelectItem value="pet">Name of your first pet</SelectItem>
                  <SelectItem value="nickname">Childhood nickname</SelectItem>
                  <SelectItem value="mother-maiden">
                    Mother’s maiden name
                  </SelectItem>
                  <SelectItem value="birth-city">
                    City you were born in
                  </SelectItem>
                  <SelectItem value="school">
                    Name of your first school
                  </SelectItem>
                  <SelectItem value="favorite-teacher">
                    Favorite teacher’s name
                  </SelectItem>
                  <SelectItem value="car-model">First car model</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>

            {/* Answer Input */}
            <FormField
              control={form.control}
              name="security_answer_2"
              render={({ field }) => (
                <FormItem className={`${styles.formItem} mt-2`}>
                  <FormLabel className={`${styles.formLabel} text-title`}>
                    Answer
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your answer"
                      {...field}
                      className={`${styles.formInput}`}
                    />
                  </FormControl>
                  <FormMessage className={`${styles.formMessage}`} />
                </FormItem>
              )}
            />
          </FormItem>

          {/* New Password */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className={`${styles.formItem} text-title`}>
                <FormLabel className={`${styles.formLabel} text-title`}>
                  New Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    {...field}
                    className={`${styles.formInput}`}
                  />
                </FormControl>
                <FormMessage className={`${styles.formMessage}`} />
              </FormItem>
            )}
          />

          {/* Footer buttons */}
          <span className="w-[100%] text-sm pr-1">
            other options :
            <Link
              to={"/apply-for-pasword-reset"}
              className="text-blue-700 text-sm w-[100%] bg-red-200 pl-2"
            >
              apply for password reset?
            </Link>
          </span>

          <span className={`${styles.footerBtn} flex w-[100%] justify-around`}>
            <Button
              onClick={tologin}
              type="button"
              className={`${styles.submitButton} bg-amber-500 cursor-pointer`}
            >
              Go back
            </Button>
            <Button
              type="submit"
              className={`${styles.submitButton} cursor-pointer`}
            >
              Submit
            </Button>
          </span>
        </form>
      </Form>
    </div>
  );
}
