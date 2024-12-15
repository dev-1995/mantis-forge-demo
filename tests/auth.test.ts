import { describe, it, expect } from 'vitest';
import { generateToken, verifyToken } from '../src/auth';
import { Request, Response, NextFunction } from 'express';

describe('Auth', () => {
    it('should generate a token', () => {
        const payload = { userId: 1 };
        const token = generateToken(payload);
        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
    });

    it('should verify a valid token', () => {
        const payload = { userId: 1 };
        const token = generateToken(payload);

        const req = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        } as Request;
        const res = {} as Response;
        const next = vi.fn() as NextFunction;

        verifyToken(req, res, next);

        expect(next).toHaveBeenCalled();
        expect((req as any).user).toBeDefined();
        expect((req as any).user.userId).toBe(1);
    });

    it('should reject an invalid token', () => {
        const req = {
            headers: {
                authorization: 'Bearer invalid-token',
            },
        } as Request;
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        } as unknown as Response;
        const next = vi.fn() as NextFunction;

        verifyToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
        expect(next).not.toHaveBeenCalled();
    });
});
