import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pen, Trash } from "lucide-react"
import { useTranslation } from 'react-i18next'
import { toast } from "@/components/ui/use-toast"

export default function Tags() {

    const { t } = useTranslation()

    const [data, setData] = useState([
        { name: "Cliente", inUse: 2, color: "#4ade80", isKanban: true },
        { name: "Interessado", inUse: 3, color: "#60a5fa", isKanban: false },
    ])

    const [newItem, setNewItem] = useState({ name: "", inUse: "", color: "#000000", isKanban: false })
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    const handleAddOrEdit = () => {
        if (!newItem.name || !newItem.color) {
            toast({ variant: "destructive", description: t('pages.toasts.notRequirements') })
            return
        }

        if (editingIndex !== null) {
            const updatedData = [...data]
            updatedData[editingIndex] = { ...newItem, inUse: Number(newItem.inUse) }
            setData(updatedData)
            toast({ description: t('pages.toasts.attSuccess') })
        } else {
            setData([...data, { ...newItem, inUse: Number(newItem.inUse) }])
            toast({ description: t('pages.toasts.addSuccess') })
        }
        setNewItem({ name: "", inUse: "", color: "#000000", isKanban: false })
        setIsDialogOpen(false)
        setEditingIndex(null)
    }

    const handleEdit = (index: number) => {
        setEditingIndex(index)
        const itemToEdit = data[index]
        setNewItem({ ...itemToEdit, inUse: String(itemToEdit.inUse) })
        setIsDialogOpen(true)
    }

    const handleDelete = (index: number) => {
        setData(data.filter((_, i) => i !== index))
        toast({ description: t('pages.toasts.deleteSuccess') })
    }

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="md:w-[1440px] shadow-xl p-5 w-full">
            <div className="flex flex-col space-y-2 md:flex-row justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{t('pages.tags.table_name')}</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <div className="flex gap-2">
                        <Input
                            className="w-[200px] p-3 h-10"
                            placeholder={t('pages.tags.search')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <DialogTrigger asChild>
                            <Button variant="outline" size="lg" onClick={() => setIsDialogOpen(true)}>
                                {t('pages.tags.add')}
                            </Button>
                        </DialogTrigger>
                    </div>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingIndex !== null ? t('pages.tags.modal.edit') : t('pages.tags.modal.add')}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input
                                placeholder={t('pages.tags.modal.name')}
                                value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                            />
                            <div>
                                <label htmlFor="colorPicker">{t('pages.tags.modal.selectColor')}</label>
                                <input
                                    type="color"
                                    id="colorPicker"
                                    value={newItem.color}
                                    onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                                    className="ml-2"
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isKanban"
                                    checked={newItem.isKanban}
                                    onChange={(e) => setNewItem({ ...newItem, isKanban: e.target.checked })}
                                    className="mr-2"
                                />
                                <label htmlFor="isKanban">{t('pages.tags.modal.isKanban')}</label>
                            </div>

                            <Button onClick={handleAddOrEdit} variant="outline" className="w-full">
                                {editingIndex !== null ? t('pages.tags.modal.save') : t('pages.tags.modal.addNew')}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="table-auto border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">{t('pages.tags.table.name')}</TableHead>
                            <TableHead className="text-center">{t('pages.tags.table.sector')}</TableHead>
                            <TableHead className="text-center">{t('pages.tags.table.isKanban')}</TableHead>
                            <TableHead className="text-center">{t('pages.tags.table.actions')}</TableHead>
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
                                                fontWeight: "bold"
                                            }}
                                        >
                                            {item.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.inUse}</TableCell>
                                    <TableCell>{item.isKanban ? 'Yes' : 'No'}</TableCell>
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
                                    {t('pages.tags.table.null')}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}