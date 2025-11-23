import { Button } from "../ui/button"
import PDFIcon from "../../assets/PDFIcon.svg"
import DOCIcon from "../../assets/DocIcon.svg"
import PPTIcon from "../../assets/YoutubeIcon.svg"
import { MoreVertical } from "lucide-react"
import { useNavigate } from "react-router"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"



function ButtonList({ name, fileType, date, id }: { name?: string, fileType?: string, date?: string, id?: string }) {
  const nav = useNavigate()

  const [openRename, setOpenRename] = useState(false)
  const [newName, setNewName] = useState(name || "")
  const [openDelete, setOpenDelete] = useState(false)

  return (
    <div className="w-full">

      {/* Rename Dialog */}
      <Dialog open={openRename} onOpenChange={setOpenRename}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Rename File</DialogTitle>
          </DialogHeader>

          <Input 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)} 
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenRename(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log("Renaming", id, "to", newName)
                // TODO API rename
                setOpenRename(false)
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Alert Dialog */}
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this file.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                console.log("Delete confirmed:", id)
                // TODO: delete API
                setOpenDelete(false)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Button with dropdown */}
      <Button
        className="w-full h-auto flex items-center justify-between p-4"
        variant="outline"
        onClick={() => nav("/file/" + id)}
      >
        <div className="flex items-start gap-3 ml-4">
          {
            fileType === "pdf" ? (
              <img src={PDFIcon} alt="PDF Icon" className="w-8 h-8" />
            ) : fileType === "doc" ? (
              <img src={DOCIcon} alt="DOC Icon" className="w-8 h-8" />
            ) : (
              <img src={PPTIcon} alt="File Icon" className="w-8 h-8" />
            )
          }

          <div className="flex flex-col justify-center">
            <div className="font-medium text-sm">{name}</div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <button className="p-2 rounded-md hover:bg-muted">
              <MoreVertical className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                setOpenRename(true)
              }}
            >
              Rename
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                setOpenDelete(true)
              }}
            >
              Delete
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => window.open(`/public/${id}`, "_blank")}>
              Open Public
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Button>
    </div>
  )
}



export default ButtonList
