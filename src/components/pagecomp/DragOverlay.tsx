import { useEffect, useState } from "react";
import { Card } from "../ui/card";

export default function DragOverlay({ onDrop }: any) {
  const [visible, setVisible] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  useEffect(() => {
    function handleDragEnter(e: DragEvent) {
      e.preventDefault();
      setDragCounter((c) => {
        const next = c + 1;
        if (next === 1) setVisible(true); 
        return next;
      });
    }

    function handleDragOver(e: DragEvent) {
      e.preventDefault();
    }

    function handleDragLeave(e: DragEvent) {
      e.preventDefault();
      setDragCounter((c) => {
        const next = c - 1;
        if (next === 0) setVisible(false);
        return next;
      });
    }

    function handleDrop(e: DragEvent) {
      e.preventDefault();
      setDragCounter(0);
      setVisible(false);

      const file = e.dataTransfer?.files?.[0];
      if (file) onDrop?.(file);
    }

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, [onDrop]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90">
      <Card className="border-4 border-dashed border-white rounded-3xl w-[60%] h-[40%] flex items-center justify-center text-white text-2xl font-semibold">
        Drop files here
      </Card>
    </div>
  );
}
