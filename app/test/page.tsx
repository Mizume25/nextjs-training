"use client"
import React from 'react'
import { useForm } from 'react-hook-form'

type DataForm = { name:string, age:number}

/*  TEST PARA PROBAR use form*/
export default function page() {
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<DataForm>()

  const onSubmit = (e:DataForm):void => {
    console.log(e)
    reset()
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 w-full max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-400">
          Name
          <input
            type="text"
            {...register("name", { required:"El nombre es obligatorio"})}
            className="border-0 border-b-2 border-zinc-600 bg-transparent
                   py-2 text-base text-white outline-none transition-colors
                   focus:border-indigo-400 placeholder:text-zinc-600"
            placeholder="Tu nombre..."
          />
          {errors.name && <span>{errors.name.message}</span>}
          <br />
          <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-400">
             Age
          <input
            type="number"
            {...register("age", { valueAsNumber:true, required:"La edad es obligatorio", max:{value: 90, message:"Maximo de edad"}, min:{value:18 , message:"Edad Minima"}})}
            className="border-0 border-b-2 border-zinc-600 bg-transparent
                   py-2 text-base text-white outline-none transition-colors
                   focus:border-indigo-400 placeholder:text-zinc-600"
            placeholder="Tu nombre..."
          />
          {errors.age && <span>{errors.age.message}</span>}
          </label>
          <button type='submit' className='cursor-pointer'>button</button>
        </label>
        </form>
      </div>
    </div>
  )
}

