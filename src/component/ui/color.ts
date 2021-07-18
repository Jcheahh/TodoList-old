export const main1 = "#FF7F50"; // Coral
export const gray1 = "gray-900";
export const gray2 = "gray-700";
export const gray3 = "gray-300";
export const gray4 = "gray-200";
export const gray5 = "gray-100";
export const red1 = "red-400";
export const red2 = "red-600";

const colors = [gray1, gray2, gray3, gray4, gray5, red1, red2] as const;

type Color = typeof colors[number];

export function toText(color: Color): string {
  return `text-${color}`;
}

export function toBg(color: Color): string {
  return `bg-${color}`;
}

export function toHover(css: Element): string {
  return `hover:${css}`;
}
