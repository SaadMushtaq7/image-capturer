import React, { useRef } from "react";
import Webcam from "react-webcam";

const TestFile = () => {
  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);

  function drawImge() {
    const video = webcamRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      var ctx = canvas.getContext("2d");

      canvas.width = video.video.videoWidth;
      canvas.height = video.video.videoHeight;

      ctx.drawImage(video.video, 0, 0, canvas.width, canvas.height);

      setTimeout(drawImge, 33);
    }
  }
  setTimeout(drawImge, 33);
  return (
    <>
      <Webcam
        audio={true}
        ref={webcamRef}
        mirrored
        style={{
          width: "90%",
          height: "90%",
          display: "none",
        }}
      />
      <canvas ref={canvasRef} style={{ width: "90%", height: "90%" }} />
    </>
  );
};

export default TestFile;
