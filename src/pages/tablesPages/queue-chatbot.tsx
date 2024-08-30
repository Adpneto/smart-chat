import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pen, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Select } from "@radix-ui/react-select";
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function QueueChatbot() {
    const { t } = useTranslation();

    const [data, setData] = useState([
        { name: "Cliente", queue: 2, color: "#4ade80", message: "dawdaw" },
        { name: "Interessado", queue: 3, color: "#60a5fa", message: "dawggaw" },
    ]);

    const [newItem, setNewItem] = useState({
        name: "",
        queue: "",
        color: "#e65656",
        message: "",
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Estado para armazenar as funções do chatbot
    const [functions, setFunctions] = useState<any[]>([]);

    const handleAddOrEdit = () => {
        if (!newItem.name || !newItem.color) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        if (editingIndex !== null) {
            const updatedData = [...data];
            updatedData[editingIndex] = {
                ...newItem,
                queue: Number(newItem.queue),
            };
            setData(updatedData);
        } else {
            setData([...data, { ...newItem, queue: Number(newItem.queue) }]);
        }

        setNewItem({ name: "", queue: "", color: "#000000", message: "" });
        setIsDialogOpen(false);
        setEditingIndex(null);
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        const itemToEdit = data[index];
        setNewItem({ ...itemToEdit, queue: String(itemToEdit.queue) });
        setIsDialogOpen(true);
    };

    const handleDelete = (index: number) => {
        setData(data.filter((_, i) => i !== index));
    };

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setNewItem((prevState) => ({
            ...prevState,
            [name]: type === "number" ? parseFloat(value) : value,
        }));
    };

    const connections = ["Conexão 1", "Conexão 2", "Conexão 3"];

    // Função para adicionar uma nova função
    const handleAddFunction = (parentIndex: number | null = null) => {
        const newFunction = {
            title: "",
            text: "",
            subfunctions: [],
        };

        if (parentIndex === null) {
            setFunctions([...functions, newFunction]);
        } else {
            const updatedFunctions = [...functions];
            let parentFunction = updatedFunctions[parentIndex];
            parentFunction.subfunctions.push(newFunction);
            setFunctions(updatedFunctions);
        }
    };

    // Função para editar o título ou texto da função
    const handleFunctionChange = (
        index: number,
        field: "title" | "text",
        value: string,
        parentIndex: number | null = null
    ) => {
        const updatedFunctions = [...functions];
        if (parentIndex === null) {
            updatedFunctions[index][field] = value;
        } else {
            updatedFunctions[parentIndex].subfunctions[index][field] = value;
        }
        setFunctions(updatedFunctions);
    };

    // Função recursiva para renderizar funções e subfunções
    const renderFunctions = (
        funcs: any[],
        parentIndex: number | null = null,
        level: number = 0
    ) => {
        return funcs.map((func, index) => (
            <div key={index} className={`mb-4 ${parentIndex !== null ? "pl-8 border-l" : ""}`} style={{ borderColor: parentIndex !== null ? "#c3c3c3" : "transparent", paddingLeft: level * 20 }}>
                <div className="flex flex-col gap-2 mb-2">
                    <Input
                        placeholder="Título da Função"
                        value={func.title}
                        onChange={(e) =>
                            handleFunctionChange(index, "title", e.target.value, parentIndex)
                        }
                    />
                    <Textarea
                        placeholder="Texto da Função"
                        value={func.text}
                        onChange={(e) =>
                            handleFunctionChange(index, "text", e.target.value, parentIndex)
                        }
                        className="w-full h-[60px]"
                    />
                    <Button
                        variant="outline"
                        onClick={() => handleAddFunction(parentIndex === null ? index : parentIndex)}
                    >
                        Adicionar Subfunção
                    </Button>
                </div>
                {func.subfunctions.length > 0 &&
                    renderFunctions(func.subfunctions, parentIndex === null ? index : parentIndex, level + 1)}
            </div>
        ));
    };

    return (
        <div className="mx-5 md:w-[1440px] shadow-xl p-5">
            <div className="flex flex-col space-y-2 md:flex-row justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{t("pages.tags.table_name")}</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <div className="flex gap-2">
                        <Input
                            className="w-[200px] p-3 h-10"
                            placeholder={t("pages.tags.search")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setIsDialogOpen(true)}
                            >
                                {t("pages.tags.add")}
                            </Button>
                        </DialogTrigger>
                    </div>

                    <DialogContent className="sidebar-scrollbar max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {editingIndex !== null
                                    ? t("pages.tags.modal.edit")
                                    : t("pages.tags.modal.add")}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    placeholder={t("pages.tags.modal.name")}
                                    value={newItem.name}
                                    onChange={(e) =>
                                        setNewItem({ ...newItem, name: e.target.value })
                                    }
                                />
                                <div>
                                    <input
                                        type="color"
                                        id="colorPicker"
                                        value={newItem.color}
                                        onChange={(e) =>
                                            setNewItem({ ...newItem, color: e.target.value })
                                        }
                                        className="h-full rounded-md border-none"
                                    />
                                </div>
                                <Input
                                    placeholder={t("pages.tags.modal.queue")}
                                    value={newItem.queue}
                                    onChange={(e) =>
                                        setNewItem({ ...newItem, queue: e.target.value })
                                    }
                                />
                            </div>
                            <Select
                                value={newItem.name}
                                onValueChange={(value) =>
                                    setNewItem((prevState) => ({ ...prevState, pTicket: value }))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue
                                        placeholder={t("pages.users.modal.conection.input")}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {connections.length > 0 ? (
                                        connections.map((connection) => (
                                            <SelectItem key={connection} value={connection}>
                                                {connection}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="">
                                            {t("pages.users.modal.conection.empty")}
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                            <Textarea
                                name="prompt"
                                placeholder={t("pages.prompts.modal.prompt")}
                                value={newItem.message}
                                onChange={handleInputChange}
                                className="w-full h-[100px]"
                            />
                            <Button onClick={handleAddOrEdit} variant="outline" className="w-full">
                                {editingIndex !== null
                                    ? t("pages.tags.modal.save")
                                    : t("pages.tags.modal.addNew")}
                            </Button>

                            {/* Adicionar Função no Chatbot */}
                            <div>
                                <h3 className="font-bold mt-4">Funções do Chatbot</h3>
                                <Button
                                    variant="outline"
                                    onClick={() => handleAddFunction()}
                                    className="mb-4"
                                >
                                    Adicionar Função
                                </Button>
                                {renderFunctions(functions)}
                            </div>

                            <Button onClick={handleAddOrEdit} variant="outline" className="w-full">
                                {editingIndex !== null ? t('pages.prompts.modal.save') : t('pages.prompts.modal.addNew')}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="table-auto border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">
                                {t("pages.tags.table.name")}
                            </TableHead>
                            <TableHead className="text-center">
                                {t("pages.tags.table.sector")}
                            </TableHead>
                            <TableHead className="text-center">
                                {t("pages.tags.table.isKanban")}
                            </TableHead>
                            <TableHead className="text-center">
                                {t("pages.tags.table.actions")}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <TableRow key={index} className="text-center">
                                    <TableCell>
                                        <div
                                            style={{
                                                backgroundColor: item.color,
                                                padding: "0.5rem 1rem",
                                                borderRadius: "9999px",
                                                display: "inline-block",
                                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)",
                                                color: "#fff",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {item.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.queue}</TableCell>
                                    <TableCell>{item.message ? "Yes" : "No"}</TableCell>
                                    <TableCell className="flex justify-center">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(index)}>
                                            <Pen />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(index)}>
                                            <Trash />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    {t("pages.tags.table.null")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
