import * as faceapi from "face-api.js";

export const loadLabeledImages = async () => {
  const labels = ["saad", "abuzar"]; 

  return Promise.all(
    labels.map(async (label) => {
      const descriptions: Float32Array[] = [];

      for (let i = 1; i <= 1; i++) {
        const img = await faceapi.fetchImage(`/known/${label}/${i}.jpg`);
        const detection = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detection) {
          descriptions.push(detection.descriptor);
        }
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
};
