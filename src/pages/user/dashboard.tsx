import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const tasks = [
    {
        title : "Learn how to implement AI",
        due_date : "22/12/2024"
    },
    {
        title : "Learn how to implement AI",
        due_date : "22/12/2024"
    },
    {
        title : "Learn how to implement AI",
        due_date : "22/12/2024"
    },
    {
        title : "Learn how to implement AI",
        due_date : "22/12/2024"
    },
    {
        title : "Learn how to implement AI",
        due_date : "22/12/2024"
    },
        {
        title : "Learn how to implement AI",
        due_date : "22/12/2024"
    },
        {
        title : "Learn how to implement AI",
        due_date : "22/12/2024"
    },
        {
        title : "Learn how to implement AI",
        due_date : "22/12/2024"
    },
        {
        title : "Learn how to implement AI",
        due_date : "22/12/2024"
    },
        {
        title : "Learn how to implement AI",
        due_date : "22/12/2024"
    }
]

const recentlyOpened = [
    {
        title : "Introduction to AI",
    },
    {
        title : "Advanced Machine Learning",
    },
    {
        title : "Data Science Basics",
    },
    {
        title : "Neural Networks Explained",
    },
    {
        title : "Deep Learning Techniques",
    },
    {
        title : "Introduction to AI",
    },
    {
        title : "Advanced Machine Learning",
    },
    {
        title : "Data Science Basics",
    },
    {
        title : "Neural Networks Explained",
    },
    {
        title : "Deep Learning Techniques",
    }
]

function  Dashboard() {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-4 gap-4">
                <Card >
                    <CardContent className=" flex flex-col justify-center items-center">
                        <h4 className="font-bold text-xl">4</h4>
                        <p>Streak</p>
                    </CardContent>
                </Card>

                <Card >
                    <CardContent className=" flex flex-col justify-center items-center">
                        <h4 className="font-bold text-xl">10</h4>
                        <p>Material Uploaded</p>
                    </CardContent>
                </Card>

                <Card >
                    <CardContent className=" flex flex-col justify-center items-center">
                        <h4 className="font-bold text-xl">6</h4>
                        <p>Quiz Done</p>
                    </CardContent>
                </Card>

                <Card >
                    <CardContent className=" flex flex-col justify-center items-center">
                        <h4 className="font-bold text-xl">12</h4>
                        <p>Task Due</p>
                    </CardContent>
                </Card>
                
            </div>

            <div className="grid grid-cols-3 gap-4">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle className="flex justify-between"><span>Tasks</span> <span>go to tasks</span></CardTitle>
                        <CardDescription>Your due important tasks</CardDescription>
                    </CardHeader>
                    <CardContent className="max-h-60 overflow-y-auto overflow-x-clip">
                        {
                            tasks.map((task, index) => (
                                <div key={index} className="flex justify-between mb-2 flex-col border-b-2 text-sm font-semibold">
                                    <span>{task.title}</span>
                                    <span className="text-xs">{task.due_date}</span>
                                </div>
                            ))
                        }
                    </CardContent>
                </Card>
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle className="flex justify-between"><span>Your learning time</span></CardTitle>
                        <CardDescription>Your due important tasks</CardDescription>
                    </CardHeader>
                    <CardContent className="max-h-60 overflow-y-auto overflow-x-clip">
                        
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle className="flex justify-between"><span>Recent Opened</span></CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-60 overflow-y-auto overflow-x-clip">
                        {
                            recentlyOpened.map((item, index) => (
                                <div key={index} className="flex justify-between mb-2 flex-col border-b-2 text-sm font-semibold">
                                    <span>{item.title}</span>
                                </div>
                            ))
                        }
                    </CardContent>

                </Card>
            </div>
        </div>
    )
}
export default Dashboard;