"use client";

import { create } from "zustand";
import { replaceDataLinksInText } from "../services/databaseService";

const INITIAL_MARKDOWN = `# Introduction

This is a markdown editor with database link support. 

### Accessing Link Content Examples

Here is information about car __wheels__:
> <db.class.car.hyundai.has.wheel.all>

Information about the __engine__:
<db.class.car.hyundai.has.engine.type>

### Table Examples

<db.class.car.models.table()>

### Filtered Table Examples

<db.class.car.models.table(name, year)>

## How to Use
To use this markdown editor:

- Write your markdown content in the editor pane.
- You can quickly insert a database link by clicking the button next to an item in the Database Explorer.
- To reference data from your database, insert links using the syntax \` /<db.class.path.to.data>/ \`. For example: \` /<db.class.car.hyundai.has.wheel.all>/ \`.
- To display tables, use the table syntax: \` /<db.class.car.models.table()>/ \`.
- You can filter table columns by specifying them: \` /<db.class.car.models.table(name, year)>/ \`.
- The preview pane will automatically replace these database links with the corresponding data.
- Use the editor's features to insert text at the cursor or select database paths as needed.
- Use \` /<link>/ \` syntax to insert links without replacing them with data.
`;

const useMarkdownStore = create((set, get) => ({
  // Database path state
  selectedDbPath: null,

  // Markdown content state
  markdownContent: INITIAL_MARKDOWN,
  markdownDisplayContent: null,

  // store the editor instance
  editor: null,
  // Get the current editor instance
  insertAtCursor: (text) => {
    const editor = get().editor;
    if (!editor) return;
    const selection = editor.getSelection();
    editor.executeEdits(null, [
      {
        range: selection,
        text,
        forceMoveMarkers: true,
      },
    ]);
    // Move cursor after inserted text
    const pos = selection.getStartPosition();
    editor.setPosition({
      lineNumber: pos.lineNumber,
      column: pos.column + text.length,
    });
    editor.focus();
  },

  // Update markdown content and replace data links
  updateMarkdown: (content) =>
    set({
      markdownContent: content,
      markdownDisplayContent: replaceDataLinksInText(content),
    }),
  // Setters for state
  setSelectedDbPath: (path) => set({ selectedDbPath: path }),
  setEditor: (editor) => set({ editor: editor }),
}));

export default useMarkdownStore;
