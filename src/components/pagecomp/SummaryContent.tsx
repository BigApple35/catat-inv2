import { useEffect, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { getMaterialSummary } from "@/api/ai-api";
import ReactMarkdown from "react-markdown";

export default function SummaryReader({ materialId }: { materialId: number }) {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await getMaterialSummary(materialId); 
        setSummary(res?.data?.summary || "");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [materialId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
      </div>
    );

  if (!summary)
    return (
      <p className="text-center text-muted-foreground">
        No summary available.
      </p>
    );

  return (
    <div className="w-full h-full p-6">
      <div className=" rounded-xl shadow-sm p-6  prose prose-neutral dark:prose-invert">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="font-semibold text-xl">AI Summary</h2>
        </div>

        {/* Summary (markdown rendered) */}
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-2xl font-bold mt-8 mb-3 border-b pb-1" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-xl font-semibold mt-6 mb-2" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-lg font-semibold mt-4 mb-2" {...props} />
            ),
            p: ({ node, ...props }) => <p className="leading-relaxed mb-4" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc ml-6 mb-4" {...props} />,
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          }}
        >
          {summary}
        </ReactMarkdown>
      </div>
    </div>
  );
}
