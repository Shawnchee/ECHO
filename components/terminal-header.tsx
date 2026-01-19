"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const commands = [
  "$ ./echo --init",
  "> ECHO v1.0",
  "> ready_to_analyze.sh_",
];

export function TerminalHeader() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= commands.length) return;

    const command = commands[currentLine];
    
    if (currentChar < command.length) {
      const timer = setTimeout(() => {
        setCurrentChar(currentChar + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayedLines([...displayedLines, command]);
        setCurrentLine(currentLine + 1);
        setCurrentChar(0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentChar, currentLine, displayedLines]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-green-500/20 px-6 py-3">
      <div className="max-w-7xl mx-auto font-mono text-sm">
        {displayedLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={
              line.startsWith("$")
                ? "text-green-400"
                : "text-green-500/70"
            }
          >
            {line}
          </motion.div>
        ))}
        {currentLine < commands.length && (
          <div className="text-green-400">
            {commands[currentLine].slice(0, currentChar)}
            <span className="animate-pulse">_</span>
          </div>
        )}
      </div>
    </div>
  );
}
