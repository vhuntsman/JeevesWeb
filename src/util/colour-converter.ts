export class ColourConverter {
    private static  hue2rgb(p: number, q: number, t: number): number {
        if (t < 0) { t += 1; }
        if (t > 1) { t -= 1; }
        if (t < 1 / 6) { return p + (q - p) * 6 * t; }
        if (t < 1 / 2) { return q; }
        if (t < 2 / 3) { return p + (q - p) * (2 / 3 - t) * 6; }
        return p;
    }

    public static hslToRgb(h: number, s: number, l: number): string {
        let r: number;
        let g: number;
        let b: number;

        if (s === 0){
            r = g = b = l; // achromatic
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = this.hue2rgb(p, q, h + 1 / 3);
            g = this.hue2rgb(p, q, h);
            b = this.hue2rgb(p, q, h - 1 / 3);
        }

        const rString = ('00' + Math.round(r * 255).toString(16)).slice(-2);
        const gString = ('00' + Math.round(g * 255).toString(16)).slice(-2);
        const bString = ('00' + Math.round(b * 255).toString(16)).slice(-2);
        return rString + gString + bString;
    }

    public static rgbToHsl(r: number, g: number, b: number): Array<number> {
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h: number;
        let s: number;
        const l = (max + min) / 2;

        if (max === min){
            h = s = 0; // achromatic
        }else{
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h, s, l];
    }
}
