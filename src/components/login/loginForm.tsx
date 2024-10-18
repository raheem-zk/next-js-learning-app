'use client'

import React, { useState } from "react"
import { useRouter } from 'next/navigation'
import { loginApi } from "@/api/authApi/authApi"
import { userLoggedIn } from "@/redux/user/authSlice"
import { useDispatch } from "react-redux"

export default function LoginForm() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const { push } = useRouter()
  const dispatch = useDispatch()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null) // Reset error state

    try {
      const response = await loginApi({
        phoneOrEmail: email,
        password,
      })

      if (response?.message === "success") {
        dispatch(userLoggedIn(response?.data))
        push("/profile")
      } else {
        setError(response?.message)
      }
    } catch (err: any) {
      // Handle error
      setError(
        err?.response?.data?.message || "Login failed. Please try again."
      )
    }
  }

  return (
    <>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email or Phone number
          </label>
          <input
            type="text"
            id="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </>
  )
}