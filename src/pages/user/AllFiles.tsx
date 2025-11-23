import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Play, Upload } from "lucide-react";
import ButtonList from "@/components/pagecomp/ButtonList";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import { getFolder } from "@/api/folder-api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { uploadFileToFolder, uploadYoutubeLinkToFolder } from "@/api/material-upload";
import DragOverlay from "@/components/pagecomp/DragOverlay";
import { toast } from "sonner";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { IconFolderCode } from "@tabler/icons-react"
import { ArrowUpRightIcon } from "lucide-react"

function AllFiles() {
  const { folder_id } = useParams<{ folder_id: string }>();
  const [folder, setFolder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openUpload, setOpenUpload] = useState(false);
const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [fileTitle, setFileTitle] = useState("");
const [openYoutube, setOpenYoutube] = useState(false);
const [youtubeUrl, setYoutubeUrl] = useState("");
const [youtubeTitle, setYoutubeTitle] = useState("");
    async function load() {
      try {
        const data = await getFolder(folder_id);
        setFolder(data); // contains title, materials, etc.
      } finally {
        setLoading(false);
      }
    }
  async function handleDrop(file: File) {
    console.log("Dropped file:", file);

    await uploadFileToFolder(folder_id, file);
    toast ("File uploaded");
    load()
  }


  // Load folder materials
  useEffect(() => {

    load();
  }, [folder_id]);

  if (loading) return <p>Loading...</p>;
  if (!folder) return (
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
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
    </div>
  );

  return (
    <div className="h-full">
      {/* Search bar */}
            <DragOverlay onDrop={handleDrop} />
      <div className="relative mb-10">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search..." className="pl-9" />
      </div>

      {/* LIST FILES */}
      <div className="flex flex-col gap-4">
        {folder?.data?.materials && folder?.data?.materials?.length > 0 ? (
          folder?.data?.materials?.map((file: any) => (
            <ButtonList
              key={file.id}
              id={file.id}
              name={file.title}
              fileType={file.source_type}
              date={"Unknown"}
            />
          ))
        ) : (
          <div>
             <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>No Files Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t uploadded any files yet. Get started by dropping
          your files here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
        </div>
      </EmptyContent>
    </Empty>
          </div>
        )}
      </div>

      {/* Floating add button */}
<Popover>
  <PopoverTrigger asChild>
    <Button
      className="w-10 h-10 fixed bottom-10 right-10 rounded-full shadow-lg"
      variant="default"
    >
      <Plus />
    </Button>
  </PopoverTrigger>

  <PopoverContent className="w-48 p-2">
    {/* ADD YOUTUBE LINK */}
        <button
      className="flex items-center w-full gap-2 px-2 py-2 hover:bg-accent rounded-md"
      onClick={() => setOpenYoutube(true)}
    >
      <Play className="w-4 h-4" />
      Add YouTube Link
    </button>

    {/* UPLOAD FILE */}
    <button
      className="flex items-center w-full gap-2 px-2 py-2 hover:bg-accent rounded-md"
      onClick={() => setOpenUpload(true)}
    >
      <Upload className="w-4 h-4" />
      Upload File
    </button>
  </PopoverContent>
</Popover>

{/* ===== Upload File Dialog ===== */}
<Dialog open={openUpload} onOpenChange={setOpenUpload}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Upload File</DialogTitle>
    </DialogHeader>

    <div className="grid gap-4">
      {/* File Input */}
      <div className="grid gap-2">
        <label className="text-sm font-medium">Choose File</label>
        <Input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setSelectedFile(file || null);
            if (file) setFileTitle(file.name);
          }}
        />
      </div>

      {/* File Title */}
      <div className="grid gap-2">
        <label className="text-sm font-medium">File Title</label>
        <Input
          value={fileTitle}
          onChange={(e) => setFileTitle(e.target.value)}
          placeholder="Enter file title..."
        />
      </div>
    </div>

    <DialogFooter>
      <Button variant="outline" onClick={() => setOpenUpload(false)}>
        Cancel
      </Button>

      <Button
        onClick={async () => {
          if (!selectedFile) return alert("Choose a file first!");
          if (!fileTitle) return alert("Title cannot be empty!");

          // Call your upload API
          await uploadFileToFolder(folder_id, selectedFile, fileTitle);

          setOpenUpload(false);
          setSelectedFile(null);
          setFileTitle("");
        }}
      >
        Upload
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
{/* ===== YOUTUBE LINK DIALOG ===== */}
<Dialog open={openYoutube} onOpenChange={setOpenYoutube}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add YouTube Material</DialogTitle>
    </DialogHeader>

    <div className="grid gap-4">
      {/* YouTube URL */}
      <div className="grid gap-2">
        <label className="text-sm font-medium">YouTube Link</label>
        <Input
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </div>

      {/* Title */}
      <div className="grid gap-2">
        <label className="text-sm font-medium">Title</label>
        <Input
          value={youtubeTitle}
          onChange={(e) => setYoutubeTitle(e.target.value)}
          placeholder="Enter video title..."
        />
      </div>
    </div>

    <DialogFooter>
      <Button variant="outline" onClick={() => setOpenYoutube(false)}>
        Cancel
      </Button>

      <Button
        onClick={async () => {
          if (!youtubeUrl) return alert("YouTube link cannot be empty!");
          if (!youtubeTitle) return alert("Title cannot be empty!");

          // validate YouTube link
          const isYoutube = youtubeUrl.includes("youtube.com") || youtubeUrl.includes("youtu.be");
          if (!isYoutube) return alert("Invalid YouTube URL!");

          await uploadYoutubeLinkToFolder(folder_id!, youtubeUrl,youtubeTitle);

          setOpenYoutube(false);
          setYoutubeUrl("");
          setYoutubeTitle("");
        }}
      >
        Add
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </div>
  );
}

export default AllFiles;
