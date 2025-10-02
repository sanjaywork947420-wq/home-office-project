import React from "react";
import { colors } from "../assets/ColorsObject";

export const ColorPalette: React.FC = () => {
  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        // alert(`Copied: ${text}`);
      },
      (err) => {
        console.error("Failed to copy!", err);
      }
    );
  };

  return (
    <div className="p-8 bg-amber-200 mt-[1800px]">
      <h1 className="text-3xl font-bold mb-6">Website Color Palette</h1>

      {Object.entries(colors).map(([category, group]) => (
        <div
          key={category}
          className="mb-10 p-4 rounded-lg"
          style={{ border: "2px solid black", backgroundColor: "#f9fafb" }}
        >
          <h2 className="text-2xl font-semibold mb-3 capitalize">{category}</h2>
          <div className="grid grid-cols-10 md:grid-cols-10 gap-5">
            {Object.entries(group).map(([name]) => (
              <div
                key={name}
                className="rounded-lg shadow-md overflow-hidden border border-black cursor-pointer"
                onClick={() => copyToClipboard(name)}
              >
                <div
                  className="h-18 w-full"
                  style={{ backgroundColor: `var(--color-${name})` }}
                />
                <div className="p-3 bg-white border-t border-black">
                  <p className="text-sm font-semibold">{name}</p>
                  <p className="text-xs text-gray-500">Click to copy</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
