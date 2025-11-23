import api from "./axios";

export async function submitQuizResult(answer :any, quiz_id : any){
    const res = await api.post(`/student/quizzes/${quiz_id}/submit`, answer)
    return res
}

export async function getQuizHistory(material_id: any){
    const res = await api.get(`/student/materials/${material_id}/quizzes`)
    return res.data.data
}

export async function getDailyQuiz(){
    const res = await api.get("/student/daily-quiz",)
    return res.data.data
}