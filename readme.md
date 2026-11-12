# Acode Preact plugin example

Example Acode plugin that uses Preact for its page UI.

Use this when your plugin needs a custom page. For a blank language starter, use the official [TypeScript](https://github.com/Acode-Foundation/AcodeTSTemplate) or [JavaScript](https://github.com/Acode-Foundation/acode-plugin) templates instead.

Read the [plugin docs](https://docs.acode.app/) before you start.

## What it shows

- Mounting Preact onto Acode's `$page`
- Theme-aware CSS with Acode variables
- Calling `toast` and `pushNotification` from a component
- A command-palette entry that opens the page
- Cleaning up the tree, styles, and command on unmount

## Layout

```
src/main.ts        plugin init / unmount
src/ui/App.tsx     page UI
src/ui/mount.tsx   render / unmount helpers
src/ui/styles.css  theme-aware styles
```

## Scripts

```sh
npm install
npm run dev        # watch, serve on :3000, rebuild plugin.zip
npm run typecheck
npm run build      # typecheck, bundle, write plugin.zip
```

In Acode, install from **Plugins → + → Remote** using:

```
http://<your-ip>:3000/plugin.zip
```

Open the page from the plugin list, or from the command palette (`Open Preact Example`).
