"use client";
import { makeStyles } from "@fluentui/react-components";
import MarkdownToolbar from "./markdown-toolbar";
import { useResizeHandle } from "@fluentui-contrib/react-resize-handle";
import { useRef, useState } from "react";
import { ResizeHandle } from "../ui/resize-handle";
import MarkdownPreview from "./markdown-preview";
import MarkdownEditor from "./markdown-editor";

const NAV_SIZE_CSS_VAR = "--nav-size";

const useStyles = makeStyles({
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    borderRight: "1px solid var(--colorNeutralStroke2)",
  },
  wrapper: {
    display: "flex",
    height: "100%",
    [NAV_SIZE_CSS_VAR]: "0px",
  },
  drawer: {
    paddingRight: "2px",
    display: "flex",
    flexDirection: "row",
    position: "relative",
    width: `clamp(30%, calc(50% + var(${NAV_SIZE_CSS_VAR})), 80%)`,
  },
  preview: {
    paddingLeft: "1rem",
    paddingBottom: "2rem",
    paddingTop: "0",
    height: "100%",
    width: `clamp(30%, calc(50% - var(${NAV_SIZE_CSS_VAR})), 80%)`,
  },
  editor: {
    paddingLeft: "0.5rem",
  },
});

export function MarkdownContainer() {
  const styles = useStyles();
  const editorRef = useRef(null);

  // State to manage the current view mode: "edit", "split", or "preview"
  const [viewMode, setViewMode] = useState("split");
  function switchViewMode(mode) {
    if (["edit", "split", "preview"].includes(mode)) {
      setViewMode(mode);
    }
  }

  // Resize handle for the split view
  // Test feature, contains bugs, windows resize slow
  const {
    handleRef: winHandleRef,
    wrapperRef: winWrapperRef,
    elementRef: winElementRef,
  } = useResizeHandle({
    variableName: NAV_SIZE_CSS_VAR,
    growDirection: "end",
    relative: true,
  });

  function updateEditor(editor, edits, startLine, endLine, endColumn) {
    editor.executeEdits(null, edits);
    // Reselect the edited lines
    editor.setSelection({
      startLineNumber: startLine,
      startColumn: 1,
      endLineNumber: endLine,
      endColumn: endColumn,
    });
    editor.pushUndoStop();
  }

  // Function to apply text styles (bold/italic) to the selected text
  function textStyleSelection(style) {
    if (editor.getSelection().isEmpty()) {
      const placeholder = style === "bold" ? "boldText" : "italicText";
      editor.executeEdits(null, [
        {
          range: editor.getSelection(),
          text: `${marker}${placeholder}${marker}`,
          forceMoveMarkers: true,
        },
      ]);
      const pos = editor.getSelection().getStartPosition();
      editor.setSelection({
        startLineNumber: pos.lineNumber,
        startColumn: pos.column + markerLen,
        endLineNumber: pos.lineNumber,
        endColumn: pos.column + markerLen + placeholder.length,
      });
      return;
    }
    const editor = editorRef.current;
    if (!editor) return;
    const selection = editor.getSelection();
    const model = editor.getModel();
    if (!selection || !model) return;

    const fullText = model.getValue();
    const startOffset = model.getOffsetAt(selection.getStartPosition());
    const endOffset = model.getOffsetAt(selection.getEndPosition());
    const selectedText = model.getValueInRange(selection);

    const marker = style === "bold" ? "__" : "_";
    const markerLen = marker.length;

    const before = fullText.slice(
      Math.max(0, startOffset - markerLen),
      startOffset
    );
    const after = fullText.slice(endOffset, endOffset + markerLen);

    if (before === marker && after === marker) {
      // Remove surrounding markers
      const rangeToReplace = {
        startLineNumber: selection.startLineNumber,
        startColumn: selection.startColumn - markerLen,
        endLineNumber: selection.endLineNumber,
        endColumn: selection.endColumn + markerLen,
      };
      editor.executeEdits(null, [
        {
          range: rangeToReplace,
          text: selectedText,
          forceMoveMarkers: true,
        },
      ]);
      // Reselect the unstyled text
      const newSelection = selection
        .setStartPosition(
          selection.startLineNumber,
          selection.startColumn - markerLen
        )
        .setEndPosition(
          selection.endLineNumber,
          selection.endColumn - markerLen
        );
      editor.setSelection(newSelection);
      return;
    }

    // Add markers
    const newText = `${marker}${selectedText}${marker}`;
    editor.executeEdits(null, [
      {
        range: selection,
        text: newText,
        forceMoveMarkers: true,
      },
    ]);
    // Reselect the styled text
    const newSelection = selection
      .setStartPosition(
        selection.startLineNumber,
        selection.startColumn + markerLen
      )
      .setEndPosition(selection.endLineNumber, selection.endColumn + markerLen);
    editor.setSelection(newSelection);
  }

  function boldSelection() {
    textStyleSelection("bold");
  }

  function italicSelection() {
    textStyleSelection("italic");
  }

  // Function to toggle headings in the editor
  function headingSelection(level = 1) {
    if (level === 0) {
      const editor = editorRef.current;
      if (!editor) return;
      let selection = editor.getSelection();
      const model = editor.getModel();
      if (!selection || !model) return;

      const isSelection =
        selection.startLineNumber !== selection.endLineNumber ||
        selection.startColumn !== selection.endColumn;

      editor.pushUndoStop();

      if (isSelection) {
        // Remove heading from each line in selection
        const selectedText = model.getValueInRange(selection);
        const cleanedText = selectedText.replace(/^(\s*)#{1,6}\s*/gm, "$1");
        editor.executeEdits(null, [
          {
            range: selection,
            text: cleanedText,
            forceMoveMarkers: true,
          },
        ]);
      } else {
        // Remove heading from current line
        const line = selection.startLineNumber;
        const lineContent = model.getLineContent(line);
        const newContent = lineContent.replace(/^(\s*)#{1,6}\s*/, "$1");
        const range = {
          startLineNumber: line,
          startColumn: 1,
          endLineNumber: line,
          endColumn: lineContent.length + 1,
        };
        editor.executeEdits(null, [
          {
            range,
            text: newContent,
            forceMoveMarkers: true,
          },
        ]);
      }
      editor.pushUndoStop();
      return;
    }
    const editor = editorRef.current;
    if (!editor) return;
    let selection = editor.getSelection();
    const model = editor.getModel();
    if (!selection || !model) return;

    const headingPrefix = "#".repeat(Math.max(1, Math.min(level, 3))) + " ";

    // Check if there is a selection (not just a cursor)
    const isSelection =
      selection.startLineNumber !== selection.endLineNumber ||
      selection.startColumn !== selection.endColumn;

    editor.pushUndoStop();

    if (isSelection) {
      // If the next symbol after selected text is a space, remove it
      const endOffset = model.getOffsetAt(selection.getEndPosition());
      let afterSelection = model.getValue().slice(endOffset, endOffset + 1);
      if (afterSelection === " ") {
        // Extend the selection to include the space after the selected text
        const newSelection = selection.setEndPosition(
          selection.endLineNumber,
          selection.endColumn + 1
        );
        editor.setSelection(newSelection);
        // Update selection variable for subsequent logic
        selection = editor.getSelection();
      }
      // Get selected text
      const selectedText = model.getValueInRange(selection);
      // Remove any existing heading prefix from the selected text
      const cleanedText = selectedText.replace(/^(\s*)#{1,3}\s*/gm, "$1");
      // Add heading prefix to each line in the selection
      const headingText = cleanedText
        .split("\n")
        .map((line) => headingPrefix + line.trim())
        .join("\n");
      // Replace selection with heading text and add a new line after
      editor.executeEdits(null, [
        {
          range: selection,
          text: headingText + "\n",
          forceMoveMarkers: true,
        },
      ]);
      // Set selection to the new heading
      const newEndLine =
        selection.startLineNumber + headingText.split("\n").length - 1;
      editor.setSelection({
        startLineNumber: selection.startLineNumber,
        startColumn: 1,
        endLineNumber: newEndLine + 1,
        endColumn: 1,
      });
    } else {
      // No selection, just cursor: make the whole line a heading
      const line = selection.startLineNumber;
      const lineContent = model.getLineContent(line);
      const trimmed = lineContent.trimStart();
      let newContent;
      // Remove any existing heading (up to 3 #)
      if (/^#{1,3}\s/.test(trimmed)) {
        newContent = lineContent.replace(
          /^(\s*)#{1,3}\s*/,
          "$1" + headingPrefix
        );
      } else {
        newContent = lineContent.replace(/^(\s*)/, "$1" + headingPrefix);
      }
      const range = {
        startLineNumber: line,
        startColumn: 1,
        endLineNumber: line,
        endColumn: lineContent.length + 1,
      };
      editor.executeEdits(null, [
        {
          range,
          text: newContent,
          forceMoveMarkers: true,
        },
      ]);
    }
    editor.pushUndoStop();
  }

  // Functions for undo/redo operations
  function undo() {
    const editor = editorRef.current;
    if (editor && typeof editor.trigger === "function") {
      editor.trigger("keyboard", "undo", null);
    }
  }

  function redo() {
    const editor = editorRef.current;
    if (editor && typeof editor.trigger === "function") {
      editor.trigger("keyboard", "redo", null);
    }
  }

  // Functions to insert various Markdown elements
  // Bullet or numbered lists, blockquotes, code blocks, links, tables, and horizontal
  function insertList(type = "bullet") {
    const editor = editorRef.current;
    if (!editor) return;
    const selection = editor.getSelection();
    const model = editor.getModel();
    if (!selection || !model) return;

    const isSelection =
      selection.startLineNumber !== selection.endLineNumber ||
      selection.startColumn !== selection.endColumn;

    editor.pushUndoStop();

    const startLine = selection.startLineNumber;
    const endLine = selection.endLineNumber;

    let edits = [];
    let listPrefix = type === "number" ? (i) => `${i + 1}. ` : () => "- ";

    for (let i = 0; i <= endLine - startLine; i++) {
      const lineNumber = startLine + i;
      const lineContent = model.getLineContent(lineNumber);
      // Remove existing list prefix if present
      const cleaned = lineContent.replace(/^(\s*)(- |\d+\.\s)/, "$1");
      edits.push({
        range: {
          startLineNumber: lineNumber,
          startColumn: 1,
          endLineNumber: lineNumber,
          endColumn: lineContent.length + 1,
        },
        text: listPrefix(type === "number" ? i : undefined) + cleaned,
        forceMoveMarkers: true,
      });
    }

    updateEditor(
      editor,
      edits,
      startLine,
      endLine,
      model.getLineMaxColumn(endLine)
    );
  }

  function insertBlockquote() {
    const editor = editorRef.current;
    if (!editor) return;
    const selection = editor.getSelection();
    const model = editor.getModel();
    if (!selection || !model) return;

    editor.pushUndoStop();

    const startLine = selection.startLineNumber;
    const endLine = selection.endLineNumber;

    let edits = [];
    for (let i = 0; i <= endLine - startLine; i++) {
      const lineNumber = startLine + i;
      const lineContent = model.getLineContent(lineNumber);
      // Remove existing blockquote if present
      const cleaned = lineContent.replace(/^(\s*)>\s?/, "$1");
      edits.push({
        range: {
          startLineNumber: lineNumber,
          startColumn: 1,
          endLineNumber: lineNumber,
          endColumn: lineContent.length + 1,
        },
        text: "> " + cleaned,
        forceMoveMarkers: true,
      });
    }

    updateEditor(
      editor,
      edits,
      startLine,
      endLine,
      model.getLineMaxColumn(endLine)
    );
  }

  function insertCodeBlock() {
    const editor = editorRef.current;
    if (!editor) return;
    const selection = editor.getSelection();
    const model = editor.getModel();
    if (!selection || !model) return;

    const isSelection =
      selection.startLineNumber !== selection.endLineNumber ||
      selection.startColumn !== selection.endColumn;

    editor.pushUndoStop();

    if (!isSelection) {
      // No selection: insert inline code with placeholder
      const placeholder = "code";
      editor.executeEdits(null, [
        {
          range: selection,
          text: "` " + placeholder + " `",
          forceMoveMarkers: true,
        },
      ]);
      // Place cursor inside the backticks
      const pos = selection.getStartPosition();
      editor.setSelection({
        startLineNumber: pos.lineNumber,
        startColumn: pos.column + 1,
        endLineNumber: pos.lineNumber,
        endColumn: pos.column + 1 + placeholder.length,
      });
    } else if (selection.startLineNumber === selection.endLineNumber) {
      // Single line selection: wrap with single backticks
      const selectedText = model.getValueInRange(selection);
      editor.executeEdits(null, [
        {
          range: selection,
          text: "`" + selectedText + "`",
          forceMoveMarkers: true,
        },
      ]);
      // Select the text inside the backticks
      editor.setSelection({
        startLineNumber: selection.startLineNumber,
        startColumn: selection.startColumn + 1,
        endLineNumber: selection.endLineNumber,
        endColumn: selection.endColumn + 1,
      });
    } else {
      // Multi-line selection: wrap with triple backticks
      const selectedText = model.getValueInRange(selection);
      editor.executeEdits(null, [
        {
          range: selection,
          text: "```\n" + selectedText + "\n```",
          forceMoveMarkers: true,
        },
      ]);
      // Select the text inside the triple backticks
      editor.setSelection({
        startLineNumber: selection.startLineNumber + 1,
        startColumn: 1,
        endLineNumber: selection.endLineNumber + 1,
        endColumn: model.getLineMaxColumn(selection.endLineNumber),
      });
    }

    editor.focus();
    editor.pushUndoStop();
  }

  function insertLink() {
    const editor = editorRef.current;
    if (!editor) return;
    const selection = editor.getSelection();
    const model = editor.getModel();
    if (!selection || !model) return;

    const isSelection =
      selection.startLineNumber !== selection.endLineNumber ||
      selection.startColumn !== selection.endColumn;

    editor.pushUndoStop();

    if (!isSelection) {
      // No selection: insert placeholder link
      editor.executeEdits(null, [
        {
          range: selection,
          text: "[Link](http://a.com)",
          forceMoveMarkers: true,
        },
      ]);
      // Place cursor inside the link text
      const pos = selection.getStartPosition();
      editor.setSelection({
        startLineNumber: pos.lineNumber,
        startColumn: pos.column + 1,
        endLineNumber: pos.lineNumber,
        endColumn: pos.column + 5,
      });
    } else {
      // Selection: wrap selected text in link
      const selectedText = model.getValueInRange(selection);
      editor.executeEdits(null, [
        {
          range: selection,
          text: `[${selectedText}](http://a.com)`,
          forceMoveMarkers: true,
        },
      ]);
      // Select the link text (not the URL)
      editor.setSelection({
        startLineNumber: selection.startLineNumber,
        startColumn: selection.startColumn + 1,
        endLineNumber: selection.endLineNumber,
        endColumn: selection.endColumn + 1,
      });
    }

    editor.focus();
    editor.pushUndoStop();
  }

  function insertTable() {
    const editor = editorRef.current;
    if (!editor) return;
    const selection = editor.getSelection();
    const model = editor.getModel();
    if (!selection || !model) return;

    editor.pushUndoStop();

    const tableText =
      `\n` +
      `| Header1 | Header2 |\n` +
      `| ------  | ------  |\n` +
      `| Cell1   | Cell2   |\n` +
      `| Cell3   | Cell4   |\n`;

    editor.executeEdits(null, [
      {
        range: selection,
        text: tableText,
        forceMoveMarkers: true,
      },
    ]);

    // Move cursor to first cell
    const pos = selection.getStartPosition();
    editor.setPosition({
      lineNumber: pos.lineNumber + 1,
      column: 3,
    });

    editor.focus();
    editor.pushUndoStop();
  }

  function insertHorizontalRule() {
    const editor = editorRef.current;
    if (!editor) return;
    const selection = editor.getSelection();
    const model = editor.getModel();
    if (!selection || !model) return;

    const line = selection.startLineNumber;
    const totalLines = model.getLineCount();

    // Insert HR with newlines before and after
    const hrText = "\n---\n";
    editor.pushUndoStop();

    // Insert at current line, replacing selection if any
    editor.executeEdits(null, [
      {
        range: selection,
        text: hrText,
        forceMoveMarkers: true,
      },
    ]);

    // Move cursor to line after the HR
    const newPosition = {
      lineNumber: line + 2,
      column: 1,
    };
    editor.setPosition(newPosition);
    editor.focus();

    editor.pushUndoStop();
  }

  return (
    <div className={styles.container}>
      <MarkdownToolbar
        viewMode={viewMode}
        onViewChange={switchViewMode}
        onUndo={undo}
        onRedo={redo}
        onBold={boldSelection}
        onItalic={italicSelection}
        onHeading={headingSelection}
        onList={insertList}
        onBlockquote={insertBlockquote}
        onCodeBlock={insertCodeBlock}
        onLink={insertLink}
        onTable={insertTable}
        onRule={insertHorizontalRule}
      />
      {viewMode === "split" && (
        <div className={styles.wrapper} ref={winWrapperRef}>
          <div className={styles.drawer} ref={winElementRef}>
            <MarkdownEditor editorRef={editorRef} />
            <ResizeHandle position="end" ref={winHandleRef} />
          </div>
          <div className={styles.preview}>
            <MarkdownPreview />
          </div>
        </div>
      )}
      {viewMode === "edit" ? (
        <div className={styles.wrapper}>
          <MarkdownEditor editorRef={editorRef} />
        </div>
      ) : (
        <div className={styles.preview}>
          <MarkdownPreview />
        </div>
      )}
    </div>
  );
}
