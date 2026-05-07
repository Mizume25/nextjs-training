import { SignupForm } from "@/components/signup-form"
import Link from "next/link"
import { createClient } from '@/lib/server'
import { redirect } from 'next/navigation'
import { DataForm } from "@/components/signup-form"

export default async function Page() {
  
  //Funcion que recibe informacion del hijo
  const handleFormData = async (e:DataForm):Promise<void> => {
    'use server'
    const email = e.email ?? ""
    const password = e.password
    
    const supabase = await createClient()
    await supabase.auth.signUp({ email, password })



  }


  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-black bg-[url('/IMG/Fondo2.jpg')] bg-cover">
      <div className="w-full max-w-sm">
        <SignupForm handleFormData={handleFormData}/>
        <Link href="/test" className="cursor-pointer">
          LINK PRUEBA
        </Link>
      </div>
    </div>
  )
}
