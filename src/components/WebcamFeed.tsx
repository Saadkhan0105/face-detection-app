import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { useDispatch, useSelector } from "react-redux";
import { startWebcam, stopWebcam } from "../redux/webcamSlice";
import { setFaces } from "../redux/detectionSlice";
import { RootState } from "../redux/store";
import "../App.css";

const WebcamFeed: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useDispatch();
  const isActive = useSelector((state: RootState) => state.webcam.isActive);

  const [emotionData, setEmotionData] = useState<any>(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
    };
    loadModels();
  }, []);

  const detect = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const displaySize = {
        width: video.videoWidth,
        height: video.videoHeight,
      };
      faceapi.matchDimensions(canvas, displaySize);

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors()
        .withAgeAndGender()
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

      // Store face detections in Redux
      dispatch(setFaces(resizedDetections.map((d) => d.detection)));

      // Process emotions
      const emotions = resizedDetections.map((detection) => {
        const expressions = detection.expressions;
        const emotion = Object.entries(expressions).sort(
          (a, b) => b[1] - a[1]
        )[0];
        return {
          emotion: emotion[0],
          confidence: emotion[1],
        };
      });
      setEmotionData(emotions);

      // Draw box and emotions
      resizedDetections.forEach((detection) => {
        const { age, gender, genderProbability, expressions } = detection;
        const emotion = Object.entries(expressions).sort(
          (a, b) => b[1] - a[1]
        )[0];

        const text = `${gender} (${Math.round(
          genderProbability * 100
        )}%) Age: ${Math.round(age)} | Emotion: ${emotion[0]}`;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Draw face box
          ctx.strokeStyle = "green";
          ctx.lineWidth = 2;
          ctx.strokeRect(
            detection.detection.box.x,
            detection.detection.box.y,
            detection.detection.box.width,
            detection.detection.box.height
          );

          // Draw text (age, gender, and emotion)
          ctx.font = "16px Arial";
          ctx.fillStyle = "blue";
          ctx.fillText(
            text,
            detection.detection.box.x,
            detection.detection.box.y - 10
          );
        }
      });
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(detect, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div>
      <div className="video-container position-relative">
        {isActive && (
          <Webcam
            ref={webcamRef}
            audio={false}
            className="w-100"
            videoConstraints={{ facingMode: "user" }}
          />
        )}
        <canvas
          ref={canvasRef}
          className="position-absolute top-0 start-0 w-100 h-100"
        />
      </div>

      {emotionData && (
        <div className="emotion-container">
          {emotionData.map((data: any, index: number) => (
            <div key={index}>
              <h6>
                Face {index + 1} Emotion: {data.emotion}
              </h6>
              <p>Confidence: {Math.round(data.confidence * 100)}%</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3">
        <button
          className="btn btn-success me-2"
          onClick={() => dispatch(startWebcam())}
        >
          Start Webcam
        </button>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(stopWebcam())}
        >
          Stop Webcam
        </button>
      </div>
    </div>
  );
};

export default WebcamFeed;
