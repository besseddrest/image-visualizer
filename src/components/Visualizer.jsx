import { useEffect, useRef, useState } from "react";
import "../styles/visualizer.scss";
import ColorSlider from "./ColorSlider";

const initCanvas = (canvas) => {
  if (!canvas) return;
  
  const [width, height] = [1280, 862];
  const context = canvas.getContext("2d");
  context.canvas.width = width;
  context.canvas.height = height;
  return context;
}

const imageLoader = (context, image) => {
  const [width, height] = [1280, 862]
  context.drawImage(image, 0, 0, width, height);
  return context.getImageData(0, 0, width, height).data;
}



const Visualizer = () => {
  const [originalPixels, setOriginalPixels] = useState([]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [initValues, setInitValues] = useState([
    { name: "R", value: 0 },
    { name: "B", value: 0 },
    { name: "G", value: 0 }
  ]);
  const canvasRef = useRef(null);
  const colorsRef = useRef([0, 0, 0]);

  useEffect(() => {
    const image = new Image();
    image.style.objectFit = "cover";
    image.style.objectPosition = "center";
    image.onload = () => {
      const context = initCanvas(canvasRef.current, image);
      setOriginalPixels(imageLoader(context, image));
      setIsImageLoaded(true);
    }
    image.src = "./src/assets/images/dan-meyers.jpg";
  }, []);

  const updateColorRefs = (val, index) => {
    const newRgb = [...colorsRef.current];
    newRgb[index] = val;
    colorsRef.current = newRgb;
    console.log(colorsRef.current);
  }

  const updateColor = (canvas, originalPixels, value, index) => {
    const [width, height] = [canvas.width, canvas.height];
    const context = canvas.getContext("2d");
    const currImageData = context.createImageData(width, height);
    const currPixelData = currImageData.data;
  
    for (let i = 0; i < currPixelData.length; i++) {
      let rgbaIndex = i % 4;
      
      if (rgbaIndex === 3) {
        currPixelData[i] = originalPixels[i];
        continue;
      }
      
      if (rgbaIndex === index) {
        currPixelData[i] = originalPixels[i] + value;
        continue;
      }
      
      currPixelData[i] = originalPixels[i] + colorsRef.current[rgbaIndex];
    }
  
    canvas.getContext("2d").putImageData(currImageData, 0, 0);
  }

  const getPixelData = (canvas) => {
    const [width, height] = [canvas.width, canvas.height];
    const context = canvas.getContext("2d");
    const imageData = context.getImageData(0, 0, width, height).data;
    const subset = imageData.slice(0, 23);
    console.log(subset);
    console.log(colorsRef.current);
  }

  return (
    <>
      <div className="container">
        <div className="controls">
          {
            initValues.map((color, i) => <ColorSlider key={i} name={color.name} callback={val => updateColor(canvasRef.current, originalPixels, val, i)} mouseUp={val => updateColorRefs(val, i) } />)
          }
        </div>
        <canvas id="canvas" ref={canvasRef} className={`canvas ${isImageLoaded ? 'loaded' : ''}`}>
          <img className="canvas" src="./src/assets/images/dan-meyers.jpg" loading="lazy" />
        </canvas>
      </div>
    </>
  )
}

export default Visualizer;

