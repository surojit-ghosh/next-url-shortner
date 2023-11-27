"use client";

import { useState } from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar"
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { createSchema } from "./validators.js";
import { useToast } from "@/components/ui/use-toast.js";
import { useRouter } from "next/navigation";
//TODO: title input
const CreateLink = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(createSchema),
        defaultValues: {
            url: "",
            slug: ""
        }
    });

    async function onSubmit(values) {
        try {
            const response = await fetch("/api/links", {
                method: "POST",
                body: JSON.stringify(values)
            });
            const data = await response.json();

            if (data.error) {
                return toast({
                    variant: "destructive",
                    description: data.message,
                });
            };

            setIsOpen(false);
            form.reset({ slug: "", url: "" });
            router.replace("/dashboard/links");
            return toast({
                description: data.message,
            });
        } catch (error) {
            return toast({
                variant: "destructive",
                description: data.message,
            });
        };
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogTrigger className="flex gap-3 items-center px-4 py-2 bg-primary hover:bg-primary-700 text-white rounded-sm"><Plus />Create New</DialogTrigger>

            <DialogContent className="md:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Shorten Your Link</DialogTitle>
                    <DialogDescription>
                        Create a shortened version of your URL in just a few simple steps. Fill out the form below to generate a custom short link.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Original url */}
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Original URL<span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter the URL you want to shorten, including "http://" or "https://"' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-between gap-4">
                            {/* Custom aliese */}
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem className="w-full flex-1">
                                        <FormLabel>Custom Alias (Optional)</FormLabel>
                                        <FormControl>
                                            <Input className="" placeholder='Enter a custom alias (e.g., my-event-2023)' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Date to expire */}
                            <FormField
                                control={form.control}
                                name="expiresOn"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel className="leading-[16px]">Expiration Date (Optional)</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[200px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "yyyy-MM-dd")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Create</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateLink;