import { useEffect, useRef, useState } from "react";
import "../styles/visualizer.scss";

const initCanvas = (canvas) => {
  if (!canvas) return;

  // TODO: responsive canvas dimensions
  const [width, height] = [1152, 776];
  const context = canvas.getContext("2d");
  context.canvas.width = width;
  context.canvas.height = height;
  return context;
}

const imageLoader = (context, image) => {
  const [width, height] = [1152, 776]
  context.drawImage(image, 0, 0, width, height);
}

const Visualizer = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const image = new Image();
    image.style.objectFit = "cover";
    image.style.objectPosition = "center";
    image.onload = () => {
      const context = initCanvas(canvasRef.current, image);
      imageLoader(context, image);
      setIsImageLoaded(true);
    }
    image.src = "./src/assets/images/dan-meyers.jpg";
  }, []);

  return (
    <div className="container">
      <canvas id="canvas" ref={canvasRef} className={`canvas ${isImageLoaded ? 'loaded' : ''}`}>
        <img className="canvas" src="./src/assets/images/dan-meyers-1152.jpg" loading="lazy" />
      </canvas>
    </div>
  )
}

export default Visualizer;

