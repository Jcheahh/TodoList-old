export const main1 = "#FF7F50"; // Coral
// export const main2 = "indigo-500"; // Lighter purple
export const gray1 = "gray-700";
export const gray2 = "gray-600";
export const gray3 = "gray-300";
export const gray4 = "gray-200";
export const gray5 = "gray-100";

export function toText(color) {
    return `text-${color}`;
}

export function toBg(color) {
    return `bg-${color}`;
}

export function toHover(css) {
    return `hover:${css}`;
}
