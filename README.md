# Text Crop Figma Plugin

Text Crop is a plugin that removes the whitespace around text boxes.No longer will you have extra leading above and below your text. Layout designs in the way you intended.

This plugin creates a component, which dynamically resizes to ensure text is the right size. You can use any styles you want in the component, just hit 'Crop'.




## How to use?

1. Install dependencies with `npm i`.
2. Run `npm run dev` and a folder named `dist` will be created.
3. In the Figma desktop app, click on **Create new plugin** / **Link existing plugin** and point it to the `manifest.json` in this project.
4. Now you can edit the main Figma code from `src/code.ts` and the UI code from `src/ui.vue`. Hitting save will auto-reload the build so you can see your changes right away.
5. When you're ready to publish the plugin, run `npm run build` to create a production build.
