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
import { useTranslation } from 'react-i18next'

export default function Login() {

    const { t } = useTranslation()

    const formSchema = z.object({
        id: z.string({
            required_error: t('formSchema.id.required_error')
        }).nonempty({ message: t('formSchema.id.nonempty') }),
    
        password: z.string({
            required_error: t('formSchema.password.required_error')
        })
            .min(8, { message: t('formSchema.password.min') })
            .max(36, { message: t('formSchema.password.max') })
            .regex(/[A-Z]/, { message: t('formSchema.password.regex_uppercase') })
            .regex(/[a-z]/, { message: t('formSchema.password.regex_lowercase') })
            .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: t('formSchema.password.regex_special') })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
            password: "",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        toast({
            title: "Olá seja bem-vindo de volta!"
        })
        console.log(JSON.stringify(data))
    }

    return (
        <>
            <div className="absolute right-10 bottom-10">
                <ModeToggle />
            </div>
            <div className='grid w-full h-full grid-cols-1 box-anim md:grid-cols-2'>
                <div className='relative hidden md:block login_bg '>
                    <img src=".././src/assets/logo.png" alt="" className="w-48 hidden md:block p-3 m-3 bg-[#030712] rounded-md" />
                </div>
                <div className='text-white flex items-center justify-center flex-col'>
                    <div className="w-96">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl space-y-5">
                                <div className="w-full flex flex-col items-center justify-center text-center">
                                    <div>
                                        <img src=".././src/assets/logo.png" alt="" className="w-64 md:hidden m-2" />
                                    </div>
                                    <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl text-black dark:text-white">{t('pages.login.signin')}</h1>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input className="p-5 font-medium text-base" placeholder="CPF/CNPJ" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input className="p-5 font-medium text-base" type="password" placeholder={t('pages.login.password')} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="savepass" />
                                        <label htmlFor="savepass" className="text-sm font-medium laeding-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black dark:text-white">{t('pages.login.rememberPassword')}</label>
                                    </div>
                                    <Button type="submit" className="w-full">{t('pages.login.signin')}</Button>
                                    <h3 className="font-medium cursor-pointer text-sm">{t('pages.login.signInRemember')}</h3>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
