import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import styles from "./SmallForm.module.css";
import { Link } from 'react-router-dom';

// schema 
const formSchema = z.object({
    personalID: z.string().min(2).max(50),
    securityAnswer1: z.string().min(2),
    securityAnswer2: z.string().min(2),
    newPassword: z.string().min(5).max(14),
});

export default function ForgetForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            personalID: "",
            securityAnswer1: "",
            securityAnswer2: "",
            newPassword: ""
        },
    });

    function onSubmit(values: any) {
        console.log(values);
        alert("hellow orld");
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={`${styles.formContainer} space-y-4 rounded`}
            >
                <h1 className={`${styles.title} text-title `}>password reset</h1>

                {/* personalID form item */}
                <FormField
                    control={form.control}
                    name="personalID"
                    render={({ field }) => (
                        <FormItem className={`${styles.formItem} text-title`}>
                            <FormLabel className={`${styles.formLabel} text-title`}>Personal ID</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter personal ID"
                                    {...field}
                                    className={`${styles.formInput}`}
                                />
                            </FormControl>
                            <FormMessage className={`${styles.formMessage}`} />
                        </FormItem>
                    )}
                />

                {/* security question 1 */}
                <FormField
                    control={form.control}
                    name="securityAnswer1"
                    render={({ field }) => (
                        <FormItem className={`${styles.formItem} text-title`}>
                            <FormLabel className={`${styles.formLabel} text-title`}>
                                Security Question 1
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter answer"
                                    {...field}
                                    className={`${styles.formInput}`}
                                />
                            </FormControl>
                            <FormMessage className={`${styles.formMessage}`} />
                        </FormItem>
                    )}
                />

                {/* security question 2 */}
                <FormField
                    control={form.control}
                    name="securityAnswer2"
                    render={({ field }) => (
                        <FormItem className={`${styles.formItem} text-title`}>
                            <FormLabel className={`${styles.formLabel} text-title`}>
                                Security Question 2
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter answer"
                                    {...field}
                                    className={`${styles.formInput}`}
                                />
                            </FormControl>
                            <FormMessage className={`${styles.formMessage}`} />
                        </FormItem>
                    )}
                />

                {/* new password */}
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem className={`${styles.formItem} text-title`}>
                            <FormLabel className={`${styles.formLabel} text-title`}>New Password</FormLabel>
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

                <Button type="submit" className={`${styles.submitButton} cursor-pointer`}>
                    Submit
                </Button>
            </form>
        </Form>
    );
}
