"use client";

import useMarkdownStore from "@/lib/store/useMarkdownStore";
import { makeStyles } from "@fluentui/react-components";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const useStyles = makeStyles({
  preview: {
    paddingRight: "1rem",
    
    overflowY: "auto",
    height: "100%",
    backgroundColor: "#fff",
    color: "#333",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
    lineHeight: 1.5,
    fontSize: "15px",

    // Example for headings
    "& h1, & h2, & h3, & h4, & h5, & h6": {
      marginTop: "1em",
      marginBottom: "0.75em",
      fontWeight: 600,
      color: "#1a1a1a",
      lineHeight: 1.3,
    },
    "& h1": {
      fontSize: "2.25em",
      borderBottom: "2px solid #e0e0e0",
      paddingBottom: "0.5em",
      marginBottom: "1em",
    },
    "& h2": {
      fontSize: "1.75em",
      borderBottom: "1px solid #e0e0e0",
      paddingBottom: "0.4em",
      marginBottom: "0.8em",
    },
    "& h3": { fontSize: "1.4em" },
    "& h4": { fontSize: "1.2em" },
    "& h5": { fontSize: "1.1em" },
    "& h6": { fontSize: "1em", color: "#666" },
    "& p": {
      marginBottom: "1.2em",
      color: "#444",
    },
    "& ul, & ol": {
      paddingLeft: "2em",
      marginBottom: "1.2em",
    },
    "& ul li, & ol li": {
      marginBottom: "0.3em",
      color: "#444",
    },
    "& code": {
      fontFamily:
        "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Consolas', monospace",
      backgroundColor: "#f6f8fa",
      padding: "0.25em 0.5em",
      borderRadius: "4px",
      fontSize: "0.9em",
      color: "#e83e8c",
      border: "1px solid #e1e4e8",
    },
    "& pre": {
      backgroundColor: "#f8f9fa",
      padding: "20px",
      borderRadius: "8px",
      overflowX: "auto",
      marginBottom: "1.5em",
      border: "1px solid #e1e4e8",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    "& pre code": {
      backgroundColor: "transparent",
      padding: 0,
      border: "none",
      color: "#333",
      fontSize: "0.9em",
    },
    "& blockquote": {
      borderLeft: "4px solid #2196f3",
      paddingLeft: "1.5em",
      color: "#6a737d",
      margin: "1.5em 0",
      fontStyle: "italic",
      backgroundColor: "#f8f9fa",
      padding: "1em 1.5em",
      borderRadius: "0 8px 8px 0",
    },
    "& table": {
      borderCollapse: "collapse",
      width: "100%",
      marginBottom: "1.5em",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    "& th, & td": {
      border: "1px solid #e0e0e0",
      padding: "12px 16px",
      textAlign: "left",
    },
    "& th": {
      backgroundColor: "#f8f9fa",
      fontWeight: 600,
      color: "#333",
    },
    "& tr:nth-child(even)": {
      backgroundColor: "#f9f9f9",
    },
    "& tr:hover": {
      backgroundColor: "#f0f8ff",
    },
  },
});

export default function MarkdownPreview() {
  const styles = useStyles();
  const { markdownDisplayContent } = useMarkdownStore();
  return (
    <div className={styles.preview}>
      <Markdown remarkPlugins={[remarkGfm]}>{markdownDisplayContent}</Markdown>
    </div>
  );
}
