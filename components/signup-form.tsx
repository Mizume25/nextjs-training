"use client"
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
import { Logo } from '@/components/ui/logo'
import { type User } from "@/types/definitions"
import { useForm } from "react-hook-form"

//From Data extienede todo lo de un Usuario 
interface FormData extends User {
    confirm_password:string
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {


  //DECLARACION de la reconstruccion de useForm
  const { register, handleSubmit, formState: { errors } , reset, watch} = useForm<FormData>();


  //Lo unico que hara es imprimi informacion
  const onSubmit = (e:FormData):void => {
    console.log(e)
    reset()
  }

  return (
    <Card {...props}>
      <CardHeader>
        <Logo />
        <CardTitle />
        <CardDescription>
          Registra tu informacion
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nombre</FieldLabel>
              <Input {...register("name", {required:"Es obligatorio", maxLength:30})} type="text" placeholder="John Doe" required />
              {errors.name && <span>{errors.name.message}</span>}
            </Field>
            <FieldDescription >
              {errors.name && <span>{errors.name.message}</span>}
            </FieldDescription>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...register("email", {required:"Es obligatorio"})}
                placeholder="m@example.com"
              />
              
              <FieldDescription>
                {errors.email && <span>{errors.email.message}</span>}
                Introduzca su correo de contacto
              </FieldDescription>
            </Field>
            {/* Sintaxi de un campo con componententes*/}
            <Field>
              {/* Nombre del campo*/}
              
              <FieldLabel htmlFor="password">Password</FieldLabel>
              {/* Input del campo*/}

              <Input 
              {...register("password",{ required:"Es Obligatorio", minLength:10})}
              type="password" />

              {/* Descripcion*/}
              <FieldDescription>
                {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                <br />
                Cumpla con los requisitos estipulados
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirmar Contraseña
              </FieldLabel>
              <Input {...register('confirm_password',{required:"Es obligatorio confirmar contraseña", minLength:10, validate: confirm_password => watch("confirm_password") == watch("password") || "Las contraseñas no coinciden"})} type="password"  />
              <FieldDescription>
                {errors.confirm_password && <span>{errors.confirm_password.message}</span>}
                Porfavor Confirma Contraseña
                </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" className="w-full py-2.5 rounded-xl bg-white text-black text-sm font-medium
             tracking-wide transition-all hover:bg-zinc-200 active:scale-95 cursor-pointer">Create Account</Button>
               
                <FieldDescription className="px-6 text-center">
                  ¿Ya tienes una cuenta creada? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
