import { useState } from "react"

export default function ColorSlider({ name, callback, mouseUp }) {
  const [value, setValue] = useState(0);

  const handleValueChange = (value) => {
    setValue(value);
    if (callback) {
      callback(value);
    }
  }

  const handleMouseUp = (value) => {
    if (mouseUp) {
      mouseUp(value);
    }
  }

  return (
    <div className="slider">
      <label>{ name }: </label>
      <input 
        type="range" 
        value={value} 
        min={0} 
        max={255} 
        onChange={ ev => handleValueChange(parseInt(ev.target.value))}
        onMouseUp={ ev => handleMouseUp(parseInt(ev.target.value)) } /> { value }
    </div>
  )
}