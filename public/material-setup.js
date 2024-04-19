import "@material/web/all.js";
import { styles as typescaleStyles } from "@material/web/typography/md-typescale-styles.js";

(() => {
  document.adoptedStyleSheets.push(typescaleStyles.styleSheet);

  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (systemDark) {
    document.body.classList.add("dark");
  }
})();
