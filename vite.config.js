import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/my-portfolio/",
	server: {
		headers: {
			"X-Content-Type-Options": "nosniff",
			"X-Frame-Options": "DENY",
			"Referrer-Policy": "strict-origin-when-cross-origin",
			"Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
			"Cross-Origin-Opener-Policy": "same-origin",
		},
	},
	preview: {
		headers: {
			"X-Content-Type-Options": "nosniff",
			"X-Frame-Options": "DENY",
			"Referrer-Policy": "strict-origin-when-cross-origin",
			"Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
			"Cross-Origin-Opener-Policy": "same-origin",
		},
	},
	build: {
		target: "es2020",
		cssCodeSplit: true,
		rollupOptions: {
			output: {
				manualChunks: {
					"vendor-react": ["react", "react-dom", "react-router-dom"],
					"vendor-motion": ["framer-motion"],
					"vendor-icons": ["react-icons"],
				},
			},
		},
	},
});
