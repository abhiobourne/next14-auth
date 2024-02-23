"use client"
import * as z from "zod";
import { useState, useTransition } from "react";
import { LoginSchema } from "@/schemas";
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
import { login } from "@/actions/login"
import { Island_Moments } from "next/font/google";

 export const  LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {

            login(values)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            })
            
        });
    }
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    return (
        <CardWrapper
        headerLabel="Welcome back"
        backButtonHref="/auth/register"
        backButtonLabel="Don't have an account?"
        showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
                    <div className="space-y-4">
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
                        Login
                    </Button>
                </form>

            </Form>
        </CardWrapper>
    )
}