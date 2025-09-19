"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Eye, EyeOff, Users, GraduationCap, Shield, Building2, CheckCircle, Scan } from "lucide-react"
import Link from "next/link"
import FaceRecognition from "@/components/face-recognition"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const portalType = searchParams.get("portal") || "student"

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: portalType,
    studentId: "",
    teacherId: "",
    adminId: "",
    officialId: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [loginMethod, setLoginMethod] = useState<"traditional" | "face">("traditional")

  const portalConfig = {
    student: {
      title: "Student Portal",
      icon: GraduationCap,
      color: "bg-blue-500",
      description: "Access your attendance records and notifications",
    },
    teacher: {
      title: "Teacher Portal",
      icon: Users,
      color: "bg-green-500",
      description: "Manage your classes and student attendance",
    },
    admin: {
      title: "Administrator Portal",
      icon: Shield,
      color: "bg-purple-500",
      description: "Monitor live attendance and manage users",
    },
    government: {
      title: "Government Portal",
      icon: Building2,
      color: "bg-orange-500",
      description: "View state-wise educational analytics",
    },
  }

  const currentPortal = portalConfig[portalType as keyof typeof portalConfig] || portalConfig.student
  const IconComponent = currentPortal.icon

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate authentication
    setTimeout(() => {
      if (formData.email && formData.password) {
        // Redirect to appropriate portal
        window.location.href = `/${portalType}`
      } else {
        setError("Please fill in all required fields")
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleFaceRecognitionSuccess = (data: { userId?: string; confidence?: number }) => {
    console.log("[v0] Face recognition login successful:", data)

    // Simulate successful face recognition login
    setIsLoading(true)
    setTimeout(() => {
      // Redirect to appropriate portal
      window.location.href = `/${portalType}`
    }, 1000)
  }

  const handleFaceRecognitionError = (error: string) => {
    setError(error)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div
              className={`w-16 h-16 ${currentPortal.color} rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{currentPortal.title}</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">{currentPortal.description}</CardDescription>
          </CardHeader>

          <CardContent>
            {/* Login method selection */}
            <div className="flex mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setLoginMethod("traditional")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  loginMethod === "traditional"
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Traditional Login
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("face")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center space-x-1 ${
                  loginMethod === "face"
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Scan className="w-4 h-4" />
                <span>Face Login</span>
              </button>
            </div>

            {loginMethod === "traditional" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                {/* ID Field based on portal type from URL */}
                {portalType === "student" && (
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      type="text"
                      placeholder="Enter your student ID"
                      value={formData.studentId}
                      onChange={(e) => handleInputChange("studentId", e.target.value)}
                      required
                    />
                  </div>
                )}

                {portalType === "teacher" && (
                  <div className="space-y-2">
                    <Label htmlFor="teacherId">Teacher ID</Label>
                    <Input
                      id="teacherId"
                      type="text"
                      placeholder="Enter your teacher ID"
                      value={formData.teacherId}
                      onChange={(e) => handleInputChange("teacherId", e.target.value)}
                      required
                    />
                  </div>
                )}

                {portalType === "admin" && (
                  <div className="space-y-2">
                    <Label htmlFor="adminId">Administrator ID</Label>
                    <Input
                      id="adminId"
                      type="text"
                      placeholder="Enter your admin ID"
                      value={formData.adminId}
                      onChange={(e) => handleInputChange("adminId", e.target.value)}
                      required
                    />
                  </div>
                )}

                {portalType === "government" && (
                  <div className="space-y-2">
                    <Label htmlFor="officialId">Official ID</Label>
                    <Input
                      id="officialId"
                      type="text"
                      placeholder="Enter your official ID"
                      value={formData.officialId}
                      onChange={(e) => handleInputChange("officialId", e.target.value)}
                      required
                    />
                  </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className={`w-full ${currentPortal.color} hover:opacity-90 text-white`}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold mb-2">Face Recognition Login</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Look at the camera to sign in automatically
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                  <FaceRecognition
                    mode="recognize"
                    onSuccess={handleFaceRecognitionSuccess}
                    onError={handleFaceRecognitionError}
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Request Access
                </Link>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Need to register your face?{" "}
                <Link href="/face-register" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Register Face
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <CheckCircle className="w-4 h-4" />
            <span>Secured with face recognition technology</span>
          </div>
        </div>
      </div>
    </div>
  )
}
