"use client"
import * as z from "zod";
import { useState, useTransition } from "react";
import { RegisterSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register"
import { Island_Moments } from "next/font/google";

 export const  RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {

            register(values)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            })
            
        });
    }
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        },
    });
    return (
        <CardWrapper
        headerLabel="Create an account"
        backButtonHref="/auth/login"
        backButtonLabel="Already have an account?"
        showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
                    <div className="space-y-4">
                    <FormField control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input 
                                {...field}
                                placeholder="John Doe"
                                type="name"
                                disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
    )}
                        />
                        <FormField control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input 
                                {...field}
                                placeholder="john.doe@example.com"
                                type="email"
                                disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
    )}
                        />
                        <FormField control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input 
                                {...field}
                                placeholder="******"
                                type="password"
                                disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
    )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                    >
                        Create an account
                    </Button>
                </form>

            </Form>
        </CardWrapper>
    )
}