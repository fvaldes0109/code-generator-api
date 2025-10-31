import { Request, Response } from "express";
import { Result } from "../utils/types";

type qrVersionType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40;

type hexColorString = `#${string}`;

export type QRRequestBody = {
    payload: string;
    version?: qrVersionType;
    lightcolor?: hexColorString;
    darkcolor?: hexColorString;
}

const validateQRRequest = (req: Request, res: Response): Result<QRRequestBody, string> => {

    const { payload, version, lightcolor, darkcolor } = req.body;

    if (!payload) {
        return { success: false, error: "Missing 'payload' in request body" };
    }

    if (version !== undefined && (!Number.isInteger(version) || version < 1 || version > 40)) {
        return { success: false, error: "'version' must be an integer between 1 and 40" };
    }

    const hexColorRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;

    if (lightcolor !== undefined && !hexColorRegex.test(lightcolor)) {
        return { success: false, error: "'lightcolor' must be a valid hex color string" };
    }

    if (darkcolor !== undefined && !hexColorRegex.test(darkcolor)) {
        return { success: false, error: "'darkcolor' must be a valid hex color string" };
    }

    return { success: true, data: { payload, version, lightcolor, darkcolor } };
}

export default validateQRRequest;
