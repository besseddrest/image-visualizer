import { useEffect, useRef } from "react";
import "../styles/visualizer.scss";

const initCanvas = (canvas) => {
  if (!canvas) return;
  
  const [width, height] = [1280, 862];
  const context = canvas.getContext("2d");
  context.canvas.width = width;
  context.canvas.height = height;
  context.globalAlpha = 0;
  return context;
}

const imageLoader = (context, image) => {
  const [width, height] = [1280, 862]
  context.drawImage(image, 0, 0, width, height);
  
  const intervalID = setInterval(() => {
    if (context.globalAlpha > .9) {
      clearInterval(intervalID);
    }
    context.globalAlpha += 0.075;
    context.clearRect(0, 0, width, height)
    context.drawImage(image, 0, 0, width, height);
  }, 100);
}

const Visualizer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const image = new Image();
    image.style.objectFit = "cover";
    image.style.objectPosition = "center";
    image.onload = () => {
      const context = initCanvas(canvasRef.current, image);
      imageLoader(context, image);
    }
    image.src = "./src/assets/images/dan-meyers.jpg";
  }, []);

  return (
    <div className="container">
      <canvas id="canvas" ref={canvasRef} className="canvas">
        <img className="canvas" src="./src/assets/images/dan-meyers.jpg" loading="lazy" />
      </canvas>
    </div>
  )
}

export default Visualizer;

