import { SignupForm } from "@/components/signup-form"
import Link from "next/link"
export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-black bg-[url('/IMG/Fondo2.jpg')] bg-cover">
      <div className="w-full max-w-sm">
        <SignupForm />
        <Link href="/test" className="cursor-pointer">
          LINK PRUEBA
        </Link>
      </div>
    </div>
  )
}
