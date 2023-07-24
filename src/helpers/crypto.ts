import { createHash, randomBytes } from 'node:crypto';

export const hash = function(raw: string){
	const sha256 = createHash('sha256');
	const hash = sha256.update(raw).digest('base64');
	return hash;
};

export const hashCompare = (raw: string, hashed: string) => hash(raw) === hashed;

export const randomString = (bytesCount: number = 16) => randomBytes(bytesCount).toString('hex');
