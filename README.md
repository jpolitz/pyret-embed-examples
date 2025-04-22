To use:

```
$ npm install --save git://github.com/jpolitz/pyret-embed-examples#main
# Copy node_modules/dist/ to where you serve static files
# From your website:
      <script src="/dist/pyret.js"></script>
      <div id="example1" class="embed-container"></div>
      <script>
async function example1() {
  const iframeContainer = document.getElementById("example1");
  const embed = await makeEmbed('basic1', iframeContainer, "/dist/build/web/editor.embed.html#hideFooter=true");

  embed.sendReset({
    definitionsAtLastRun: "use context starter2024\n\n'Hello!'",
    interactionsSinceLastRun: [],
    editorContents: "use context starter2024\n\n'Hello!'",
    replContents: ""
  });
}
example1();
      </script>
```



To see the examples in this repository:

```
$ git clone ...
$ npm install
$ python3 -m http.server # or your favorite static server
```

Then open [localhost:8000/examples/basic.html](http://localhost:8000/src/basic.html) in browser.
