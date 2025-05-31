/**
 * Multi-File Web IDE
 * Developed by Mohammad Auf
 * AI Developer & Software Enthusiast
 * 
 * This script handles Monaco editor with multi-tab support (HTML, CSS, JS),
 * saves code per tab, and runs combined code in a new window.
 */

let editor;
let currentLang = "html";

// Store code of each editor tab separately
const codeData = {
  html: `<!-- Write your HTML here -->
<!DOCTYPE html>
<html>
  <head>
    <title>My Web IDE</title>
  </head>
  <body>
    <h1>Hello from Mohammad Auf IDE</h1>
  </body>
</html>`,
  css: `/* Write your CSS here */
body {
  background-color: #fafafa;
  font-family: Arial, sans-serif;
  color: #333;
}`,
  js: `// Write your JavaScript here
console.log("Hello from JS editor");`
};

require.config({ paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs" } });

require(["vs/editor/editor.main"], function () {
  // Initialize Monaco editor with HTML tab code by default
  editor = monaco.editor.create(document.getElementById("editor"), {
    value: codeData.html,
    language: "html",
    theme: "vs-dark",
    automaticLayout: true,
    fontSize: 14,
    minimap: { enabled: false },
  });

  // Tab buttons functionality
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Save current editor content before switching
      codeData[currentLang] = editor.getValue();

      // Remove active class from all tabs
      tabs.forEach((b) => b.classList.remove("active"));

      // Set clicked tab active
      tab.classList.add("active");

      // Change current language
      currentLang = tab.getAttribute("data-lang");

      // Update editor content and language mode
      editor.setValue(codeData[currentLang]);
      monaco.editor.setModelLanguage(editor.getModel(), currentLang);
    });
  });

  // Run button functionality
  document.getElementById("run-btn").addEventListener("click", () => {
    // Save current editor content before running
    codeData[currentLang] = editor.getValue();

    // Combine HTML, CSS, JS into a single HTML string
    const fullHtml = `
${codeData.html.replace(/<\/body>/i, `
  <style>
  ${codeData.css}
  </style>
  <script>
  ${codeData.js}
  </script>
  </body>`)}
    `;

    // Create a blob from the combined code and open it in a new tab
    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  });
});
