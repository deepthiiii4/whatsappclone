import { createCipheriv, randomBytes } from "crypto";

enum ErrorCode {
	success = 0, // "success"
	appIDInvalid = 1, // "appID invalid"
	userIDInvalid = 3, // "userID invalid"
	secretInvalid = 5, // "secret must be a 32 byte string"
	effectiveTimeInSecondsInvalid = 6, // "effectiveTimeInSeconds invalid"
}

function RndNum(a: number, b: number): number {
	// Generate a random number within the range of a to b
	return Math.ceil((a + (b - a)) * Math.random());
}

// Generate a random number within the range of int32
function makeNonce(): number {
	return RndNum(-2147483648, 2147483647);
}

function makeRandomIv(): Buffer {
	// Generate a random 16-byte string for IV
	return randomBytes(16);
}

// Determine the algorithm based on the length of the key, only supports 16, 24, or 32 bytes
function getAlgorithm(key: Buffer): string {
	switch (key.length) {
		case 16:
			return "aes-128-cbc";
		case 24:
			return "aes-192-cbc";
		case 32:
			return "aes-256-cbc";
	}

	throw new Error("Invalid key length: " + key.length);
}

// AES encryption, using mode: CBC/PKCS5Padding
function aesEncrypt(plainText: string, key: Buffer, iv: Buffer): Buffer {
	const cipher = createCipheriv(getAlgorithm(key), key, iv);
	cipher.setAutoPadding(true);
	const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
	return encrypted;
}

export function generateToken04(
	appId: number,
	userId: string,
	secret: string,
	effectiveTimeInSeconds: number,
	payload?: string
): string {
	if (!appId || typeof appId !== "number") {
		throw {
			errorCode: ErrorCode.appIDInvalid,
			errorMessage: "appID invalid",
		};
	}

	if (!userId || typeof userId !== "string") {
		throw {
			errorCode: ErrorCode.userIDInvalid,
			errorMessage: "userId invalid",
		};
	}

	if (!secret || typeof secret !== "string" || secret.length !== 32) {
		throw {
			errorCode: ErrorCode.secretInvalid,
			errorMessage: "secret must be a 32 byte string",
		};
	}

	if (!effectiveTimeInSeconds || typeof effectiveTimeInSeconds !== "number") {
		throw {
			errorCode: ErrorCode.effectiveTimeInSecondsInvalid,
			errorMessage: "effectiveTimeInSeconds invalid",
		};
	}

	const createTime = Math.floor(new Date().getTime() / 1000);
	const tokenInfo = {
		app_id: appId,
		user_id: userId,
		nonce: makeNonce(),
		ctime: createTime,
		expire: createTime + effectiveTimeInSeconds,
		payload: payload || "",
	};

	// Convert token information to JSON
	const plainText = JSON.stringify(tokenInfo);

	// Generate a random IV
	const iv = makeRandomIv();

	// Encrypt
	const keyBuffer = Buffer.from(secret, "utf8"); // Ensure the key is a Buffer
	const encryptedBuf = aesEncrypt(plainText, keyBuffer, iv);

	// Token binary splicing: expiration time + Base64(iv length + iv + encrypted information length + encrypted information)
	const b1 = Buffer.alloc(8);
	const b2 = Buffer.alloc(2);
	const b3 = Buffer.alloc(2);

	b1.writeBigUInt64BE(BigInt(tokenInfo.expire));
	b2.writeUInt16BE(iv.length);
	b3.writeUInt16BE(encryptedBuf.length);

	const buf = Buffer.concat([b1, b2, iv, b3, encryptedBuf]);

	// Encode to base64
	return "04" + buf.toString("base64");
}
