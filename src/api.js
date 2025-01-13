function sendReset(frame, state) {
  if(!state) {
    state = {
      definitionsAtLastRun: false,
      interactionsSinceLastRun: [],
      editorContents: "use context starter2024",
      replContents: ""
    };
  }
  const payload = {
    data: {
      type: 'reset',
      state: JSON.stringify(state)
    },
    protocol: 'pyret'
  };
  console.log("Sending", payload);
  frame.contentWindow.postMessage(payload, '*');
}
function directPostMessage(frame, message) {
  frame.contentWindow.postMessage(message);
}

function makeEmbed(id, container) {
  const frame = document.createElement("iframe");
  frame.id = id;
  frame.src = `https://pyret-vmt-dfb765867402.herokuapp.com/editor#controlled=true`;
  frame.width = "100%";
  container.appendChild(frame);

  const { promise, resolve, reject } = Promise.withResolvers();
  setTimeout(() => reject(new Error("Timeout waiting for Pyret to load")), 10000);

  window.addEventListener('message', message => {
    if(message.data.protocol !== 'pyret') {
      return;
    }
    const pyretMessage = message.data;
    if(pyretMessage.data.type === 'pyret-init') {
      resolve(makeEmbedAPI(frame));
    }
  });
  return promise;
}

function makeEmbedAPI(frame) {
  return {
    sendReset: (state) => sendReset(frame, state),
    postMessage: (message) => directPostMessage(frame, message),
    getFrame: () => frame,
  }
}

