export const main1 = "#FF7F50"; // Coral
export const gray1 = "gray-900";
export const gray2 = "gray-700";
export const gray3 = "gray-300";
export const gray4 = "gray-200";
export const gray5 = "gray-100";
export const red1 = "red-400";
export const red2 = "red-600";

export function toText(color) {
    return `text-${color}`;
}

export function toBg(color) {
    return `bg-${color}`;
}

export function toHover(css) {
    return `hover:${css}`;
}
