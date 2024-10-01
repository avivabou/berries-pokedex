export function calcGreenToRedFading(percentage: number) {
    const result = {red: 255, green: 0}
    if (percentage === 1){
        result.red = 0;
        result.green = 255;
    } else if (percentage > 0) {
        result.red = Math.round(510 * (1 - percentage));
        result.green = Math.round(320 * percentage);
    }
    return result;
} 