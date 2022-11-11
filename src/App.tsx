import React, { useState } from "react";
import "./App.css";
import ImageCapturer from "./components/ImageCapturer";
import LandingPage from "./components/LandingPage";

const App = () => {
  const [imageDimensions, setImageDimensions] = useState<
    "fullscreen" | "1:1" | "4:3" | "3:4" | ""
  >("");
  return (
    <div>
      {imageDimensions ? (
        <ImageCapturer imageDimensions={imageDimensions} />
      ) : (
        <LandingPage setImageDimensions={setImageDimensions} />
      )}
    </div>
  );
};

export default App;
