import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const rootAssets = ["favicon.svg", "icons.svg"];

function srcRootAssetsPlugin() {
  return {
    name: "src-root-assets",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const name = req.url?.replace(/^\//, "");

        if (name && rootAssets.includes(name)) {
          res.setHeader("Content-Type", "image/svg+xml");
          res.end(readFileSync(resolve(__dirname, "src", name)));
          return;
        }

        next();
      });
    },
    generateBundle() {
      for (const name of rootAssets) {
        this.emitFile({
          type: "asset",
          fileName: name,
          source: readFileSync(resolve(__dirname, "src", name)),
        });
      }
    },
  };
}

export default defineConfig({
  publicDir: resolve(__dirname, "src/public"),
  plugins: [srcRootAssetsPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        designDocuments: resolve(__dirname, "pages/design-documents.html"),
        order: resolve(__dirname, "pages/order.html"),
        favorites: resolve(__dirname, "pages/favorites.html"),
        cart: resolve(__dirname, "pages/cart.html"),
      },
    },
  },
});
