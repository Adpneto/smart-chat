import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Card } from "@/components/ui/card"
import React from "react"
import { useTranslation } from 'react-i18next'

export default function Register() {
    const { t } = useTranslation()

    const formSchema = z.object({
        corp_name: z.string({
            required_error: t('formSchema.register.corp_name.required_error'),
        })
            .min(2, { message: t('formSchema.register.corp_name.min') })
            .max(50, { message: t('formSchema.register.corp_name.max') })
            .nonempty({ message: t('formSchema.register.corp_name.nonempty') })
            .regex(/^[A-Za-z\s]+$/i, t('formSchema.register.corp_name.regex')),

        id: z.string({
            required_error: t('formSchema.register.id.required_error'),
        }).nonempty({ message: t('formSchema.register.id.nonempty') }),

        email: z.string({
            required_error: t('formSchema.register.email.required_error'),
        })
            .email({ message: t('formSchema.register.email.email') }),

        password: z.string({
            required_error: t('formSchema.register.password.required_error'),
        })
            .min(8, { message: t('formSchema.register.password.min') })
            .max(36, { message: t('formSchema.register.password.max') })
            .regex(/[A-Z]/, { message: t('formSchema.register.password.regex_uppercase') })
            .regex(/[a-z]/, { message: t('formSchema.register.password.regex_lowercase') })
            .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: t('formSchema.register.password.regex_special') }),

        confirm_password: z.string({
            required_error: t('formSchema.register.confirm_password.required_error'),
        })
            .min(8, { message: t('formSchema.register.confirm_password.min') })
            .max(50, { message: t('formSchema.register.confirm_password.max') }),

        phone_number: z.string({
            required_error: t('formSchema.register.phone_number.required_error'),
        })
            .length(11, { message: t('formSchema.register.phone_number.length') }),

        plans: z.string({
            required_error: t('formSchema.register.plans.required_error'),
        })
    })
        .refine(({ password, confirm_password }) => password === confirm_password, {
            message: t('formSchema.register.password.refine'),
            path: ["confirm_password"]
        })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            corp_name: "",
            id: "",
            email: "",
            password: "",
            confirm_password: "",
            phone_number: "",
            plans: ""
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        toast({
            title: "Olá seja bem-vindo de volta!"
        })
        console.log(JSON.stringify(data))
    }

    const [selectedCard, setSelectedCard] = React.useState<string | null>(null);

    const handleCardClick = (cardType: string) => {
        setSelectedCard(cardType);
    };

    return (
        <>
            <div className="absolute right-10 bottom-10">
                <ModeToggle />
            </div>
            <div className='grid w-full h-full grid-cols-1 box-anim md:grid-cols-2'>
                <div className='relative hidden md:block login_bg'>
                    <img src=".././src/assets/logo.png" alt="" className="w-48 hidden md:block p-3 m-3 bg-[#030712] rounded-md" />
                </div>
                <div className='text-black dark:text-white flex items-center justify-center flex-col'>
                    <div className="w-96">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl space-y-4">
                                <div className="w-full flex flex-col items-center justify-center text-center text-black  dark:text-white">
                                    <div>
                                        <img src=".././src/assets/logo.png" alt="" className="w-64 md:hidden m-2" />
                                    </div>
                                    <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl">{t('pages.register.signup')}</h1>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="corp_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input className="p-5 font-medium text-base" type="text" placeholder={t('pages.register.corp_name')} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input className="p-5 font-medium text-base" placeholder={t('pages.register.id')} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input className="p-5 font-medium text-base" type="email" placeholder={t('pages.register.email')} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <div className="flex space-x-2">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input className="p-5 font-medium text-base" type="password" placeholder={t('pages.register.password')}  {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    <FormField
                                        control={form.control}
                                        name="confirm_password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input className="p-5 font-medium text-base" type="password" placeholder={t('pages.register.confirm_password')} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="phone_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input className="p-5 font-medium text-base" type="number" placeholder={t('pages.register.phone_number')} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                <FormField
                                    control={form.control}
                                    name="plans"
                                    render={({ field }) => (
                                        <div className="grid grid-cols-3 w-full gap-2" {...field}>
                                            <Card
                                                className={`flex flex-col items-center justify-center p-2 cursor-pointer ${selectedCard === "START" ? "border-2 border-[#2bc9b0] p-2" : ""
                                                    }`}
                                                onClick={() => handleCardClick("START")}
                                            >
                                                <h1 className="font-extrabold text-[1.5rem] text-[#2bc9b0]">{t('pages.register.plans.start.name')}</h1>
                                                <h3 className="font-medium text-[0.8rem]">{t('pages.register.plans.start.queue')}</h3>
                                                <h3 className="font-medium text-[0.8rem]">{t('pages.register.plans.start.employees')}</h3>
                                                <h3 className="font-medium text-[0.8rem]">{t('pages.register.plans.start.whatsapp')}</h3>
                                                <h2 className="font-bold text-[1.3rem]">{t('pages.register.plans.start.price')}</h2>
                                            </Card>
                                            <Card
                                                className={`flex flex-col items-center justify-center p-2 cursor-pointer ${selectedCard === "PLUS" ? "border-2 border-[#afe5b5] p-2" : ""
                                                    }`}
                                                onClick={() => handleCardClick("PLUS")}
                                            >
                                                <h1 className="font-extrabold text-[1.5rem] text-[#afe5b5]">{t('pages.register.plans.plus.name')}</h1>
                                                <h3 className="font-medium text-[0.8rem]">{t('pages.register.plans.plus.queue')}</h3>
                                                <h3 className="font-medium text-[0.8rem]">{t('pages.register.plans.plus.employees')}</h3>
                                                <h3 className="font-medium text-[0.8rem]">{t('pages.register.plans.plus.whatsapp')}</h3>
                                                <h2 className="font-bold text-[1.3rem]">{t('pages.register.plans.plus.price')}</h2>
                                            </Card>
                                            <Card
                                                className={`flex flex-col items-center justify-center p-2 cursor-pointer ${selectedCard === "PRO" ? "border-2 border-[#461873] p-2" : ""
                                                    }`}
                                                onClick={() => handleCardClick("PRO")}
                                            >
                                                <h1 className="font-extrabold text-[1.5rem] text-[#461873]">{t('pages.register.plans.pro.name')}</h1>
                                                <h3 className="font-medium text-[0.8rem]">{t('pages.register.plans.pro.queue')}</h3>
                                                <h3 className="font-medium text-[0.8rem]">{t('pages.register.plans.pro.employees')}</h3>
                                                <h3 className="font-medium text-[0.8rem]">{t('pages.register.plans.pro.whatsapp')}</h3>
                                                <h2 className="font-bold text-[1.3rem]">{t('pages.register.plans.pro.price')}</h2>
                                            </Card>
                                        </div>
                                    )} />
                                <div className="space-y-2">
                                    <div className="items-top flex space-x-2">
                                        <Checkbox id="terms1" />
                                        <div className="grid gap-1.5 leading-none">
                                            <label
                                                htmlFor="terms1"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {t('pages.register.terms')}
                                            </label>
                                            <p className="text-sm text-muted-foreground">
                                                {t('pages.register.termsDesc')}
                                            </p>
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full">{t('pages.register.signup')}</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
