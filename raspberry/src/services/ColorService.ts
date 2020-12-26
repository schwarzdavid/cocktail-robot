import {clamp} from 'lodash';

export interface ColorObject {
    r: number,
    g: number,
    b: number
}

export type Color = ColorObject | string | number[]

export class ColorService {
    private static readonly COLOR_MIN = 0;
    private static readonly COLOR_MAX = 255;
    private static readonly HEX_REGEX = /^#?([0-9A-F]{3}){1,2}$/i;

    private readonly startColor: ColorObject;
    private readonly endColor: ColorObject;

    constructor(startColor: Color, endColor: Color) {
        this.startColor = ColorService.parseColorToColorObject(startColor);
        this.endColor = ColorService.parseColorToColorObject(endColor);
    }

    private static parseColorToColorObject(color: Color): ColorObject {
        if (typeof color === 'string') {
            return this.parseStringToColorObject(color);
        }
        if (Array.isArray(color)) {
            return this.parseIntArrayToColorObject(color);
        }
        return color;
    }

    private static parseStringToColorObject(color: string): ColorObject {
        if (!this.HEX_REGEX.test(color)) {
            throw new Error(`Invalid hex color. Got: ${color}`);
        }
        let colorString = color;
        if (colorString.charAt(0) === '#') {
            colorString = colorString.substr(1);
        }
        const colorParts: number[] = [];
        for (let i = 0; i < colorString.length; i += colorString.length / 3) {
            let colorPart = colorString.substr(i, colorString.length / 3);
            if (colorPart.length === 1) {
                colorPart = colorPart.repeat(2);
            }
            const colorValue = parseInt(colorPart, 16);
            colorParts.push(colorValue);
        }
        return this.parseIntArrayToColorObject(colorParts);
    }

    private static parseIntArrayToColorObject(color: number[]): ColorObject {
        if (color.length < 3) {
            throw new Error('Color array must have atleast 3 values');
        }
        return {
            r: clamp(color[0], this.COLOR_MIN, this.COLOR_MAX),
            g: clamp(color[1], this.COLOR_MIN, this.COLOR_MAX),
            b: clamp(color[2], this.COLOR_MIN, this.COLOR_MAX)
        };
    }

    getColorByProgress(value: number): string {
        const clampedValue = clamp(value, 0, 1);
        const outputColor: string[] = [];
        (['r', 'g', 'b'] as Array<keyof ColorObject>).forEach(key => {
            const colorDiff = this.endColor[key] - this.startColor[key];
            const outputColorValue = Math.round(colorDiff * clampedValue + this.startColor[key]);
            outputColor.push(outputColorValue.toString(16).padStart(2, '0'));
        });
        return outputColor.reduce((output, color) => output + color, '#');
    }

    getColorByMappedValue(value: number, max: number, min = 0): string {
        const percentValue = (value - min) / (max - min);
        return this.getColorByProgress(percentValue);
    }
}
