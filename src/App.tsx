import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import Camera from "./components/practice/Camera";
import "./App.css";

const App = () => {
  const [imageDimensions, setImageDimensions] = useState<
    "fullscreen" | "1:1" | "4:3" | "3:4" | ""
  >("");
  return (
    <div>
      {imageDimensions ? (
        <Camera imageDimensions={imageDimensions} />
      ) : (
        <LandingPage setImageDimensions={setImageDimensions} />
      )}
    </div>
  );
};

export default App;
