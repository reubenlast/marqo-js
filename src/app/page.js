"use client";

import DatabaseTreeView from "@/components/db-tree/db-tree-view";
import { MarkdownContainer } from "@/components/markdown/markdown-container";
import { makeStyles } from "@fluentui/react-components";

// Create a custom 'useStyles' hook to define the styling for the Home component.
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  content: {
    height: "100%",
    width: "40%",
    padding: "1rem",
  },
});

export default function Home() {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <DatabaseTreeView />
      <MarkdownContainer />
    </div>
  );
}
