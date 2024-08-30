import { useState, ChangeEvent } from "react";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pen, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";

interface DataItem {
    id: number;
    name: string;
    password: string;
    mail: string;
    type: string;
    queue: string;
    pTicket: string;
}

export default function Users() {
    const { t } = useTranslation();

    const [data, setData] = useState<DataItem[]>([
        {
            id: 1,
            name: "Antonio Jhow",
            password: "Senha123#",
            mail: "admin@admin.com",
            type: "Admin",
            queue: "ZapZap",
            pTicket: "",
        },
    ]);
    // Função para obter o próximo ID disponível
    const getNextId = (data: DataItem[]) => {
        const ids = data.map(item => item.id);
        return ids.length > 0 ? Math.max(...ids) + 1 : 1;
    };

    const [newItem, setNewItem] = useState<DataItem>({
        id: getNextId(data), // Utiliza o próximo ID disponível ao iniciar
        name: "",
        password: "",
        mail: "",
        type: "",
        queue: "",
        pTicket: "",
    });

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState({
        name: false,
        password: false,
        mail: false,
        type: false,
        queue: false,
    });



    const handleAddOrEdit = () => {
        const errors = {
            name: !newItem.name,
            password: !newItem.password,
            mail: !newItem.mail,
            type: !newItem.type,
            queue: !newItem.queue,
        };

        setValidationErrors(errors);

        if (Object.values(errors).some((error) => error)) {
            toast({ variant: "destructive", description: "Por favor, preencha todos os campos." })
            return;
        }

        if (editingIndex !== null) {
            const updatedData = [...data];
            updatedData[editingIndex] = { ...newItem };
            setData(updatedData);
            toast({ description: "Usuário atualizado com sucesso!" });
        } else {
            setData([...data, { ...newItem, id: getNextId(data) }]); // Usa o próximo ID disponível ao adicionar
            toast({ description: "Usuário adicionado com sucesso!" });
        }

        resetForm();
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        setNewItem(data[index]);
        setIsDialogOpen(true);
    };

    const handleDelete = (index: number) => {
        setData(data.filter((_, i) => i !== index));
        toast({ description: "Usuário removido com sucesso!" });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setNewItem((prevState) => ({
            ...prevState,
            [name]: type === "number" ? parseFloat(value) : value,
        }));
    };

    const resetForm = () => {
        setNewItem({
            id: getNextId(data), // Reseta o ID para o próximo disponível
            name: "",
            password: "",
            mail: "",
            type: "",
            queue: "",
            pTicket: "",
        });
        setValidationErrors({
            name: false,
            password: false,
            mail: false,
            type: false,
            queue: false,
        });
        setIsDialogOpen(false);
        setEditingIndex(null);
    };

    const filteredData = data.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.mail.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Lista para os Selects
    const types = ["Admin", "User"];
    const queues = ["Fila 1", "Fila 2", "Fila 3"];
    const connections = ["Conexão 1", "Conexão 2", "Conexão 3"];

    return (
        <div className="mx-5 md:w-[1440px] p-5">
            <div className="flex flex-col space-y-2 md:flex-row justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{t("pages.users.table_name")}</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <div className="flex gap-2">
                        <Input
                            className="w-[200px] p-3 h-10"
                            placeholder={t("pages.users.search")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <DialogTrigger asChild>
                            <Button variant="outline" size="lg" onClick={() => setIsDialogOpen(true)}>
                                {t("pages.users.add")}
                            </Button>
                        </DialogTrigger>
                    </div>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editingIndex !== null
                                    ? t("pages.users.modal.edit")
                                    : t("pages.users.modal.add")}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    name="name"
                                    placeholder={t("pages.users.modal.name")}
                                    value={newItem.name}
                                    onChange={handleInputChange}
                                    className={validationErrors.name ? "border-red-500" : ""}
                                />
                                <Input
                                    name="password"
                                    placeholder={t("pages.users.modal.password")}
                                    value={newItem.password}
                                    onChange={handleInputChange}
                                    className={validationErrors.password ? "border-red-500" : ""}
                                />
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    name="mail"
                                    placeholder={t("pages.users.modal.mail")}
                                    value={newItem.mail}
                                    onChange={handleInputChange}
                                    className={validationErrors.mail ? "border-red-500" : ""}
                                />
                                <Select
                                    value={newItem.type}
                                    onValueChange={(value) =>
                                        setNewItem((prevState) => ({ ...prevState, type: value }))
                                    }
                                >
                                    <SelectTrigger className={`w-60 ${validationErrors.type ? "border-red-500" : ""}`}>
                                        <SelectValue placeholder={t("pages.users.modal.typeUser.input")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {types.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Select
                                value={newItem.queue}
                                onValueChange={(value) =>
                                    setNewItem((prevState) => ({ ...prevState, queue: value }))
                                }
                            >
                                <SelectTrigger className={`w-full ${validationErrors.queue ? "border-red-500" : ""}`}>
                                    <SelectValue placeholder={t("pages.users.modal.queue.input")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {queues.length > 0 ? (
                                        queues.map((queue) => (
                                            <SelectItem key={queue} value={queue}>
                                                {queue}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="">{t("pages.users.modal.queue.empty")}</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                            <Select
                                value={newItem.pTicket}
                                onValueChange={(value) =>
                                    setNewItem((prevState) => ({ ...prevState, pTicket: value }))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t("pages.users.modal.conection.input")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {connections.length > 0 ? (
                                        connections.map((connection) => (
                                            <SelectItem key={connection} value={connection}>
                                                {connection}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="">{t("pages.users.modal.conection.empty")}</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                            <Button type="submit" onClick={handleAddOrEdit}>
                                {editingIndex !== null
                                    ? t("pages.users.modal.save")
                                    : t("pages.users.modal.add")}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">{t("pages.users.table.id")}</TableHead>
                        <TableHead className="text-center">{t("pages.users.table.name")}</TableHead>
                        <TableHead className="text-center">{t("pages.users.table.mail")}</TableHead>
                        <TableHead className="text-center">{t("pages.users.table.permission")}</TableHead>
                        <TableHead className="text-center">{t("pages.users.table.queue")}</TableHead>
                        <TableHead className="text-center">{t("pages.users.table.actions")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="text-center">{item.id}</TableCell>
                            <TableCell className="text-center">{item.name}</TableCell>
                            <TableCell className="text-center">{item.mail}</TableCell>
                            <TableCell className="text-center">{item.type}</TableCell>
                            <TableCell className="text-center">{item.queue}</TableCell>
                            <TableCell className="flex justify-center items-center">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEdit(index)}
                                >
                                    <Pen className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(index)}
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
