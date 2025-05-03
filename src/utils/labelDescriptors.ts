import * as faceapi from "face-api.js";

const loadLabeledImages = async () => {
  const labels = ["John", "Jane"]; // Update with your labels
  return Promise.all(
    labels.map(async (label) => {
      const descriptions: Float32Array[] = [];
      for (let i = 1; i <= 1; i++) {
        const img = await faceapi.fetchImage(
          `/labeled_images/${label}/${i}.jpg`
        );
        const detection = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        if (detection) descriptions.push(detection.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
};

export default loadLabeledImages;
