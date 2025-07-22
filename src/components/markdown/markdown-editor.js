"use client";
import React, { useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import useMarkdownStore from "@/lib/store/useMarkdownStore";

export default function MarkdownEditor({ editorRef }) {
  const { markdownContent, updateMarkdown, setEditor } = useMarkdownStore();

  // Reference to the Monaco editor instance and first markdownContent update
  function handleEditorDidMount(editor) {
    setEditor(editor);
    if (editorRef) editorRef.current = editor;
    updateMarkdown(markdownContent);
  }

  return (
    <MonacoEditor
      height="100%"
      width="100%"
      language="markdown"
      value={markdownContent}
      onChange={(value) => updateMarkdown(value ?? "")}
      options={{
        minimap: { enabled: false },
        wordWrap: "on",
        scrollBeyondLastLine: false,
        automaticLayout: true,
        lineNumbers: "off",
        padding: {
          top: 10,
        },
        scrollbar: {
          ignoreHorizontalScrollbarInContentHeight: true,
          verticalScrollbarSize: "4px",
        },
      }}
      onMount={handleEditorDidMount}
    />
  );
}
