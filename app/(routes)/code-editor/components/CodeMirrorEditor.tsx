"use client";

import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { Extension } from "@codemirror/state";

interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: Extension;
}

const customTheme = EditorView.theme({
  "&": {
    fontSize: "15px",
    borderRadius: "0.375rem",
  },
  ".cm-gutters": {
    backgroundColor: "#f5f3ff",
    color: "#6366f1",
    border: "none",
    borderRight: "1px solid #e0e7ff",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "#ede9fe",
    color: "#4f46e5",
  },
  ".cm-activeLine": {
    backgroundColor: "rgba(99, 102, 241, 0.05)",
  },
  ".cm-selectionMatch": {
    backgroundColor: "rgba(139, 92, 246, 0.15)",
  },
  ".cm-cursor": {
    borderLeftColor: "#6366f1",
  },
  ".cm-content": {
    caretColor: "#6366f1",
  },
  ".cm-focused": {
    outline: "none",
  },
});

export default function CodeMirrorEditor({
  value,
  onChange,
  language = javascript(),
}: CodeMirrorEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full bg-gradient-to-r from-indigo-500/10 to-violet-500/10 flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-indigo-500/40 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden relative bg-gray-900 rounded-b-xl">
      <div className="absolute top-2 right-2 z-10 flex space-x-1.5">
        <div className="h-3 w-3 rounded-full bg-red-400"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
        <div className="h-3 w-3 rounded-full bg-green-400"></div>
      </div>
      
      <div className="h-full">
        <CodeMirror
          value={value}
          height="100%"
          theme={oneDark}
          extensions={[language, customTheme]}
          onChange={onChange}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            foldGutter: true,
            indentOnInput: true,
          }}
          className="h-full"
          style={{ height: '100%' }}
        />
      </div>
      
      <div className="absolute bottom-2 right-3 text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded font-mono backdrop-blur-sm z-10">
        JavaScript
      </div>
    </div>
  );
}
