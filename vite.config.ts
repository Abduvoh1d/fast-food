import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            jsxImportSource: "@emotion/react",
        }),
    ],
    server: {
        port: 5050,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@src": path.resolve(__dirname, "./src"),
            "@api": path.resolve(__dirname, "./src/api"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@data": path.resolve(__dirname, "./src/data"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@hocs": path.resolve(__dirname, "./src/hocs"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@types": path.resolve(__dirname, "./src/types"),
            "@queries": path.resolve(__dirname, "./src/queries"),
            "@routes": path.resolve(__dirname, "./src/routes"),
            "@styles": path.resolve(__dirname, "./src/styles"),
            "@stores": path.resolve(__dirname, "./src/store"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@widgets": path.resolve(__dirname, "./src/widgets"),
        },
    },
});
