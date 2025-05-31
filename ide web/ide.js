/**
 * Multi-File Web IDE
 * Developed by Mohammad Auf
 * AI Developer & Software Enthusiast
 */

let editor;
let currentLang = "html";

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
  editor = monaco.editor.create(document.getElementById("editor"), {
    value: codeData.html,
    language: "html",
    theme: "vs-dark",
    automaticLayout: true,
    fontSize: 14,
    minimap: { enabled: false },
  });

  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      codeData[currentLang] = editor.getValue();
      tabs.forEach((b) => b.classList.remove("active"));
      tab.classList.add("active");
      currentLang = tab.getAttribute("data-lang");
      editor.setValue(codeData[currentLang]);
      monaco.editor.setModelLanguage(editor.getModel(), currentLang);
    });
  });

  document.getElementById("run-btn").addEventListener("click", () => {
    codeData[currentLang] = editor.getValue();

    const fullHtml = `
${codeData.html.replace(/<\/body>/i, `
  <style>
  ${codeData.css}
  </style>
  <script>
  ${codeData.js}
  </script>
  </body>`)}`;

    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  });
});
