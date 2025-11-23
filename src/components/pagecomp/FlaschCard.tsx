import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { generateFlashcards } from "@/api/ai-api";

type FlashCardData = {
  id: string | number;
  question: string;
  answer: string;
};

type FlashCardsProps = {
  materialId?: number; // material_id
  className?: string;
};

export default function FlashCard({ materialId, className = "" }: FlashCardsProps) {
  const [flashcards, setFlashcards] = useState<FlashCardData[]>([]);
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Load Flashcards from API
  // -----------------------------
  useEffect(() => {
    if (!materialId) return;

    const loadFlashcards = async () => {
      try {
        setLoading(true);

        const res = await generateFlashcards(materialId);
const mapped = res.map((fc, idx) => ({
  id: idx,
  question: fc.front,
  answer: fc.back,
}));
        setFlashcards(mapped);
      } catch (err) {
        console.error("Failed fetching flashcards:", err);
        setFlashcards([]);
      } finally {
        setLoading(false);
      }
    };

    loadFlashcards();
  }, [materialId]);

  // -----------------------------
  // Loading state
  // -----------------------------


  // -----------------------------
  // If no flashcards → fallback data
  // -----------------------------
  const defaultCards: FlashCardData[] = [
    {
      id: 1,
      question: "What is React?",
      answer: "A JavaScript library for building UIs.",
    },
    {
      id: 2,
      question: "What is a hook?",
      answer: "A function that lets you access React features.",
    },
    {
      id: 3,
      question: "What is JSX?",
      answer: "A syntax extension that looks like HTML.",
    },
    {
      id: 4,
      question: "What is a component?",
      answer: "A reusable piece of UI in React.",
    },
  ];

const list = flashcards.length > 0 ? flashcards : defaultCards;

  const len = list.length;

  // -----------------------------
  // Slider states
  // -----------------------------
  const [index, setIndex] = useState(0);
  const [flippedMap, setFlippedMap] = useState<
    Record<string | number, boolean>
  >({});

  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  // -----------------------------
  // Navigation handlers
  // -----------------------------
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + len) % len);
  }, [len]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % len);
  }, [len]);

  const goTo = useCallback(
    (i: number) => {
      setIndex(i % len);
    },
    [len]
  );

  const toggleFlip = useCallback((key: string | number) => {
    setFlippedMap((s) => ({ ...s, [key]: !s[key] }));
  }, []);

  // -----------------------------
  // Keyboard navigation
  // -----------------------------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // -----------------------------
  // Basic swipe
  // -----------------------------
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;

    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      dx > 0 ? prev() : next();
    }

    touchStartX.current = null;
  };

  const current = list[index];
  const currentKey = current.id ?? index;
  const flipped = Boolean(flippedMap[currentKey]);

  // -----------------------------
  // Render
  // -----------------------------
    if (loading) {
    return <div className="p-4">Loading flashcards...</div>;
  }
  return (
    <div className={`w-full flex items-center justify-center p-6 ${className}`}>
      <div className="max-w-[900px] w-full">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={prev}>
            <ChevronLeft />
          </Button>

          <div
            ref={containerRef}
            className="relative flex-1"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="relative mx-auto"
              style={{ width: "min(90vw, 720px)", height: "min(60vh, 420px)" }}
            >
              <div
                className="absolute inset-0 transition-all duration-400 ease-out"
                key={currentKey}
              >
                <FlashCardItem
                  question={current.question}
                  answer={current.answer}
                  flipped={flipped}
                  onToggle={() => toggleFlip(currentKey)}
                />
              </div>
            </div>

            {/* dots */}
            <div className="flex justify-center gap-2 mt-4">
              {list.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 w-8 rounded-full transition-all ${
                    i === index ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>

          <Button variant="ghost" size="icon" onClick={next}>
            <ChevronRight />
          </Button>
        </div>

        {/* index display */}
        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
          Card {index + 1} / {len}
        </div>
      </div>

      {/* flip CSS */}
      <style>{`
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}

function FlashCardItem({
  question,
  answer,
  flipped,
  onToggle,
}: {
  question: string;
  answer: string;
  flipped: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative h-full" style={{ perspective: 1200 }}>
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* front */}
        <Card className="absolute inset-0 backface-hidden flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">Flashcard</CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex items-center justify-center px-6 text-center">
            <div>
              <div className="text-sm text-muted-foreground">Question</div>
              <div className="text-lg md:text-2xl font-semibold">{question}</div>
            </div>
          </CardContent>

          <div className="p-4 flex justify-end">
            <Button size="sm" variant="ghost" onClick={onToggle}>
              Show Answer
            </Button>
          </div>
        </Card>

        {/* back */}
        <Card className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">Answer</CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex items-center justify-center px-6 text-center">
            <div className="text-lg md:text-2xl font-semibold">{answer}</div>
          </CardContent>

          <div className="p-4 flex justify-end">
            <Button size="sm" variant="outline" onClick={onToggle}>
              Flip Back
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
