import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslation } from 'react-i18next';
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronRight } from "lucide-react";

export default function Payments() {
    const { t } = useTranslation();

    const [invoices] = useState([
        { id: 1, plan: "START", amount: 100, status: "Devendo", dueDate: "2024-09-15" },
        { id: 2, plan: "PRO", amount: 250, status: "Pago", dueDate: "2024-08-15" },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null);
    const [paymentMethod, setPaymentMethod] = useState("creditCard");
    const [selectedCard, setSelectedCard] = useState<string | null>(null);

    const handlePayInvoice = (invoiceId: number) => {
        setSelectedInvoice(invoiceId);
        setCurrentStep(1);
        setIsDialogOpen(true);
    };

    const handleNextStep = () => {
        setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
    };

    const handlePreviousStep = () => {
        setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const handleCardClick = (cardType: string) => {
        setSelectedCard(cardType);
    };

    const renderStepContent = () => {
        const currentPlan = selectedInvoice !== null ? invoices.find(invoice => invoice.id === selectedInvoice)?.plan : "START";

        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-2">
                        <h3 className="text-lg text-center font-semibold">{t('pages.payments.dialog.planDetails')}</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {["START", "PLUS", "PRO"].map(planType => (
                                <Card
                                    key={planType}
                                    className={`flex flex-col items-center justify-center p-2 cursor-pointer ${currentPlan === planType ? "border-2" : "opacity-50"}`}
                                    style={{ borderColor: planType === "START" ? "#2bc9b0" : planType === "PLUS" ? "#afe5b5" : "#461873" }}
                                    onClick={() => handleCardClick(planType)}
                                >
                                    <h1 className="font-extrabold text-[1.5rem]" style={{ color: planType === "START" ? "#2bc9b0" : planType === "PLUS" ? "#afe5b5" : "#461873" }}>{t(`pages.register.plans.${planType.toLowerCase()}.name`)}</h1>
                                    <h3 className="font-medium text-[0.8rem]">{t(`pages.register.plans.${planType.toLowerCase()}.queue`)}</h3>
                                    <h3 className="font-medium text-[0.8rem]">{t(`pages.register.plans.${planType.toLowerCase()}.employees`)}</h3>
                                    <h3 className="font-medium text-[0.8rem]">{t(`pages.register.plans.${planType.toLowerCase()}.whatsapp`)}</h3>
                                    <h2 className="font-bold text-[1.3rem]">{t(`pages.register.plans.${planType.toLowerCase()}.price`)}</h2>
                                </Card>
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg text-center font-semibold">{t('pages.payments.dialog.step2')}</h3>
                            <h3 className="text-sm text-center font-extralight">{t('pages.payments.dialog.step2Datails')}</h3>
                        </div>
                        {selectedInvoice !== null && (
                            <div className="grid grid-cols-3 gap-4">
                                {["START", "PLUS", "PRO"].map(planType => (
                                    <Card
                                        key={planType}
                                        className={`flex flex-col items-center justify-center p-2 cursor-pointer ${selectedCard === planType ? "opacity-100 border-4" : "opacity-70"}`}
                                        style={{ borderColor: planType === "START" ? "#2bc9b0" : planType === "PLUS" ? "#afe5b5" : "#461873" }}
                                        onClick={() => handleCardClick(planType)}
                                    >
                                        <h1 className="font-extrabold text-[1.5rem]" style={{ color: planType === "START" ? "#2bc9b0" : planType === "PLUS" ? "#afe5b5" : "#461873" }}>{t(`pages.register.plans.${planType.toLowerCase()}.name`)}</h1>
                                        <h3 className="font-medium text-[0.8rem]">{t(`pages.register.plans.${planType.toLowerCase()}.queue`)}</h3>
                                        <h3 className="font-medium text-[0.8rem]">{t(`pages.register.plans.${planType.toLowerCase()}.employees`)}</h3>
                                        <h3 className="font-medium text-[0.8rem]">{t(`pages.register.plans.${planType.toLowerCase()}.whatsapp`)}</h3>
                                        <h2 className="font-bold text-[1.3rem]">{t(`pages.register.plans.${planType.toLowerCase()}.price`)}</h2>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-2">
                        {selectedInvoice !== null && (
                            <div className="flex justify-center">
                                <Card
                                    className={`flex gap-4 w-fit items-center justify-center px-5 py-2 border-2 ${invoices.find(invoice => invoice.id === selectedInvoice)?.plan === "START" ? "border-[#2bc9b0]" : invoices.find(invoice => invoice.id === selectedInvoice)?.plan === "PLUS" ? "border-[#afe5b5]" : "border-[#461873]"
                                        }`}
                                >
                                    <div className="flex flex-col items-center">
                                        <h1 className="font-extrabold text-[1.5rem] text-[#2bc9b0]">{invoices.find(invoice => invoice.id === selectedInvoice)?.plan}</h1>
                                        <h2 className="font-bold text-[1.3rem]">{t(`pages.register.plans.${invoices.find(invoice => invoice.id === selectedInvoice)?.plan.toLowerCase()}.price`)}</h2>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[0.8rem]">{t(`pages.register.plans.${invoices.find(invoice => invoice.id === selectedInvoice)?.plan.toLowerCase()}.queue`)}</h3>
                                        <h3 className="font-medium text-[0.8rem]">{t(`pages.register.plans.${invoices.find(invoice => invoice.id === selectedInvoice)?.plan.toLowerCase()}.employees`)}</h3>
                                        <h3 className="font-medium text-[0.8rem]">{t(`pages.register.plans.${invoices.find(invoice => invoice.id === selectedInvoice)?.plan.toLowerCase()}.whatsapp`)}</h3>
                                    </div>

                                </Card>
                            </div>
                        )}

                        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-4 flex items-center justify-center gap-5">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="creditCard" id="creditCard" />
                                <label htmlFor="creditCard">{t("pages.payments.dialog.creditCard")}</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="boleto" id="boleto" />
                                <label htmlFor="boleto">{t("pages.payments.dialog.boleto")}</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="pix" id="pix" />
                                <label htmlFor="pix">{t("pages.payments.dialog.pix")}</label>
                            </div>
                        </RadioGroup>

                        {paymentMethod === "creditCard" && (
                            <div className="space-y-2">
                                <Input placeholder={t("pages.payments.dialog.cardNumber")} className="w-full" />
                                <div className="flex gap-2">
                                    <Input placeholder={t("pages.payments.dialog.expirationDate")} className="w-full" />
                                    <Input placeholder={t("pages.payments.dialog.cvv")} className="w-full" />
                                </div>
                            </div>
                        )}

                        {paymentMethod === "boleto" && (
                            <div className="space-y-2">
                                <p>{t("pages.payments.dialog.boletoInstructions")}</p>
                                <Button className="w-full">{t("pages.payments.dialog.generateBoleto")}</Button>
                            </div>
                        )}

                        {paymentMethod === "pix" && (
                            <div className="space-y-2">
                                <p>{t("pages.payments.dialog.pixInstructions")}</p>
                                <Button className="w-full">{t("pages.payments.dialog.payWithPix")}</Button>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="mx-5 md:w-[1440px] shadow-xl p-5">
            <div className="flex flex-col space-y-2 md:flex-row justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{t('pages.payments.table_name')}</h2>
            </div>
            <div className="table-auto border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">{t('pages.payments.table.plan')}</TableHead>
                            <TableHead className="text-center">{t('pages.payments.table.amount')}</TableHead>
                            <TableHead className="text-center">{t('pages.payments.table.status')}</TableHead>
                            <TableHead className="text-center">{t('pages.payments.table.actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice, index) => (
                            <TableRow key={index} className="text-center">
                                <TableCell>{invoice.plan}</TableCell>
                                <TableCell>${invoice.amount}</TableCell>
                                <TableCell>{invoice.status}</TableCell>
                                <TableCell className="flex justify-center">
                                    {invoice.status === "Devendo" && (
                                        <Button variant="outline" size="sm" onClick={() => handlePayInvoice(invoice.id)}>
                                            {t('pages.payments.table.pay')}
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <div className="space-y-4">
                        <div className="flex justify-center mb-4">
                            <div className="flex justify-center items-center space-x-2">
                                <div>
                                    {currentStep === 1 && (
                                        <div className="flex gap-2 font-medium justify-center items-center rounded-md p-1">
                                            <div className={`flex items-center justify-center bg-purple-900 px-4 py-1 rounded-md`}>
                                                Dados
                                            </div>
                                            <ChevronRight />
                                            <div className={`flex items-center justify-center px-2 py-1`}>
                                                Personalizar
                                            </div>
                                            <ChevronRight />
                                            <div className={`flex items-center justify-center px-4 py-1`}>
                                                Revisar
                                            </div>
                                        </div>
                                    )}
                                    {currentStep === 2 && (
                                        <div className="flex gap-2 font-medium justify-center items-center rounded-md p-1">
                                            <div className={`flex items-center justify-center px-4 py-1`}>
                                                Dados
                                            </div>
                                            <ChevronRight />
                                            <div className={`flex items-center justify-center bg-purple-900 px-2 py-1 rounded-md`}>
                                                Personalizar
                                            </div>
                                            <ChevronRight />
                                            <div className={`flex items-center justify-center px-4 py-1`}>
                                                Revisar
                                            </div>
                                        </div>
                                    )}
                                    {currentStep === 3 && (
                                        <div className="flex gap-2 font-medium justify-center items-center rounded-md p-1">
                                            <div className={`flex items-center justify-center px-4 py-1`}>
                                                Dados
                                            </div>
                                            <ChevronRight />
                                            <div className={`flex items-center justify-center px-2 py-1`}>
                                                Personalizar
                                            </div>
                                            <ChevronRight />
                                            <div className={`flex items-center justify-center bg-purple-900 px-4 py-1 rounded-md`}>
                                                Revisar
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {renderStepContent()}

                        <div className="flex justify-between gap-2">
                            {currentStep > 1 && (
                                <Button onClick={handlePreviousStep} variant="outline" className="w-full">
                                    {t('pages.payments.dialog.previous')}
                                </Button>
                            )}
                            {currentStep < 3 ? (
                                <Button onClick={handleNextStep} variant="outline" className="w-full">
                                    {t('pages.payments.dialog.next')}
                                </Button>
                            ) : (
                                <Button onClick={() => setIsDialogOpen(false)} variant="outline" className="w-full">
                                    {t('pages.payments.dialog.close')}
                                </Button>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
