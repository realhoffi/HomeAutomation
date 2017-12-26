export function getGermanDateString(date: Date): string {
    if (!date) {
        return "";
    }
    return date.toLocaleString("de-DE", { year: "numeric", month: "2-digit", day: "2-digit" });
}