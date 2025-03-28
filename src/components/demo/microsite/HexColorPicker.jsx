import { HexAlphaColorPicker, HexColorInput } from "react-colorful";

export function ColorPicker({ color, setColor }) {
    return (
        <div className="mt-5">
            <HexAlphaColorPicker color={color} onChange={setColor} />
            <HexColorInput alpha="true" prefixed="true" className="border-solid border-2 rounded-md" color={color} onChange={setColor} />
        </div>    
    );
};