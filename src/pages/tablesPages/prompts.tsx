import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Importando o Textarea do ShadCN UI
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Importando o Select do ShadCN UI
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pen, Trash } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface DataItem {
    name: string;
    apiKey: string;
    prompt: string;
    option: string;
    botTemperature: number;
    maxTokens: number;
    maxMessages: number;
}

export default function TokenTable() {
    const { t } = useTranslation();

    const [data, setData] = useState<DataItem[]>([
        {
            name: "Antonio Jhow", apiKey: "sk-demo-1234567890abcdef1234567890abcdef", prompt: "Escreva uma introdução de 300 palavras sobre a importância da inteligência artificial na medicina moderna. Inclua exemplos de como a IA está sendo usada para melhorar o diagnóstico e o tratamento de pacientes."
            , option: "Texto", botTemperature: 0.7, maxTokens: 100, maxMessages: 10
        },
        {
            name: "Thiago Turco", apiKey: "sk-demo-abcdef1234567890abcdef1234567890", prompt: "Explique o conceito de buracos negros em um nível que possa ser entendido por um estudante do ensino médio. Inclua uma analogia para ajudar a ilustrar o que acontece quando algo é sugado por um buraco negro."
            , option: "Texto", botTemperature: 0.7, maxTokens: 150, maxMessages: 15
        },
    ]);

    const [newItem, setNewItem] = useState<DataItem>({
        name: "",
        apiKey: "",
        prompt: "",
        option: "Texto",
        botTemperature: 0.7,
        maxTokens: 0,
        maxMessages: 10
    });

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleAddOrEdit = () => {
        if (!newItem.name || !newItem.apiKey || !newItem.prompt || newItem.maxTokens === 0 || newItem.maxMessages === 0) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        if (editingIndex !== null) {
            const updatedData = [...data];
            updatedData[editingIndex] = { ...newItem };
            setData(updatedData);
        } else {
            setData([...data, { ...newItem }]);
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
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setNewItem(prevState => ({
            ...prevState,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    const resetForm = () => {
        setNewItem({ name: "", apiKey: "", prompt: "", option: "Texto", botTemperature: 0.7, maxTokens: 0, maxMessages: 10 });
        setIsDialogOpen(false);
        setEditingIndex(null);
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const truncate = (Text: string, maxLength: number) => {
        if (Text.length > maxLength) {
            return Text.substring(0, maxLength) + '...'
        }
        return Text;
    }

    return (
        <div className="mx-5 md:w-[1440px] p-5">
            <div className="flex flex-col space-y-2 md:flex-row justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{t('pages.prompts.table_name')}</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <div className="flex gap-2">
                        <Input
                            className="w-[200px] p-3 h-10"
                            placeholder={t('pages.prompts.search')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <DialogTrigger asChild>
                            <Button variant="outline" size="lg" onClick={() => setIsDialogOpen(true)}>
                                {t('pages.prompts.add')}
                            </Button>
                        </DialogTrigger>
                    </div>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingIndex !== null ? t('pages.prompts.modal.edit') : t('pages.prompts.modal.add')}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input
                                name="name"
                                placeholder={t('pages.prompts.modal.name')}
                                value={newItem.name}
                                onChange={handleInputChange}
                            />
                            <Input
                                name="apiKey"
                                placeholder={t('pages.prompts.modal.apiKey')}
                                value={newItem.apiKey}
                                onChange={handleInputChange}
                            />
                            <Textarea
                                name="prompt"
                                placeholder={t('pages.prompts.modal.prompt')}
                                value={newItem.prompt}
                                onChange={handleInputChange}
                                className="w-full h-[100px]"
                            />
                            <Select
                                value={newItem.option}
                                onValueChange={(value) => setNewItem(prevState => ({ ...prevState, option: value }))}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t('pages.prompts.modal.option')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Texto">Texto</SelectItem>
                                </SelectContent>
                            </Select>
                            <div>
                                <label>{t('pages.prompts.modal.botTemperature')}</label>
                                <Input
                                    type="number"
                                    name="botTemperature"
                                    step="0.1"
                                    min="0"
                                    max="1"
                                    value={newItem.botTemperature}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>{t('pages.prompts.modal.maxTokens')}</label>
                                <Input
                                    type="number"
                                    name="maxTokens"
                                    placeholder={t('pages.prompts.modal.maxTokens')}
                                    value={newItem.maxTokens}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>{t('pages.prompts.modal.maxMessages')}</label>
                                <Input
                                    type="number"
                                    name="maxMessages"
                                    placeholder={t('pages.prompts.modal.maxMessages')}
                                    value={newItem.maxMessages}
                                    onChange={handleInputChange}
                                />
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
                            <TableHead className="text-center">{t('pages.prompts.table.name')}</TableHead>
                            <TableHead className="text-center">{t('pages.prompts.table.apiKey')}</TableHead>
                            <TableHead className="text-center">{t('pages.prompts.table.prompt')}</TableHead>
                            <TableHead className="text-center">{t('pages.prompts.table.max')}</TableHead>
                            <TableHead className="text-center">{t('pages.prompts.table.actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{truncate(item.apiKey, 10)}</TableCell>
                                    <TableCell className="hidden lg:inline">{truncate(item.prompt, 100)}</TableCell>
                                    <TableCell className="lg:hidden">{truncate(item.prompt, 20)}</TableCell>
                                    <TableCell className="text-center">{item.maxTokens}</TableCell>
                                    <TableCell className="flex items-center justify-center">
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
                                <TableCell colSpan={5} className="text-center">
                                    {t('pages.prompts.table.null')}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}