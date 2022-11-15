import React, { FC, useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { isMobile } from "react-device-detect";
import { BsStopFill } from "react-icons/bs";
import { GoMirror } from "react-icons/go";
import { TiArrowRepeat } from "react-icons/ti";

interface ImageCapturerProps {
  imageDimensions: "3:4" | "" | "fullscreen" | "1:1" | "4:3";
}

const Camera: FC<ImageCapturerProps> = ({ imageDimensions }) => {
  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>();

  const [cameraType, setCameraType] = useState<any>();
  const [imageSize, setImageSize] = useState<any>({ height: 1280, width: 720 });
  const [deviceId, setDeviceId] = useState<any>({});
  const [videoDevices, setVideoDevices] = useState<any>([]);
  const [url, setUrl] = useState<any>(null);
  const [mirrorCheck, setMirrorCheck] = useState<boolean>(false);

  const getVideoDevices = useCallback(async () => {
    const allDevices = await navigator.mediaDevices.enumerateDevices();
    setVideoDevices(
      allDevices.filter((device) => device.kind === "videoinput")
    );
  }, []);

  const toggleCamera = () => {
    if (cameraType + 1 === videoDevices.length) {
      setCameraType(0);
    } else {
      setCameraType(cameraType + 1);
    }

    setDeviceId(videoDevices[cameraType].deviceId);
  };

  const draw = () => {
    const video = webcamRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = video.video.videoWidth;
      canvas.height = video.video.videoHeight;
      ctx.drawImage(video.video, 0, 0, canvas.width, canvas.height);
    }
    setTimeout(draw, 33);
  };

  const capturePhoto = useCallback(async () => {
    const imageSrc = await webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setUrl(imageSrc);
  }, [webcamRef]);

  useEffect(() => {
    getVideoDevices();
    if (imageDimensions === "fullscreen") {
      setImageSize({ height: 1280, width: 720 });
    } else if (imageDimensions === "1:1") {
      setImageSize({ height: 700, width: 700 });
    } else if (imageDimensions === "3:4") {
      setImageSize({ height: 720, width: 480 });
    } else if (imageDimensions === "4:3") {
      setImageSize({ height: 640, width: 480 });
    }
  }, [getVideoDevices, imageDimensions]);
  setTimeout(draw, 33);
  return (
    <div className="mainApp">
      {url ? (
        <div
          style={{
            height:
              imageDimensions === "fullscreen"
                ? "100%"
                : imageDimensions === "1:1"
                ? "50%"
                : imageDimensions === "3:4"
                ? "60%"
                : "80%",
            width:
              imageDimensions === "fullscreen"
                ? "100%"
                : imageDimensions === "1:1"
                ? "50%"
                : imageDimensions === "3:4"
                ? "80%"
                : "60%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img className="imageTaken" src={url} alt="imageTaken" />
          <a className="downloadBtn" download={true} href={url}>
            Download
          </a>
        </div>
      ) : (
        <div className="appMainDisplay">
          <Webcam
            ref={webcamRef}
            className="videoDisplay"
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              deviceId: deviceId,
              facingMode: "user",
            }}
            mirrored={mirrorCheck}
            screenshotQuality={1}
            minScreenshotHeight={imageSize.height}
            minScreenshotWidth={imageSize.width}
            style={{
              height:
                imageDimensions === "fullscreen"
                  ? "100%"
                  : imageDimensions === "1:1"
                  ? "50%"
                  : imageDimensions === "3:4"
                  ? "60%"
                  : "80%",
              width:
                imageDimensions === "fullscreen"
                  ? "100%"
                  : imageDimensions === "1:1"
                  ? "50%"
                  : imageDimensions === "3:4"
                  ? "80%"
                  : "60%",

              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <canvas
            className={
              mirrorCheck ? "canvasDisplay mirrorCam" : "canvasDisplay"
            }
            style={{
              height:
                imageDimensions === "fullscreen"
                  ? "100%"
                  : imageDimensions === "1:1"
                  ? "50%"
                  : imageDimensions === "3:4"
                  ? "60%"
                  : "80%",
              width:
                imageDimensions === "fullscreen"
                  ? "100%"
                  : imageDimensions === "1:1"
                  ? "50%"
                  : imageDimensions === "3:4"
                  ? "80%"
                  : "60%",
            }}
            ref={canvasRef}
          />
          <div className="cameraOptions">
            <button className="clickImage" onClick={capturePhoto}>
              <BsStopFill className="stopIcon" />
            </button>
            <button
              className="clickMirror"
              onClick={() => setMirrorCheck(!mirrorCheck)}
            >
              <GoMirror className="mirrorIcon" />
            </button>
            {isMobile && videoDevices > 1 && (
              <button className="toggleCamera" onClick={toggleCamera}>
                <TiArrowRepeat className="toggleCameraIcon" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Camera;
