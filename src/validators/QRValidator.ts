import { Request, Response } from "express";
import { Result } from "../utils/types";

type qrVersionType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40;

type hexColorString = `#${string}`;

type qrErrorCorrectionType = 'L' | 'M' | 'Q' | 'H';

type qrMaskType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type QRRequestBody = {
    payload: string;
    version?: qrVersionType;
    lightcolor?: hexColorString;
    darkcolor?: hexColorString;
    error?: qrErrorCorrectionType;
    mask?: qrMaskType;
}

const validateQRRequest = (req: Request, res: Response): Result<QRRequestBody, string> => {

    const {
        payload,
        version,
        lightcolor,
        darkcolor,
        error,
        mask,
    } = req.body;

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

    if (error !== undefined && !['L', 'M', 'Q', 'H'].includes(error)) {
        return { success: false, error: "'error' must be one of 'L', 'M', 'Q', 'H'" };
    }

    if (mask !== undefined && (!Number.isInteger(mask) || mask < 0 || mask > 7)) {
        return { success: false, error: "'mask' must be an integer between 0 and 7" };
    }

    return { success: true, data: { payload, version, lightcolor, darkcolor, error, mask } };
}

export default validateQRRequest;
