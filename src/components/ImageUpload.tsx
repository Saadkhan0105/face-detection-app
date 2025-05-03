import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import loadLabeledImages from "../utils/labelDescriptors";

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const faceMatcherRef = useRef<faceapi.FaceMatcher | null>(null);

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

      const labeledDescriptors = await loadLabeledImages();
      faceMatcherRef.current = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
    };

    loadModels();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleImageLoad = async () => {
    if (!imageRef.current || !canvasRef.current) return;

    const detections = await faceapi
      .detectAllFaces(imageRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender()
      .withFaceDescriptors();

    const canvas = canvasRef.current;
    const displaySize = {
      width: imageRef.current.width,
      height: imageRef.current.height,
    };
    faceapi.matchDimensions(canvas, displaySize);

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);

    resizedDetections.forEach((detection) => {
      const { age, gender, genderProbability, expressions, descriptor } =
        detection;
      const bestEmotion = Object.entries(expressions || {}).sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0];

      let label = "Unknown";
      if (faceMatcherRef.current) {
        const match = faceMatcherRef.current.findBestMatch(descriptor);
        label = match.toString();
      }

      const text = `${label} | ${gender} (${Math.round(
        genderProbability * 100
      )}%) Age: ${Math.round(age)} | Emotion: ${bestEmotion}`;

      if (ctx) {
        ctx.font = "16px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText(
          text,
          detection.detection.box.x,
          detection.detection.box.y - 10
        );
      }
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Upload an Image</h2>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && (
          <div className="relative mt-4">
            <img
              ref={imageRef}
              src={image}
              alt="Uploaded"
              onLoad={handleImageLoad}
              className="img-fluid rounded shadow-md"
            />
            <canvas ref={canvasRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
