import {defineConfig} from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";

import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 8001,
        host: "0.0.0.0",
        proxy: {
            "^/api/v1": {
                target: "",
                ws: true,
                secure: false,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/v1/, "/api/v1"),
            },
        },
    },
    resolve: {
        // 这里的alias是路径别名，是运行阶段的替换路径，而tsconfig.json中的paths是编码阶段的提示，
        alias: [
            {
                find: "@/",
                replacement: resolve(__dirname, "./src/"),
            },
        ],
    },
    plugins: [
        uni(),
        // Components({
        //     resolvers: [VantResolver()],
        // }),
        AutoImport({
            imports: ["vue",], //自动导入相关函数
        }),
    ],
});
