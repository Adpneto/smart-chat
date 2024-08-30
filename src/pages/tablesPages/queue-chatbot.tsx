import { ChangeEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Pen, Trash } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Select } from "@/components/ui/select"
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion"
import { toast } from "@/components/ui/use-toast"

type Item = {
    name: string
    queue: number | string
    color: string
    message: string
}

type FunctionType = {
    title: string
    text: string
    subfunctions: FunctionType[]
}

export default function QueueChatbot() {
    const { t } = useTranslation()

    const [data, setData] = useState<Item[]>([
        { name: "Saudações", queue: 2, color: "#4950b9", message: "dawdaw" },
        { name: "Planos", queue: 3, color: "#a860fa", message: "dawggaw" },
    ])

    const [newItem, setNewItem] = useState<Item>({
        name: "",
        queue: "",
        color: "#e65656",
        message: "",
    })

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [functions, setFunctions] = useState<FunctionType[]>([])

    const resetForm = () => {
        setNewItem({ name: "", queue: "", color: "#e65656", message: "" })
        setEditingIndex(null)
    }

    const handleAddOrEdit = () => {
        if (!newItem.name || !newItem.color) {
            toast({ variant: "destructive", description: t('pages.toasts.notRequirements') })
            return
        }

        const updatedData = [...data]
        if (editingIndex !== null) {
            updatedData[editingIndex] = { ...newItem, queue: Number(newItem.queue) }
            toast({ description: t('pages.toasts.attSuccess') })
        } else {
            updatedData.push({ ...newItem, queue: Number(newItem.queue) })
            toast({ description: t('pages.toasts.addSuccess') })
        }
        setData(updatedData)
        resetForm()
        setIsDialogOpen(false)
    }

    const handleEdit = (index: number) => {
        setEditingIndex(index)
        const itemToEdit = data[index]
        setNewItem({ ...itemToEdit, queue: String(itemToEdit.queue) })
        setIsDialogOpen(true)
    }

    const handleDelete = (index: number) => {
        toast({ description: t('pages.toasts.deleteSuccess') })
        setData(data.filter((_, i) => i !== index))
    }

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setNewItem((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const connections = ["Conexão 1", "Conexão 2", "Conexão 3"]

    const handleAddFunction = (parentIndex: number | null = null) => {
        const newFunction: FunctionType = {
            title: "",
            text: "",
            subfunctions: [],
        }

        if (parentIndex === null) {
            setFunctions([...functions, newFunction])
        } else {
            const updatedFunctions = [...functions]
            updatedFunctions[parentIndex].subfunctions.push(newFunction)
            setFunctions(updatedFunctions)
        }
    }

    const handleFunctionChange = (
        index: number,
        field: "title" | "text",
        value: string,
        parentIndex: number | null = null
    ) => {
        const updatedFunctions = [...functions]
        if (parentIndex === null) {
            updatedFunctions[index][field] = value
        } else {
            updatedFunctions[parentIndex].subfunctions[index][field] = value
        }
        setFunctions(updatedFunctions)
    }

    const handleDeleteFunction = (index: number, parentIndex: number | null = null) => {
        if (parentIndex === null) {
            setFunctions((prevFunctions) => prevFunctions.filter((_, i) => i !== index))
        } else {
            const updatedFunctions = [...functions]
            updatedFunctions[parentIndex].subfunctions = updatedFunctions[parentIndex].subfunctions.filter((_, i) => i !== index)
            setFunctions(updatedFunctions)
        }
    }

    const renderFunctions = (
        funcs: FunctionType[],
        parentIndex: number | null = null,
        level: number = 0
    ) => {
        return (
            <Accordion type="multiple">
                {funcs.map((func, index) => (
                    <AccordionItem key={index} value={`func-${parentIndex !== null ? `${parentIndex}-` : ""}${index}`}>
                        <AccordionTrigger>
                            {func.title || t("pages.queue.modal.untitledFunction")}
                        </AccordionTrigger>
                        <AccordionContent>
                            <div
                                className={`mb-4 ${parentIndex !== null ? "pl-8 border-l" : ""}`}
                                style={{
                                    borderColor: parentIndex !== null ? "#c3c3c3" : "transparent",
                                    paddingLeft: level * 20,
                                }}
                            >
                                <div className="flex flex-col gap-2 mb-2">
                                    <Input
                                        placeholder={t("pages.queue.modal.functionTitle")}
                                        value={func.title}
                                        onChange={(e) =>
                                            handleFunctionChange(index, "title", e.target.value, parentIndex)
                                        }
                                    />
                                    <Textarea
                                        placeholder={t("pages.queue.modal.functionText")}
                                        value={func.text}
                                        onChange={(e) =>
                                            handleFunctionChange(index, "text", e.target.value, parentIndex)
                                        }
                                        className="w-full h-[60px]"
                                    />
                                    <div>
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                handleAddFunction(parentIndex === null ? index : parentIndex)
                                            }
                                        >
                                            {t("pages.queue.modal.addSubFunction")}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => handleDeleteFunction(index, parentIndex)}
                                        >
                                            {t("pages.queue.modal.deleteFunction")}
                                        </Button>
                                    </div>
                                </div>
                                {func.subfunctions.length > 0 &&
                                    renderFunctions(
                                        func.subfunctions,
                                        parentIndex === null ? index : parentIndex,
                                        level + 1
                                    )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        )
    }

    return (
        <div className="mx-5 md:w-[1440px] shadow-xl p-5">
            <div className="flex flex-col space-y-2 md:flex-row justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{t("pages.queue.table_name")}</h2>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open)
                    if (!open) resetForm()
                }}>
                    <div className="flex gap-2">
                        <Input
                            className="w-[200px] p-3 h-10"
                            placeholder={t("pages.queue.search")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setIsDialogOpen(true)}
                            >
                                {t("pages.queue.add")}
                            </Button>
                        </DialogTrigger>
                    </div>

                    <DialogContent className="sidebar-scrollbar max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {editingIndex !== null
                                    ? t("pages.queue.modal.edit")
                                    : t("pages.queue.modal.add")}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    name="color"
                                    placeholder={t("pages.queue.modal.color")}
                                    value={newItem.color}
                                    onChange={handleInputChange}
                                    type="color"
                                    className="p-0 h-[40px]"
                                />
                                <Input
                                    name="name"
                                    placeholder={t("pages.queue.modal.name")}
                                    value={newItem.name}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    name="queue"
                                    placeholder={t("pages.queue.modal.queue")}
                                    value={newItem.queue}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <Textarea
                                name="message"
                                placeholder={t("pages.queue.modal.message")}
                                value={newItem.message}
                                onChange={handleInputChange}
                                className="w-full"
                            />

                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder={t("pages.queue.modal.integration")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {connections.map((connection, index) => (
                                        <SelectItem key={index} value={connection}>
                                            {connection}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder={t("pages.queue.modal.prompt")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {connections.map((connection, index) => (
                                        <SelectItem key={index} value={connection}>
                                            {connection}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <div>
                                <h3>{t("pages.queue.modal.options")}</h3>
                                {renderFunctions(functions)}
                                <Button className="mt-4" variant="outline" onClick={() => handleAddFunction()}>
                                    {t("pages.queue.modal.addFunction")}
                                </Button>
                            </div>
                        </div>
                        <Button onClick={handleAddOrEdit}>
                            {editingIndex !== null ? t("pages.queue.modal.edit") : t("pages.queue.modal.save")}
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">{t("pages.queue.table.name")}</TableHead>
                        <TableHead className="text-center">{t("pages.queue.modal.queue")}</TableHead>
                        <TableHead className="text-center">{t("pages.queue.table.message")}</TableHead>
                        <TableHead className="text-center">{t("pages.queue.table.actions")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="text-center">
                                <div className="px-3 py-1 rounded-sm  shadow-md font-bold inline-block"
                                    style={{ backgroundColor: item.color }}>
                                    {item.name}
                                </div>
                            </TableCell>
                            <TableCell className="text-center">{item.queue}</TableCell>
                            <TableCell className="text-center">{item.message}</TableCell>
                            <TableCell className="text-center">
                                <div className="flex items-center justify-center">
                                    <Button
                                        onClick={() => handleEdit(index)}
                                        variant="ghost"
                                        size="icon"
                                        className="w-8 h-8 p-0"
                                    >
                                        <Pen size="1.2rem" />
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(index)}
                                        variant="ghost"
                                        size="icon"
                                        className="w-8 h-8 p-0"
                                    >
                                        <Trash size="1.2rem" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
