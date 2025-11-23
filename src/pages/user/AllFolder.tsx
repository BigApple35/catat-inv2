import { useEffect, useState } from "react";
import { getFolders, createFolder } from "@/api/folder-api";

import FolderButton from "@/components/pagecomp/FolderButton";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { ArrowRightIcon, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { uploadFileToFolder } from "@/api/material-upload";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { IconFolderCode } from "@tabler/icons-react";

function AllFolder() {
  const [folders, setFolders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Add Folder form state ---
  const [folderName, setFolderName] = useState("New Folder");
  const [folderColor, setFolderColor] = useState("yellow");

  // Fetch folders
  const loadFolders = async () => {
    setLoading(true);
    const response = await getFolders();
    if (response?.data) {
        console.log("Fetched folders:", response.data);
      setFolders(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFolders();
  }, []);

  // Add folder
  const handleAddFolder = async () => {
    const payload = {
      title: folderName,
      color_icon: folderColor,
    };

    const response = await createFolder(payload);

    if (response?.data) {
      toast("Folder created!");
      loadFolders(); // refresh
    }
  };

  if(!folders){
    <div>
      <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating
          your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Learn More <ArrowRightIcon />
        </a>
      </Button>
    </Empty>
    </div>
  }

  return (
    <div className="h-full">
      <div className="relative mb-10">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search..." className="pl-9" />
      </div>

      {/* Folder list */}
      <div className="flex flex-col gap-4">
        {loading && <p>Loading...</p>}

        {!loading &&
          folders.map(folder => (
        <FolderButton 
            key={folder.id}
            id={folder.id}
            title={folder.title}
            color_icon={folder.colorIcon}
            onUpdated={loadFolders}
            onDelete={async (id: number) => {
              await loadFolders();
            }}
            onUpload={async (folderId, file) => {
                await uploadFileToFolder(folderId, file);
                toast("Uploaded!");
                loadFolders();
            }}
        />
        ))}
      </div>

      

      {/* Add Folder Button + Dialog */}
      <Dialog>
        <DialogTrigger>
          <Button className="w-10 h-10 absolute bottom-10 right-10">
            <Plus />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Folder</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Folder Name</Label>
              <Input
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </div>

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
                      name="color"
                      value={c.name}
                      className="hidden peer"
                      onChange={() => setFolderColor(c.name)}
                      defaultChecked={c.name === "yellow"}
                    />
                    <div
                      className={`w-8 h-8 rounded-full border-2 border-transparent peer-checked:border-black ${c.class}`}
                    ></div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button onClick={handleAddFolder}>Add folder</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AllFolder;
