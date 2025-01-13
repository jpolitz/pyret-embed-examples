
function makeEmbed(id, container) {
  let messageNumber = 0;
  function sendReset(frame, state) {
    if(!state) {
      state = {
        definitionsAtLastRun: false,
        interactionsSinceLastRun: [],
        editorContents: "use context starter2024",
        replContents: ""
      };
    }
    state.messageNumber = 0;
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

  function gainControl(frame) {
    frame.contentWindow.postMessage({
      type: 'gainControl'
    }, '*');
  }

  function setInteractions(frame, text) {
    messageNumber += 1;
    const change = {
      from: { line: 0, ch: 0 },
      to: { line: 0, ch: 0 },
      text: [text],
      removed: [""]
    };
    const payload = {
      protocol: 'pyret',
      data: {
        type: 'changeRepl',
        change: change
      },
      state: { replContents: text, messageNumber }
    };
    frame.contentWindow.postMessage(payload, '*');
    gainControl(frame);
  }

  function directPostMessage(frame, message) {
    frame.contentWindow.postMessage(message);
  }

  const frame = document.createElement("iframe");
  frame.id = id;
  frame.src = `https://pyret-vmt-dfb765867402.herokuapp.com/editor#controlled=true`;
  frame.width = "100%";
  container.appendChild(frame);

  const { promise, resolve, reject } = Promise.withResolvers();
  setTimeout(() => reject(new Error("Timeout waiting for Pyret to load")), 60000);

  window.addEventListener('message', message => {
    if(message.data.protocol !== 'pyret') {
      return;
    }
    if(message.source !== frame.contentWindow) {
      return;
    }
    const pyretMessage = message.data;
    if(pyretMessage.data.type === 'pyret-init') {
      console.log("Sending gainControl", pyretMessage);
      gainControl(frame);
      resolve(makeEmbedAPI(frame));
    }
    else {
      messageNumber = pyretMessage.state.messageNumber;
    }
  });
  function makeEmbedAPI(frame) {
    return {
      sendReset: (state) => sendReset(frame, state),
      postMessage: (message) => directPostMessage(frame, message),
      getFrame: () => frame,
      setInteractions: (text) => setInteractions(frame, text)
    }
  }
  return promise;
}


