({
  requires: [
    { "import-type": "dependency",
      protocol: "file",
      args: ["../../../pyret/src/arr/compiler/compile-lib.arr"]
    },
    { "import-type": "dependency",
      protocol: "file",
      args: ["../../../pyret/src/arr/compiler/compile-structs.arr"]
    },
    { "import-type": "dependency",
      protocol: "file",
      args: ["../../../pyret/src/arr/compiler/locators/builtin.arr"]
    },
    { "import-type": "dependency",
      protocol: "file",
      args: ["../../../pyret/src/arr/compiler/js-of-pyret.arr"]
    },
    { "import-type": "builtin", name: "builtin-modules" },
    { "import-type": "builtin", name: "string-dict" },
  ],
  nativeRequires: [],
  provides: { },
  theModule: function(runtime, _, uri, CL, CM, BL, JSP, B, SD) {

  }

})