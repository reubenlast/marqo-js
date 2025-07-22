"use client";
import {
  getAllDatabasePaths,
  getArrayFromPath,
  getDataPreview,
  isDataPathArray,
} from "@/lib/services/databaseService";
import useMarkdownStore from "@/lib/store/useMarkdownStore";
import {
  makeStyles,
  Tree,
  tokens,
  Subtitle2Stronger,
  TreeItem,
  TreeItemLayout,
  Button,
  useId,
  Card,
  CardHeader,
  SearchBox,
  Text,
  CardFooter,
  Tooltip,
} from "@fluentui/react-components";
import {
  AddSquareFilled,
  Dismiss16Regular,
  DismissCircleRegular,
  DismissRegular,
  TableAdd16Filled,
} from "@fluentui/react-icons";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  container: {
    width: "10%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "0.5rem 1rem",
    gap: "0.6rem",
    backgroundColor: "var(--colorNeutralBackground2)",
    borderRight: "1px solid var(--colorNeutralStroke2)",
    transition: "all 0.2s ease",
    position: "relative",
  },
  content: { overflowY: "auto", height: "100%" },
  branch: {
    paddingLeft:
      "calc((var(--fluent-TreeItem--level, 1) - 1) * var(--spacingHorizontalMNudge))",
    "&:hover": {
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
    },
  },
  list: {
    fontWeight: "bold",
    paddingLeft:
      "calc((var(--fluent-TreeItem--level, 1) - 1) * var(--spacingHorizontalMNudge))",
    "&:hover": {
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
    },
  },
  leaf: {
    paddingLeft:
      "calc((var(--fluent-TreeItem--level, 1) - 1) * var(--spacingHorizontalM))",
    paddingRight: "0",
    "&:hover": {
      backgroundColor: tokens.colorBrandBackgroundInvertedHover,
      color: tokens.colorBrandBackground,
    },
    color: tokens.colorBrandBackground,
    position: "relative",
  },
  insertButton: {
    color: tokens.colorBrandBackground,
    "&:hover": {
      color: tokens.colorBrandBackgroundHover,
    },
    marginRight: "-0.5rem",
  },
  card: {
    transition: "all 0.2s ease",
    position: "absolute",
    bottom: "1rem",
    left: "1rem",
    right: "1rem",
    height: "fit-content",
    maxWidth: "100%",
    padding: "0",
    margin: 0,
    gap: 0,
  },
  cardTitle: {
    background: tokens.colorNeutralBackground3,
    borderBottom: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
    //height: "fit-content",
    display: "block",
    padding: "0.5rem",
  },
  cardText: {
    display: "block",
    background: tokens.colorNeutralBackground1,
    padding: "0.5rem",
  },
  dismiss: {
    transition: "opacity 0.2s ease",
    position: "absolute",
    top: "-0.4rem",
    right: "-0.4rem",
    color: "var(--colorNeutralForeground4)",
  },
});

function DatabaseTreeView() {
  const { insertAtCursor, selectedDbPath, setSelectedDbPath } =
    useMarkdownStore();
  const styles = useStyles();
  const searchId = useId("search-input");
  const [dbStructure, setDbStructure] = useState({});
  const [openItems, setOpenItems] = useState([]);
  const handleOpenChange = (event, data) => {
    setOpenItems(data.openItems);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStructure, setFilteredStructure] = useState(null);

  const [hoveredPath, setHoveredPath] = useState(null);
  const [pathPreview, setPathPreview] = useState("");
  const handleMouseEnter = (path) => {
    setHoveredPath(path);
    const preview = getDataPreview(path);
    setPathPreview(preview);
  };
  const handleMouseLeave = () => {
    setHoveredPath(null);
    selectedDbPath
      ? setPathPreview(getDataPreview(selectedDbPath))
      : setPathPreview("");
  };
  const handleSelect = (path) => {
    path === selectedDbPath ? setSelectedDbPath(null) : setSelectedDbPath(path);
    setPathPreview(getDataPreview(path));
  };
  const onInsertPathHandler = (path) => {
    insertAtCursor(`<${path}>`);
  };
  const onInsertTableHandler = (path) => {
    insertAtCursor(`<${path}.table()>`);
  };

  const renderTree = (node, path = "", level = 0) => {
    if (!node || typeof node !== "object") return null;

    return Object.keys(node)
      .filter((key) => key !== "_isLeaf" && key !== "_fullPath")
      .map((key) => {
        const currentPath = path ? `${path}.${key}` : key;
        const isLeaf = node[key]._isLeaf;
        const isList = node[key]._isList;
        const fullPath = isLeaf ? node[key]._fullPath : currentPath;
        const hasChildren =
          Object.keys(node[key]).filter(
            (k) => k !== "_isLeaf" && k !== "_fullPath"
          ).length > 0;
        const listContent = isList ? getArrayFromPath(fullPath) : null;

        return (
          <TreeItem
            key={currentPath}
            itemType={isLeaf ? "leaf" : "branch"}
            value={currentPath}
            onClick={() => (isLeaf ? handleSelect(fullPath) : null)}
            //onDoubleClick={() => onInsertPathHandler(fullPath)}
            onMouseEnter={() => isLeaf && handleMouseEnter(fullPath)}
            onMouseLeave={() => isLeaf && handleMouseLeave()}
          >
            <TreeItemLayout
              className={
                isList ? styles.list : isLeaf ? styles.leaf : styles.branch
              }
              style={
                selectedDbPath === fullPath
                  ? {
                      backgroundColor:
                        "var(--colorBrandBackgroundInvertedPressed)",
                    }
                  : {}
              }
              actions={
                // Show insert button only for lists and leaves
                isList ? (
                  <Tooltip content={"Insert as Table"} showDelay={500}>
                    <Button
                      size="small"
                      aria-label="Insert as Table"
                      appearance="transparent"
                      icon={<TableAdd16Filled />}
                      className={styles.insertButton}
                      onClick={() => onInsertTableHandler(fullPath)}
                    />
                  </Tooltip>
                ) : isLeaf ? (
                  <Tooltip content={"Insert Path"} showDelay={500}>
                    <Button
                      size="small"
                      aria-label="Insert Path"
                      appearance="transparent"
                      icon={<AddSquareFilled />}
                      className={styles.insertButton}
                      onClick={() => onInsertPathHandler(fullPath)}
                    />
                  </Tooltip>
                ) : undefined
              }
            >
              {key}
            </TreeItemLayout>
            {isList ? (
              <Tree>
                {listContent.map((el, index) => (
                  <TreeItem
                    key={index}
                    itemType="branch"
                    //onClick={() => handleSelect(`${fullPath}.${index}`)}
                  >
                    <TreeItemLayout className={styles.branch}>
                      {index}
                    </TreeItemLayout>
                    <Tree>
                      {Object.keys(el).map((childKey) => {
                        const elPath = `${fullPath}.${index}.${childKey}`;
                        return (
                          <TreeItem
                            key={childKey}
                            itemType="leaf"
                            value={elPath}
                            onClick={() => handleSelect(elPath)}
                            onMouseEnter={() => handleMouseEnter(elPath)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <TreeItemLayout
                              className={styles.leaf}
                              style={
                                selectedDbPath === elPath
                                  ? {
                                      backgroundColor:
                                        "var(--colorBrandBackgroundInvertedPressed)",
                                    }
                                  : {}
                              }
                              actions={
                                <Tooltip
                                  content={"Insert Path"}
                                  showDelay={500}
                                >
                                  <Button
                                    size="small"
                                    aria-label="Insert Path"
                                    appearance="transparent"
                                    icon={<AddSquareFilled />}
                                    className={styles.insertButton}
                                    onClick={() => onInsertPathHandler(elPath)}
                                  />
                                </Tooltip>
                              }
                            >
                              {childKey}
                            </TreeItemLayout>
                          </TreeItem>
                        );
                      })}
                    </Tree>
                  </TreeItem>
                ))}
              </Tree>
            ) : hasChildren ? (
              <Tree>{renderTree(node[key], currentPath, level + 1)}</Tree>
            ) : (
              renderTree(node[key], currentPath, level + 1)
            )}
          </TreeItem>
        );
      });
  };

  // Effect to initialize the database structure from flat paths
  useEffect(() => {
    // Convert flat paths to tree structure
    const buildTreeFromPaths = () => {
      const paths = getAllDatabasePaths();
      const tree = {};

      paths.forEach((path) => {
        const parts = path.split(".");
        let current = tree;

        parts.forEach((part, index) => {
          if (!current[part]) {
            current[part] = {};
          }
          if (index === parts.length - 1 && typeof current[part] === "object") {
            if (isDataPathArray(path)) {
              current[part]._isList = true;
              current[part]._isLeaf = false;
            } else current[part]._isLeaf = true;
            current[part]._fullPath = path;
          }

          current = current[part];
        });
      });

      setDbStructure(tree);
    };

    buildTreeFromPaths();
  }, []);

  // Effect to filter the database structure based on the search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredStructure(null);
      return;
    }
    const searchResults = getAllDatabasePaths().filter((path) =>
      path.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (searchResults.length === 0) {
      setFilteredStructure({});
      return;
    }

    // Build a new tree with only the filtered paths
    const filteredTree = {};
    searchResults.forEach((path) => {
      const parts = path.split(".");
      let current = filteredTree;

      parts.forEach((part, index) => {
        if (!current[part]) {
          current[part] = {};
        }

        if (index === parts.length - 1) {
          if (isDataPathArray(path)) {
            current[part]._isList = true;
            current[part]._isLeaf = false;
          } else current[part]._isLeaf = true;
          current[part]._fullPath = path;
        }

        current = current[part];
      });
    });

    setFilteredStructure(filteredTree);

    // Expand all parent nodes of search results
    const expanded = new Set();

    // Collect all parent paths of the search results
    searchResults.forEach((path) => {
      const parts = path.split(".");
      let currentPath = "";
      for (let i = 0; i < parts.length - 1; i++) {
        currentPath = currentPath ? `${currentPath}.${parts[i]}` : parts[i];
        expanded.add(currentPath);
      }
    });

    setOpenItems(Array.from(expanded));
  }, [searchTerm]);

  return (
    <div className={styles.container}>
      <Subtitle2Stronger>Database Explorer</Subtitle2Stronger>
      <SearchBox
        useId={searchId}
        size="small"
        appearance="underline"
        placeholder="Search paths..."
        value={searchTerm}
        onChange={(_, d) => setSearchTerm(d.value)}
      />
      <div className={styles.content}>
        <Tree
          openItems={openItems}
          onOpenChange={handleOpenChange}
          aria-label={"Database Explorer"}
          size="small"
        >
          {filteredStructure
            ? renderTree(filteredStructure)
            : renderTree(dbStructure)}
        </Tree>
      </div>
      <Card className={styles.card} style={pathPreview ? {} : { opacity: 0 }}>
        <CardHeader
          className={styles.cardTitle}
          header={
            <div style={{ width: "100%", position: "relative" }}>
              <Text size={200}>{hoveredPath || selectedDbPath}</Text>
              {!hoveredPath && selectedDbPath && (
                <Button
                  size="small"
                  appearance="subtle"
                  icon={<Dismiss16Regular />}
                  aria-label="Dismiss Card"
                  className={styles.dismiss}
                  onClick={() => {
                    setSelectedDbPath(null);
                    setPathPreview("");
                  }}
                  style={!hoveredPath && selectedDbPath ? {} : { opacity: 0 }}
                />
              )}
            </div>
          }
        />
        <Text size={200} className={styles.cardText}>
          {pathPreview}
        </Text>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default DatabaseTreeView;
