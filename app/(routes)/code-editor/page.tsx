"use client";

import { useState } from "react";
import CodeMirrorEditor from "./components/CodeMirrorEditor";
import { Button } from "@/components/ui/button";
import { javascript } from "@codemirror/lang-javascript";
import { Play, RefreshCw } from "lucide-react";

const initialCode = `function greeting(name) {
  return \`Hello, \${name}!\`;
}

console.log(greeting('World'));
`;

export default function CodeEditorPage() {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput("");

    try {
      const originalConsoleLog = console.log;
      let outputResult = "";

      console.log = (...args) => {
        outputResult += args.join(" ") + "\n";
      };

      const executeCode = new Function(code);
      executeCode();
      
      console.log = originalConsoleLog;

      setOutput(outputResult || "Code executed successfully (no console output)");
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : String(error);
      setOutput(`Error: ${errorMessage}`);
    }

    setIsRunning(false);
  };

  return (
    <div className="py-8 px-6 max-w-7xl mx-auto">
      <div className="mb-8 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-xl p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-violet-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-400/10 to-violet-500/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-violet-700">JavaScript Code Editor</h1>
          <p className="text-indigo-700/70 text-lg max-w-2xl">
            Write and run JavaScript code directly in your browser. Experiment with new programming ideas and concepts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100 transition-all duration-300 hover:shadow-xl">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 border-b border-indigo-200 p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <div className="mr-2 p-1 bg-white/20 rounded-md">
                <code className="text-white text-xs">&lt;/&gt;</code>
              </div>
              Editor
            </h2>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCode(initialCode)}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleRunCode}
                disabled={isRunning}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
              >
                <Play className="mr-2 h-4 w-4" /> {isRunning ? "Running..." : "Run"}
              </Button>
            </div>
          </div>
          <div className="h-[500px] overflow-hidden">
            <CodeMirrorEditor
              value={code}
              onChange={setCode}
              language={javascript()}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100 transition-all duration-300 hover:shadow-xl">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 border-b border-indigo-200 p-4">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <div className="mr-2 p-1 bg-white/20 rounded-md">
                <code className="text-white text-xs">console</code>
              </div>
              Result
            </h2>
          </div>
          <div className="h-[500px] overflow-auto p-6 font-mono text-sm bg-gray-900 text-gray-100">
            {output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="p-4 rounded-full bg-indigo-500/10 mb-4">
                  <Play className="w-10 h-10 text-indigo-400" />
                </div>
                <div className="text-indigo-300 font-medium">Run your code to see the result here</div>
                <div className="text-indigo-400/50 text-xs mt-2">Use the Run button to test your code</div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 rounded-xl p-4 flex justify-between items-center text-sm text-indigo-600/70">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
          <span>Editor ready</span>
        </div>
        <div>
          JavaScript v{Math.floor(Math.random() * 3) + 16}.{Math.floor(Math.random() * 10)}.{Math.floor(Math.random() * 10)}
        </div>
      </div>
    </div>
  );
}
