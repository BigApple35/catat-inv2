import { GalleryVerticalEnd, SquarePen } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import { Toaster } from "sonner";
import Logo from "../assets/Logo.png"

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 w-screen h-screen">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className=" text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <SquarePen color="white"/>
          </div>
          Rangkumin.ai
        </a>
        <Toaster/>

        <LoginForm />
      </div>
    </div>
  )
}
