"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, Clock, User, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import FaceRecognition from "@/components/face-recognition"

interface AttendanceRecord {
  id: string
  timestamp: Date
  status: "present" | "late" | "absent"
  confidence: number
  location?: string
}

export default function FaceAttendancePage() {
  const [isRecognized, setIsRecognized] = useState(false)
  const [currentUser, setCurrentUser] = useState<{
    id: string
    name: string
    role: string
  } | null>(null)
  const [attendanceRecord, setAttendanceRecord] = useState<AttendanceRecord | null>(null)
  const [error, setError] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleRecognitionSuccess = (data: { userId?: string; confidence?: number }) => {
    console.log("[v0] Face recognition successful:", data)

    // Simulate user lookup
    const mockUsers = {
      user123: { id: "user123", name: "John Doe", role: "Student" },
      user456: { id: "user456", name: "Jane Smith", role: "Teacher" },
      user789: { id: "user789", name: "Bob Johnson", role: "Staff" },
    }

    const userId = data.userId || "user123"
    const user = mockUsers[userId as keyof typeof mockUsers] || mockUsers["user123"]

    setCurrentUser(user)

    // Create attendance record
    const now = new Date()
    const isLate = now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 30)

    const record: AttendanceRecord = {
      id: `att_${Date.now()}`,
      timestamp: now,
      status: isLate ? "late" : "present",
      confidence: data.confidence || 0.85,
      location: "Main Building - Room 101",
    }

    setAttendanceRecord(record)
    setIsRecognized(true)
  }

  const handleRecognitionError = (error: string) => {
    setError(error)
  }

  const resetAttendance = () => {
    setIsRecognized(false)
    setCurrentUser(null)
    setAttendanceRecord(null)
    setError("")
  }

  if (isRecognized && currentUser && attendanceRecord) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                attendanceRecord.status === "present" ? "bg-green-500" : "bg-yellow-500"
              }`}
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-green-700 dark:text-green-300">Attendance Marked!</CardTitle>
            <CardDescription>Your attendance has been successfully recorded</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* User Info */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <User className="w-5 h-5 text-muted-foreground" />
                <span className="text-lg font-semibold">{currentUser.name}</span>
              </div>
              <Badge variant="secondary">{currentUser.role}</Badge>
              <p className="text-sm text-muted-foreground">ID: {currentUser.id}</p>
            </div>

            {/* Attendance Details */}
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Date</span>
                </div>
                <span className="text-sm font-medium">{attendanceRecord.timestamp.toLocaleDateString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Time</span>
                </div>
                <span className="text-sm font-medium">{attendanceRecord.timestamp.toLocaleTimeString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Status</span>
                </div>
                <Badge variant={attendanceRecord.status === "present" ? "default" : "secondary"}>
                  {attendanceRecord.status.charAt(0).toUpperCase() + attendanceRecord.status.slice(1)}
                </Badge>
              </div>

              {attendanceRecord.location && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Location</span>
                  </div>
                  <span className="text-sm font-medium">{attendanceRecord.location}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Confidence</span>
                </div>
                <span className="text-sm font-medium">{(attendanceRecord.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <Button onClick={resetAttendance} variant="outline" className="flex-1 bg-transparent">
                Mark Another
              </Button>
              <Link href="/" className="flex-1">
                <Button className="w-full">Back to Home</Button>
              </Link>
            </div>
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

          <div className="text-right">
            <p className="text-sm text-muted-foreground">Current Time</p>
            <p className="text-lg font-mono font-semibold">{currentTime.toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Face Recognition Attendance</h1>
            <p className="text-muted-foreground">Look at the camera to mark your attendance automatically</p>
          </div>

          <FaceRecognition mode="recognize" onSuccess={handleRecognitionSuccess} onError={handleRecognitionError} />

          {error && (
            <Alert variant="destructive" className="max-w-2xl mx-auto">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Quick Actions */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/face-register">
                  <Button variant="outline" className="w-full bg-transparent">
                    Register New Face
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="w-full bg-transparent">
                    Manual Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
