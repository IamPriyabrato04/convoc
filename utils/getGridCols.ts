export function getGridCols(count: number): string {
    if (count <= 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count <= 4) return "grid-cols-2 md:grid-cols-2 lg:grid-cols-2";
    if (count <= 6) return "grid-cols-2 md:grid-cols-3";
    if (count <= 9) return "grid-cols-2 md:grid-cols-3 lg:grid-cols-3";
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
}
