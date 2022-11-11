import React, { FC } from "react";
import { isMobile } from "react-device-detect";

interface LandingPageProps {
  setImageDimensions: React.Dispatch<
    React.SetStateAction<"3:4" | "" | "fullscreen" | "1:1" | "4:3">
  >;
}

const LandingPage: FC<LandingPageProps> = ({ setImageDimensions }) => {
  return (
    <div className="landingPageMain">
      <h1>Image Dimensions</h1>
      <div className="btnGroup">
        <button
          className="optionsBtn"
          onClick={() => setImageDimensions("fullscreen")}
        >
          Full screen
        </button>
        <button
          className="optionsBtn"
          onClick={() => setImageDimensions("1:1")}
        >
          1:1
        </button>
        <button
          className="optionsBtn"
          onClick={() => setImageDimensions("4:3")}
        >
          {isMobile ? "3:4" : "4:3"}
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
