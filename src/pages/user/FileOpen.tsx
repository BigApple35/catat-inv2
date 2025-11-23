import Example from "@/components/pagecomp/AIChatBot"
import FlaschCard from "@/components/pagecomp/FlaschCard"
import { QuizComp } from "@/components/pagecomp/QuizComp"
import SummaryReader from "@/components/pagecomp/SummaryContent"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from "react-router"

function FileOpen() {
    const { id } = useParams()

  return (
    <div className="flex w-full flex-col gap-6 h-full">
        <Tabs defaultValue="summary" className="h-full" >
            <TabsList className="w-full">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
                <TabsTrigger value="flash-card">Flash Card</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
                <SummaryReader materialId={parseInt(id)}/>
            </TabsContent>
            <TabsContent value="quiz" className="w-full h-full">
                <QuizComp materialId={parseInt(id)}/>   
            </TabsContent>
            <TabsContent value="flash-card">
                <FlaschCard materialId={parseInt(id)}/>
            </TabsContent>

        </Tabs>
        
    </div>
  )
}

export default FileOpen