
# 💻 Face Detection Web App

A professional and visually appealing **facial recognition web application** built using **React**, **TypeScript**, and **face-api.js**. It detects and recognizes faces from webcam or uploaded images, showing age, gender, and emotion overlays in real-time.

---

## 🚀 Features

- 🎥 Real-time face detection via **webcam**
- 🖼️ Face detection via **uploaded images**
- 🧠 Face recognition using **labeled face descriptors**
- 🏷️ Shows **age**, **gender** (with probability), and **emotion**
- 🖌️ Clean UI with custom `App.css` using Tailwind utility classes
- 📱 Fully responsive design
- ☁️ Easy deployment on platforms like **Vercel** or **Netlify**

---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript
- **Face Detection/Recognition**: face-api.js
- **Styling**: Tailwind CSS + App.css
- **State Management**: React Hooks
- **Icons & UI Enhancements**: React Icons

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout.tsx          // App layout with header/footer
│   ├── WebcamFeed.tsx      // Webcam detection component
│   ├── ImageUpload.tsx     // Image upload detection component
│
├── utils/
│   └── labelDescriptors.ts // Loads known face data
│
├── App.tsx                 // Root app logic
├── App.css                 // Custom global styles
├── main.tsx                // App entry point
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/face-detection-app.git
cd face-detection-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Download Face-API Models

Download the following models from:
👉 https://github.com/justadudewhohacks/face-api.js-models

Place them in the `public/models/` folder:
- `tiny_face_detector_model`
- `face_landmark_68_tiny_model`
- `face_recognition_model`
- `face_expression_model`
- `age_gender_model`

Each model should include:
- `.bin` file(s)
- `weights_manifest.json`

Example:
```
public/models/
├── age_gender_model/
│   ├── age_gender_model-shard1
│   └── age_gender_model-weights_manifest.json
```

### 4. Add Labeled Face Data

Place labeled images inside the `public/known/` folder:

```
public/known/
├── saad/
│   ├── saad.jpeg
├── abuzar/
│   └── abuzar.jpeg
```

Folder names act as person names.

---

## ▶️ Running the App Locally

```bash
npm run dev
```

Navigate to:  
**http://localhost:5173**

---

## 🌐 Deployment

### 📦 Vercel

1. Push the project to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Connect your GitHub repo
4. Make sure `public/models/` and `public/known/` exist in the repo
5. Click **Deploy**


---


## ❓ Troubleshooting

- Make sure all models are placed correctly under `/public/models`
- Keep filenames lowercase and simple in `public/known/` folders
- Use clear and front-facing images for better recognition
- Ensure webcam permissions are enabled

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Saad Khan**  
💼 Web Developer | 💡 Tech Enthusiast  
- GitHub: [@Saadkhan0105](https://github.com/Saadkhan0105)  
- LinkedIn: [Saad Khan](https://www.linkedin.com/in/saadkhan1996/)  
- Email: saadkhan9560@gmail.com

---

## 🙏 Acknowledgements

- [face-api.js](https://github.com/justadudewhohacks/face-api.js)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
