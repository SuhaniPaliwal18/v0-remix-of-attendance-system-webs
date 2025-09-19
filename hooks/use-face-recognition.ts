"use client"

import { useState, useCallback, useRef } from "react"
import {
  detectFace,
  extractFaceEncodings,
  recognizeFace,
  assessImageQuality,
  FaceDataStorage,
  CameraUtils,
  type FaceDetectionResult,
  type FaceData,
} from "@/lib/face-detection"

interface UseFaceRecognitionOptions {
  mode: "register" | "recognize"
  onSuccess?: (data: { userId?: string; confidence?: number; faceData?: string }) => void
  onError?: (error: string) => void
  userId?: string
  threshold?: number
}

export function useFaceRecognition({ mode, onSuccess, onError, userId, threshold = 0.6 }: UseFaceRecognitionOptions) {
  const [isActive, setIsActive] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string>("")
  const [status, setStatus] = useState<string>("")
  const [faceDetected, setFaceDetected] = useState(false)
  const [detectionResult, setDetectionResult] = useState<FaceDetectionResult | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const startCamera = useCallback(async () => {
    try {
      setError("")
      setStatus("Initializing camera...")

      const mediaStream = await CameraUtils.getCameraStream()
      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        await videoRef.current.play()
      }

      setIsActive(true)
      setStatus("Camera ready - Position your face in the frame")
    } catch (err) {
      const errorMessage = "Camera access denied. Please allow camera permissions."
      setError(errorMessage)
      onError?.(errorMessage)
    }
  }, [onError])

  const stopCamera = useCallback(() => {
    if (stream) {
      CameraUtils.stopCameraStream(stream)
      setStream(null)
    }

    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current)
      detectionIntervalRef.current = null
    }

    setIsActive(false)
    setFaceDetected(false)
    setDetectionResult(null)
    setStatus("")
  }, [stream])

  const performDetection = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !isActive) return

    try {
      const result = await detectFace(canvasRef.current, videoRef.current)
      setDetectionResult(result)
      setFaceDetected(result.detected)

      if (result.detected) {
        setStatus(`Face detected! Confidence: ${(result.confidence * 100).toFixed(0)}%`)
      } else {
        setStatus("Please position your face in the frame")
      }
    } catch (err) {
      console.error("[v0] Face detection error:", err)
    }
  }, [isActive])

  const startDetection = useCallback(() => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current)
    }

    detectionIntervalRef.current = setInterval(performDetection, 100) // 10 FPS
  }, [performDetection])

  const stopDetection = useCallback(() => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current)
      detectionIntervalRef.current = null
    }
  }, [])

  const processFace = useCallback(async () => {
    if (!faceDetected || isProcessing || !canvasRef.current) return

    setIsProcessing(true)
    setStatus("Processing face...")

    try {
      // Assess image quality
      const quality = assessImageQuality(canvasRef.current)

      if (quality.quality < 0.5) {
        throw new Error(`Poor image quality: ${quality.issues.join(", ")}`)
      }

      // Extract face encodings
      const encodings = await extractFaceEncodings(canvasRef.current)

      if (encodings.length === 0) {
        throw new Error("Failed to extract face features")
      }

      if (mode === "register") {
        if (!userId) {
          throw new Error("User ID is required for registration")
        }

        // Save face data
        const faceData: FaceData = {
          userId,
          encodings,
          metadata: {
            timestamp: new Date(),
            quality: quality.quality,
            conditions: quality.issues.length === 0 ? "Good" : quality.issues.join(", "),
          },
        }

        FaceDataStorage.saveFaceData(faceData)

        const imageData = canvasRef.current.toDataURL()
        setStatus("Face registered successfully!")
        onSuccess?.({ userId, faceData: imageData })
      } else {
        // Recognition mode
        const storedFaces = FaceDataStorage.getAllFaceData()

        if (storedFaces.length === 0) {
          throw new Error("No registered faces found. Please register first.")
        }

        const recognitionResult = await recognizeFace(encodings, storedFaces, threshold)

        if (recognitionResult.recognized) {
          setStatus(`Face recognized! Confidence: ${(recognitionResult.confidence * 100).toFixed(0)}%`)
          onSuccess?.({
            userId: recognitionResult.userId,
            confidence: recognitionResult.confidence,
          })
        } else {
          throw new Error("Face not recognized. Please try again or register first.")
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Face processing failed"
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }, [faceDetected, isProcessing, mode, userId, threshold, onSuccess, onError])

  return {
    // State
    isActive,
    isProcessing,
    faceDetected,
    error,
    status,
    detectionResult,

    // Refs
    videoRef,
    canvasRef,

    // Actions
    startCamera,
    stopCamera,
    startDetection,
    stopDetection,
    processFace,

    // Utilities
    clearError: () => setError(""),
    setStatus,
  }
}
