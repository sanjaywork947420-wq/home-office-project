// src/styles/colorsToCSS.ts
import { colors } from "./ColorsObject";

function generateCSSVariables(obj: Record<string, any>, prefix = ""): string {
  let result = "";
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "string") {
      result += `--${prefix}${key}: ${value};\n`;
    } else {
      result += generateCSSVariables(value, prefix + key + "-");
    }
  }
  console.log(result)
  return result;
}

const cssVariables = `:root {\n${generateCSSVariables(colors)}}\n`;

export default cssVariables;
