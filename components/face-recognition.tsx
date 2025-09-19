"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, CameraOff, CheckCircle, AlertCircle, Loader2, User, Scan } from "lucide-react"
import { useFaceRecognition } from "@/hooks/use-face-recognition"

interface FaceRecognitionProps {
  mode: "register" | "recognize"
  onSuccess?: (data: { userId?: string; confidence?: number; faceData?: string }) => void
  onError?: (error: string) => void
  userId?: string
  userName?: string
}

export default function FaceRecognition({ mode, onSuccess, onError, userId, userName }: FaceRecognitionProps) {
  const [countdown, setCountdown] = useState(0)
  const [progress, setProgress] = useState(0)

  const {
    isActive,
    isProcessing,
    faceDetected,
    error,
    status,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    startDetection,
    stopDetection,
    processFace,
    clearError,
  } = useFaceRecognition({
    mode,
    onSuccess,
    onError,
    userId,
    threshold: 0.6,
  })

  // Auto-start detection when camera is active
  useEffect(() => {
    if (isActive) {
      startDetection()
    } else {
      stopDetection()
    }

    return () => stopDetection()
  }, [isActive, startDetection, stopDetection])

  // Auto-process when face is detected and stable
  useEffect(() => {
    if (faceDetected && !isProcessing && isActive) {
      const timer = setTimeout(async () => {
        setCountdown(3)

        // Countdown animation
        for (let i = 3; i > 0; i--) {
          setCountdown(i)
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }

        setCountdown(0)

        // Progress animation
        for (let i = 0; i <= 100; i += 10) {
          setProgress(i)
          await new Promise((resolve) => setTimeout(resolve, 100))
        }

        await processFace()
        setProgress(0)
      }, 2000) // Wait 2 seconds for stable detection

      return () => clearTimeout(timer)
    }
  }, [faceDetected, isProcessing, isActive, processFace])

  // Clear error when switching modes or restarting
  useEffect(() => {
    clearError()
  }, [mode, clearError])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Scan className="w-6 h-6 text-primary" />
          <CardTitle className="text-2xl">{mode === "register" ? "Face Registration" : "Face Recognition"}</CardTitle>
        </div>
        <CardDescription>
          {mode === "register"
            ? "Register your face for future attendance tracking"
            : "Look at the camera to mark your attendance"}
        </CardDescription>
        {userName && (
          <Badge variant="secondary" className="mx-auto">
            <User className="w-3 h-3 mr-1" />
            {userName}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Camera View */}
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
          <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: isActive ? "block" : "none" }}
          />

          {/* Overlay UI */}
          {isActive && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Face detection guide */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`border-2 border-dashed rounded-lg transition-colors duration-300 ${
                    faceDetected ? "border-green-500" : "border-white/50"
                  }`}
                  style={{ width: "60%", height: "70%" }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-2 py-1 rounded">
                    Position your face here
                  </div>
                </div>
              </div>

              {/* Countdown overlay */}
              {countdown > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-6xl font-bold text-white animate-pulse">{countdown}</div>
                </div>
              )}

              {/* Processing overlay */}
              {isProcessing && countdown === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center text-white">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto mb-2" />
                    <p className="text-lg">Processing...</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Camera off state */}
          {!isActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center text-white">
                <CameraOff className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg mb-2">Camera is off</p>
                <p className="text-sm text-gray-400">Click start to begin</p>
              </div>
            </div>
          )}
        </div>

        {/* Status and Progress */}
        {status && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">{status}</p>
            {progress > 0 && <Progress value={progress} className="w-full" />}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          {!isActive ? (
            <Button onClick={startCamera} className="flex items-center space-x-2">
              <Camera className="w-4 h-4" />
              <span>Start Camera</span>
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={stopCamera} disabled={isProcessing}>
                <CameraOff className="w-4 h-4 mr-2" />
                Stop Camera
              </Button>

              {faceDetected && !isProcessing && (
                <Button onClick={processFace} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>{mode === "register" ? "Register Face" : "Recognize Face"}</span>
                </Button>
              )}
            </>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>• Ensure good lighting and look directly at the camera</p>
          <p>• Keep your face within the guide frame</p>
          <p>• Remove glasses or masks if possible for better accuracy</p>
        </div>
      </CardContent>
    </Card>
  )
}
