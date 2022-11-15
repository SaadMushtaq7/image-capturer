import React, { FC, useEffect, useRef, useState, useCallback } from "react";
import { isMobile } from "react-device-detect";
import { BsStopFill } from "react-icons/bs";
import { GoMirror } from "react-icons/go";
import { TiArrowRepeat } from "react-icons/ti";

interface ImageCapturerProps {
  imageDimensions: "3:4" | "" | "fullscreen" | "1:1" | "4:3";
}

const ImageCapturer: FC<ImageCapturerProps> = ({ imageDimensions }) => {
  const inputVideoRef = useRef<any>();
  const canvasRef = useRef<any>();
  const contextRef = useRef<any>();
  const webcamDrawRef = useRef<any>();

  const [cameraType, setCameraType] = useState<any>();
  const [deviceId, setDeviceId] = useState<any>({});
  const [videoDevices, setVideoDevices] = useState<any>([]);
  const [imageUrl, setImageUrl] = useState<string>("");
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

  const takePhoto = () => {
    clearInterval(webcamDrawRef.current);
    canvasRef.current
      .getContext("2d")
      .drawImage(
        inputVideoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    let imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
    setImageUrl(imageDataUrl);
    inputVideoRef.current.srcObject.getTracks().forEach((track: any) => {
      track.stop();
    });
  };

  const draw = (video: any, context: any) => {
    contextRef.current.drawImage(
      video,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  useEffect(() => {
    contextRef.current = canvasRef.current.getContext("2d");

    navigator.mediaDevices
      .getUserMedia({
        video: { deviceId, height: 1200, width: 600 },
        audio: false,
      })
      .then(async (stream) => {
        inputVideoRef.current.srcObject = stream;
        await inputVideoRef.current.play();
      });

    webcamDrawRef.current = setInterval(() => {
      draw(inputVideoRef.current, contextRef);
    }, 100);

    getVideoDevices();
  }, [deviceId, getVideoDevices]);

  return (
    <div className="mainApp">
      {imageUrl ? (
        <>
          <img
            className={
              mirrorCheck ? "imageTaken mirroredImageTaken" : "imageTaken"
            }
            src={imageUrl}
            alt="imageTaken"
          />
          <a className="downloadBtn" download={true} href={imageUrl}>
            Download
          </a>
        </>
      ) : (
        <>
          <div
            style={{ height: "1200px", width: "500px" }}
            className="appMainDisplay"
          >
            <video
              className={
                mirrorCheck ? "videoDisplay mirrorCam" : "videoDisplay"
              }
              ref={inputVideoRef}
            />
            <canvas
              className={
                mirrorCheck ? "canvasDisplay mirrorCam" : "canvasDisplay"
              }
              ref={canvasRef}
            />
            <div className="cameraOptions">
              <button className="clickImage" onClick={takePhoto}>
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
        </>
      )}
    </div>
  );
};

export default ImageCapturer;
