import React from "react";
import WebcamFeed from "./components/WebcamFeed";
import UploadImage from "./components/ImageUpload";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="container text-center">
      <Layout>

      <WebcamFeed />
      <hr />
      <UploadImage />
      </Layout>
    </div>
  );
};

export default App;
