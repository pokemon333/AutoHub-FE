import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import svgLoader from 'vite-svg-loader'
import { url } from 'node:inspector'
// import { htmlPrerender } from "vite-plugin-html-prerender";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    // htmlPrerender({
    //     /**
    //      * Required: Output directory of `vite build`.
    //      */
    //     staticDir: path.join(__dirname, "dist"),
    
    //     /**
    //      * Required: List of routes to pre-render.
    //      */
    //     routes: ["/","/cars/*/user"],

    //     /**
    //      * Optional: Query selector to wait for. Defaults to `#root`.
    //      */
    //     selector: "#app",

    //     /**
    //      * Optional: To minify html. Uses https://github.com/kangax/html-minifier.
    //      */
    //     minify: {
    //         collapseBooleanAttributes: true,
    //         collapseWhitespace: true,
    //         decodeEntities: true,
    //         keepClosingSlash: true,
    //         sortAttributes: true
    //     }
    // })
  ],
  resolve : {
    alias : {
      '@' : fileURLToPath(new URL('./src', import.meta.url)),
      'core@' : fileURLToPath(new URL('./src/app/core', import.meta.url)),
      'car@' : fileURLToPath(new URL('./src/app/modules/car', import.meta.url)),
      'evse@' : fileURLToPath(new URL('./src/app/modules/evse', import.meta.url)),
      'landing@':fileURLToPath(new URL('./src/app/modules/landing',import.meta.url)),
      'search@':fileURLToPath(new URL('./src/app/modules/car/modules/search',import.meta.url)),
      'advanceSearch@':fileURLToPath(new URL('./src/app/modules/car/modules/advanceSearch',import.meta.url)),
      'asset@'  : fileURLToPath(new URL('./src/assets',import.meta.url)),
      'auth@'   : fileURLToPath(new URL('./src/app/modules/auth',import.meta.url)),
      "dealer@" : fileURLToPath(new URL('./src/app/modules/dealer',import.meta.url)),
      "dealerAdvanceSearch@" : fileURLToPath(new URL('./src/app/modules/dealer/modules/advanceSearch',import.meta.url))
    }
  }
})
