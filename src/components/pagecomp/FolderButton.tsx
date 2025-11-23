import { useState } from "react";
import { useForm } from "react-hook-form";
import { EllipsisVertical, Folder, Pencil, Trash } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";

export default function FolderButton({
  id,
  title,
  color_icon,
  onDelete,
  onUpdated,
  onUpload, // ← NEW
}: {
  id: number;
  title: string;
  color_icon: string;
  onDelete?: (id: number) => void;
  onUpdated: () => void;
  onUpload?: (id: number, file: File) => Promise<void>; // ← NEW
}) {
    const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [dragging, setDragging] = useState(false); // ← NEW

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      title,
      color_icon,
    },
  });

  const selectedColor = watch("color_icon");

  async function onSubmit(values: any) {
    await onUpdated(id, values);
    setOpen(false);
  }

  return (
    <>
      {/* Folder Row */}
      <div
        className={`w-full flex items-center justify-between p-4 border rounded-md 
          hover:bg-accent cursor-pointer transition
          ${dragging ? "bg-blue-100 border-blue-500" : ""}`}
        
        // --- DRAG HANDLERS ---
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={async (e) => {
          e.preventDefault();
          setDragging(false);

          const file = e.dataTransfer.files?.[0];
          if (!file) return;
            e.preventDefault()
          if (onUpload) {
            await onUpload(id, file);
          }
        }}
        onClick={() => navigate(`/folders/${id}`)}
      >
        <div className="flex items-center gap-3 ml-4">
          <Folder color={color_icon} />
          <span>{title}</span>
        </div>

        {/* Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-accent"
              onClick={(e) => e.stopPropagation()} // prevent click from triggering drag highlight
            >
              <EllipsisVertical />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-32 p-1">
            <button
              onClick={(e) => {e.stopPropagation();setOpen(true)}}
              className="flex w-full items-center gap-2 px-2 py-1.5 hover:bg-accent rounded-md"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>

            <button
              onClick={() => onDelete?.(id)}
              className="flex w-full items-center gap-2 px-2 py-1.5 hover:bg-destructive/10 text-destructive rounded-md"
            >
              <Trash className="w-4 h-4" />
              Delete
            </button>
          </PopoverContent>
        </Popover>
      </div>

      {/* ===== EDIT DIALOG ===== */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Folder</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            {/* Folder Name */}
            <div className="grid gap-3">
              <Label>Folder Name</Label>
              <Input {...register("title")} />
            </div>

            {/* Color Selection */}
            <div className="grid gap-3">
              <Label>Color</Label>
              <div className="flex gap-3">
                {[
                  { name: "red", class: "bg-red-500" },
                  { name: "blue", class: "bg-blue-500" },
                  { name: "yellow", class: "bg-yellow-400" },
                  { name: "purple", class: "bg-purple-500" },
                  { name: "green", class: "bg-green-500" },
                ].map((c) => (
                  <label key={c.name} className="cursor-pointer">
                    <input
                      type="radio"
                      value={c.name}
                      {...register("color_icon")}
                      className="hidden peer"
                    />
                    <div
                      className={`w-8 h-8 rounded-full border-2 border-transparent ${
                        selectedColor === c.name ? "border-black" : ""
                      } ${c.class}`}
                    ></div>
                  </label>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
