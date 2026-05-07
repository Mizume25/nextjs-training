'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
import { DataForm } from "./signup-form"

//Importamos DataForm sin la confirmacion
export interface LoginForm extends Omit<DataForm, "confirm_password">{}

//Interface de LoginPageProps
interface LoginPageProp extends  React.ComponentProps<"div">{}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  //Propiea
  const {register, handleSubmit ,formState: { errors }, reset, watch} = useForm<LoginForm>();

  const onSubmit = async (data:LoginForm):Promise<void> => {
    reset();
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Ingresa tu email para inciar session
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register("email", {required:"Es un campo obligatorio"})}
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                
                  {errors.email && <span>{errors.email.message}</span>}
                
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input {...register("password",{required:"Es Obligatorio"})} type="password" />
                {errors.email && <span>{errors.email.message}</span>}
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
