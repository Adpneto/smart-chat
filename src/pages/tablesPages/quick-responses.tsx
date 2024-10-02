import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pen, Trash, Copy } from "lucide-react"
import { useTranslation } from "react-i18next"
import { toast } from "@/components/ui/use-toast"

interface QuickResponseItem {
  name: string;
  message: string;
  files: File[];
}

export default function QuickResponses() {
  const { t } = useTranslation()

  const [data, setData] = useState<QuickResponseItem[]>([
    { name: "Saudações", message: "Olá {name}, como posso ajudar?", files: [] },
    { name: "Verificar", message: "Oi {name}, vou verificar isso para você.", files: [] },
  ])

  const [newItem, setNewItem] = useState<QuickResponseItem>({ name: "", message: "", files: [] })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [duplicatingIndex, setDuplicatingIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleAddOrEdit = () => {
    if (!newItem.name || !newItem.message) {
      toast({ variant: "destructive", description: t('pages.toasts.notRequirements') })
      return
    }

    if (editingIndex !== null) {
      const updatedData = [...data]
      updatedData[editingIndex] = { ...newItem }
      setData(updatedData)
      toast({ description: t('pages.toasts.attSuccess') })
    } else {
      setData([...data, { ...newItem }])
      toast({ description: t('pages.toasts.addSuccess') })
    }
    resetForm()
  }

  const resetForm = () => {
    setNewItem({ name: "", message: "", files: [] })
    setIsDialogOpen(false)
    setEditingIndex(null)
    setDuplicatingIndex(null)
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setNewItem(data[index])
    setIsDialogOpen(true)
  }

  const handleDuplicate = (index: number) => {
    setDuplicatingIndex(index)
    setNewItem({ ...data[index], name: `${data[index].name} (Copy)` })
    setIsDialogOpen(true)
  }

  const handleDelete = (index: number) => {
    setData(data.filter((_, i) => i !== index))
    toast({ description: t('pages.toasts.deleteSuccess') })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewItem({ ...newItem, files: [...newItem.files, ...Array.from(e.target.files)] })
    }
  }

  const handleRemoveFile = (fileIndex: number) => {
    setNewItem((prevItem) => ({
      ...prevItem,
      files: prevItem.files.filter((_, index) => index !== fileIndex),
    }))
  }

  const handleVariableInsert = (variable: string) => {
    setNewItem({ ...newItem, message: newItem.message + variable })
  }

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const truncateFileName = (fileName: string, maxLength: number) => {
    if (fileName.length > maxLength) {
      return fileName.substring(0, maxLength) + "..."
    }
    return fileName
  }

  return (
    <div className="md:w-[1440px] shadow-xl p-5 w-full">
      <div className="flex flex-col space-y-2 md:flex-row justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{t("pages.quickresponses.table_name")}</h2>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(isOpen) => {
            setIsDialogOpen(isOpen)
            if (!isOpen) resetForm()
          }}
        >
          <div className="flex gap-2">
            <Input
              className="w-[200px] p-3 h-10"
              placeholder={t("pages.quickresponses.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setEditingIndex(null)
                  setDuplicatingIndex(null)
                  setIsDialogOpen(true)
                }}
              >
                {t("pages.quickresponses.add")}
              </Button>
            </DialogTrigger>
          </div>

          <DialogContent className="w-full max-w-xs md:max-w-lg p-4 overflow-y-auto overflow-x-hidden">
            <DialogHeader>
              <DialogTitle>
                {editingIndex !== null
                  ? t("pages.quickresponses.modal.edit")
                  : duplicatingIndex !== null
                  ? t("pages.quickresponses.modal.add")
                  : t("pages.quickresponses.modal.add")}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                className="w-full"
                placeholder={t("pages.quickresponses.modal.name")}
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
              <Textarea
                className="w-full"
                placeholder={t("pages.quickresponses.modal.message")}
                value={newItem.message}
                onChange={(e) => setNewItem({ ...newItem, message: e.target.value })}
              />
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => handleVariableInsert("{{name}}")} variant="outline">
                  {t("pages.quickresponses.modal.insertName")}
                </Button>
                <Button onClick={() => handleVariableInsert("{{firstName}}")} variant="outline">
                  {t("pages.quickresponses.modal.insertFirstName")}
                </Button>
                <Button onClick={() => handleVariableInsert("{{hour}}")} variant="outline">
                  {t("pages.quickresponses.modal.insertHour")}
                </Button>
                <Button onClick={() => handleVariableInsert("{{protocol}}")} variant="outline">
                  {t("pages.quickresponses.modal.insertProtocol")}
                </Button>
                
                <Button onClick={() => handleVariableInsert("{{ms}}")} variant="outline">
                  {t("pages.quickresponses.modal.insertMS")}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {newItem.files.map((file, idx) => (
                  <div key={idx} className="flex items-center space-x-2 border p-2 rounded">
                    <span>{truncateFileName(file.name, 20)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFile(idx)}
                    >
                      <Trash size={18} />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center w-full gap-2">
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button
                  className="w-[50%]"
                  variant="outline"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  {t("pages.quickresponses.modal.addFile")}
                </Button>
                <Button onClick={handleAddOrEdit} variant="outline" className="w-[50%]">
                  {editingIndex !== null
                    ? t("pages.quickresponses.modal.save")
                    : duplicatingIndex !== null
                    ? t("pages.quickresponses.modal.addNew")
                    : t("pages.quickresponses.modal.addNew")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="table-auto border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">{t("pages.quickresponses.table.name")}</TableHead>
              <TableHead>{t("pages.quickresponses.table.message")}</TableHead>
              <TableHead>{t("pages.quickresponses.table.file")}</TableHead>
              <TableHead className="text-center">{t("pages.quickresponses.table.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{item.name}</TableCell>
                  <TableCell className="whitespace-normal break-words">{item.message}</TableCell>
                  <TableCell>
                    {item.files.length > 0 ? item.files.map((file, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <span>{truncateFileName(file.name, 20)}</span>
                      </div>
                    )) : t("pages.quickresponses.table.noFile")}
                  </TableCell>
                  <TableCell className="flex items-center justify-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(index)}>
                      <Pen />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(index)}>
                      <Trash />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDuplicate(index)}>
                      <Copy />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  {t("pages.quickresponses.table.null")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
