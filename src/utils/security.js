/**
 * Security & Sanitization Utilities
 * Defends against XSS, javascript: URI injection, reverse tabnabbing,
 * and insecure storage access exceptions.
 */

const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|tel):|\/|#)/i;

/**
 * Sanitizes a URL before injecting it into an <a href="..."> tag.
 * Rejects javascript:, data:, vbscript: and any unsafe protocols.
 * 
 * @param {string} url - The URL to sanitize
 * @param {string} fallback - Optional fallback URL (default: "")
 * @returns {string} Safe URL or fallback
 */
export const sanitizeUrl = (url, fallback = "") => {
	if (!url || typeof url !== "string") return fallback;
	const trimmed = url.trim();

	// Reject whitespace-embedded controls or protocol attempts
	if (SAFE_URL_PATTERN.test(trimmed)) {
		return trimmed;
	}

	return fallback;
};

/**
 * Safe wrapper around localStorage.getItem to prevent DOMException / SecurityError
 * in sandboxed iframes or private browsing modes with strict storage partitioning.
 */
export const safeStorageGet = (key, fallback = null) => {
	try {
		if (typeof window !== "undefined" && window.localStorage) {
			const val = window.localStorage.getItem(key);
			return val !== null ? val : fallback;
		}
	} catch (e) {
		console.warn(`[Security] LocalStorage access blocked for key "${key}":`, e.message);
	}
	return fallback;
};

/**
 * Safe wrapper around localStorage.setItem to prevent DOMException / SecurityError.
 */
export const safeStorageSet = (key, value) => {
	try {
		if (typeof window !== "undefined" && window.localStorage) {
			window.localStorage.setItem(key, value);
			return true;
		}
	} catch (e) {
		console.warn(`[Security] LocalStorage write blocked for key "${key}":`, e.message);
	}
	return false;
};
