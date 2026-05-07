import { LoginForm } from "@/components/login-form"
import { createClient } from '@/lib/server'
import { useRouter } from "next/router";

export default async function Page() {
    
  const handleLoginForm = async(e:LoginForm) => {
      'use server'
      const email = e.email ?? ""
      const password = e.password
          
      const supabase = await createClient()
      await supabase.auth.signInWithPassword ({ email, password })
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm handleLoginForm={handleLoginForm}/>
      </div>
    </div>
  )
}
