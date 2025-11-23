import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { signup, type SignUpPayload } from "@/api/auth"

export default function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {register, handleSubmit} = useForm<SignUpPayload>();
  const onSubmit = async (data : SignUpPayload) => {
    const result = await signup(data);
    
    if(result.meta.status === "success"){
      window.location.href = "/dashboard";
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      id="username"
                      type="username"
                      placeholder="username"
                      {...register("username")}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      {...register("email")}

                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" required {...register("password")} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm_password">Confirm Password</FieldLabel>
                    <Input id="confirm_password" type="password" {...register("password_confirm")} required />
                  </Field>
                  <Field>
                    <Button type="submit">Register</Button>
                    <FieldDescription className="text-center">
                      Don&apos;t have an account? <a href="#">Sign up</a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
            and <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </div>
  );
}
