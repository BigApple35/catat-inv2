// api/material-summary.ts
import api from "./axios";

export async function getMaterialSummary(id: number) {
  const res = await api.post(`/student/ai/summarize`, {
    "material_id" : id
  });
  return res.data;
}

export async function generateFlashcards(materialId: number) {
  const response = await api.post("/student/ai/flashcards", {
    material_id: materialId,
    count: 10, // always request 10
  });

  return response.data.data.flashcards; 
}

export async function generateQuiz(materialId: number) {
  const response = await api.post("/student/ai/quiz", {
    material_id: materialId,
    question_count: 10,
  });

  const raw = response.data.data;

  // map to shape that QuizComp expects
  return raw;
}
