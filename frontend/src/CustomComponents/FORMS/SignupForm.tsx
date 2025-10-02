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
import styles from "./LargeForm.module.css";
import { useNavigate } from 'react-router-dom';

// schema 
const formSchema = z.object({
    name: z.string().min(2).max(50),
    personalID: z.string().min(2).max(50),
    age: z.string(),
    rank: z.string(),
    department: z.string(),
    unit: z.string(),
    roll: z.string(),
    dob: z.string(),
});

// function component
export default function SignupForm() {
    const navigate=useNavigate()
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
        },
    });

    function onSubmit(values: any) {
        console.log(values);
        alert("succes new id password will be given by your dept admin");
        navigate("/")

    }

    function back(){
        navigate("/")

    }

    return (
        // form container starts
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={`w-[850px]  ${styles.formContainer} space-y-4 rounded `}
            >
                <h1 className={`${styles.title} text-title `}>Signup form</h1>

                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className={`${styles.formItem} text-title`}>
                            <FormLabel className={`${styles.formLabel} text-title`}>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your name"
                                    {...field}
                                    className={`${styles.formInput}`}
                                />
                            </FormControl>
                            <FormMessage className={`${styles.formMessage}`} />
                        </FormItem>
                    )}
                />

                {/* Personal ID */}
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

                {/* Age */}
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem className={`${styles.formItem} text-title`}>
                            <FormLabel className={`${styles.formLabel} text-title`}>Age</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter age"
                                    {...field}
                                    className={`${styles.formInput}`}
                                />
                            </FormControl>
                            <FormMessage className={`${styles.formMessage}`} />
                        </FormItem>
                    )}
                />

                {/* Rank */}
                <FormField
                    control={form.control}
                    name="rank"
                    render={({ field }) => (
                        <FormItem className={`${styles.formItem} text-title`}>
                            <FormLabel className={`${styles.formLabel} text-title`}>Rank</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter rank"
                                    {...field}
                                    className={`${styles.formInput}`}
                                />
                            </FormControl>
                            <FormMessage className={`${styles.formMessage}`} />
                        </FormItem>
                    )}
                />

                {/* Department */}
                <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                        <FormItem className={`${styles.formItem} text-title`}>
                            <FormLabel className={`${styles.formLabel} text-title`}>Department</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter department"
                                    {...field}
                                    className={`${styles.formInput}`}
                                />
                            </FormControl>
                            <FormMessage className={`${styles.formMessage}`} />
                        </FormItem>
                    )}
                />

                {/* Unit */}
                <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                        <FormItem className={`${styles.formItem} text-title`}>
                            <FormLabel className={`${styles.formLabel} text-title`}>Unit</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter unit"
                                    {...field}
                                    className={`${styles.formInput}`}
                                />
                            </FormControl>
                            <FormMessage className={`${styles.formMessage}`} />
                        </FormItem>
                    )}
                />

                {/* Roll */}
                <FormField
                    control={form.control}
                    name="roll"
                    render={({ field }) => (
                        <FormItem className={`${styles.formItem} text-title`}>
                            <FormLabel className={`${styles.formLabel} text-title`}>Roll</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter roll number"
                                    {...field}
                                    className={`${styles.formInput}`}
                                />
                            </FormControl>
                            <FormMessage className={`${styles.formMessage}`} />
                        </FormItem>
                    )}
                />

                {/* Date of Birth */}
                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem className={`${styles.formItem} text-title`}>
                            <FormLabel className={`${styles.formLabel} text-title`}>Date of Birth</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    placeholder="Enter date of birth"
                                    {...field}
                                    className={`${styles.formInput}`}
                                />
                            </FormControl>
                            <FormMessage className={`${styles.formMessage}`} />
                        </FormItem>
                    )}
                />
              

                <span className={`${styles.footerBtn} flex w-[100%] justify-around `} >
                     <Button onClick={back} className={`${styles.submitButton} bg-amber-500 cursor-pointer`}>
                    Go back
                </Button>
                    <Button type="submit" className={`${styles.submitButton} cursor-pointer`}>
                    Submit
                </Button>
               
                </span>
            </form>
        </Form>
    );
}
