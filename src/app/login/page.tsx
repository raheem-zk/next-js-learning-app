import LoginForm from "@/components/login/loginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Login | spec app',
  description: 'Login to access your account and manage your profile.',
  openGraph: {
    title: 'Login | spec app',
    description: 'Login to access your account and manage your profile.',
    // images: [
    //   {
    //     url: 'https://yourdomain.com/og-image.jpg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Login page',
    //   },
    // ],
  },
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <LoginForm />
      </div>
    </div>
  )
}