"use client"

import { useState } from "react"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, User, Award as IdCard } from "lucide-react"
import Link from "next/link"
import FaceRecognition from "@/components/face-recognition"

export default function FaceRegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<"details" | "face">("details")
  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    email: "",
    phone: "",
  })
  const [isRegistered, setIsRegistered] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get("userId")
    const name = urlParams.get("name")

    if (userId && name) {
      setFormData((prev) => ({
        ...prev,
        userId: userId,
        name: decodeURIComponent(name),
      }))
    }
  }, [])

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.userId) {
      setError("Please fill in all required fields")
      return
    }
    setError("")
    setStep("face")
  }

  const handleFaceSuccess = (data: { faceData?: string }) => {
    console.log("[v0] Face registration successful:", {
      userId: formData.userId,
      faceData: data.faceData?.substring(0, 50) + "...",
    })

    // In a real app, you would save this to your database
    // For now, we'll simulate successful registration
    setIsRegistered(true)

    // Redirect after 3 seconds
    setTimeout(() => {
      router.push("/login")
    }, 3000)
  }

  const handleFaceError = (error: string) => {
    setError(error)
  }

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-green-700 dark:text-green-300">Registration Complete!</CardTitle>
            <CardDescription>Your face has been successfully registered for attendance tracking.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>ID:</strong> {formData.userId}
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Redirecting to login page...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === "details" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              <IdCard className="w-4 h-4" />
            </div>
            <div className="w-8 h-0.5 bg-muted"></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === "face" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Step 1: Personal Details */}
        {step === "details" && (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Personal Details</CardTitle>
              <CardDescription>Enter your information to register for face recognition attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userId">ID Number *</Label>
                  <Input
                    id="userId"
                    type="text"
                    placeholder="Student/Employee ID"
                    value={formData.userId}
                    onChange={(e) => setFormData((prev) => ({ ...prev, userId: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full">
                  Continue to Face Registration
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Face Registration */}
        {step === "face" && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Face Registration</h1>
              <p className="text-muted-foreground">Now let's register your face for attendance tracking</p>
            </div>

            <FaceRecognition
              mode="register"
              userId={formData.userId}
              userName={formData.name}
              onSuccess={handleFaceSuccess}
              onError={handleFaceError}
            />

            {error && (
              <Alert variant="destructive" className="max-w-2xl mx-auto">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="text-center">
              <Button variant="outline" onClick={() => setStep("details")} className="mr-4">
                Back to Details
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
