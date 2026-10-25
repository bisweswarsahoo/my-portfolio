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
		},
	},
	preview: {
		headers: {
			"X-Content-Type-Options": "nosniff",
			"X-Frame-Options": "DENY",
			"Referrer-Policy": "strict-origin-when-cross-origin",
			"Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
		},
	},
	build: {
		target: "es2020",
		cssCodeSplit: true,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						if (id.includes("react-dom") || id.includes("react/")) {
							return "vendor-react";
						}
						if (id.includes("react-icons")) {
							return "vendor-icons";
						}
					}
					if (id.includes("TechnologyIcons")) {
						return "tech-icons";
					}
				},
			},
		},
	},
});
