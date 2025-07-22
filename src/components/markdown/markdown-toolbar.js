"use client";
import {
  ArrowRedo20Regular,
  ArrowUndo20Regular,
  CodeBlock24Regular,
  DocumentPageBreak24Regular,
  LayoutColumnOneThirdLeft24Regular,
  LayoutColumnOneThirdRight24Regular,
  LayoutColumnTwo24Regular,
  Link24Regular,
  TableSimple24Regular,
  TextBold24Regular,
  TextBulletListLtr24Regular,
  TextFontSize24Filled,
  TextItalic24Regular,
  TextNumberListLtr24Regular,
  TextQuote24Filled,
} from "@fluentui/react-icons";
import {
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRadioGroup,
  ToolbarRadioButton,
  Tooltip,
} from "@fluentui/react-components";
import { Fragment } from "react";

const useStyles = makeStyles({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "var(--colorNeutralBackground4)",
    borderBottom: "1px solid var(--colorNeutralStrokeSubtle)",
  },
});

export default function MarkdownToolbar({
  viewMode,
  onViewChange,
  onUndo,
  onRedo,
  onBold,
  onItalic,
  onHeading,
  onList,
  onBlockquote,
  onCodeBlock,
  onLink,
  onTable,
  onRule,
}) {
  // Define the buttons and their actions
  const btnsList = [
    [
      {
        ariaLabel: "Undo",
        icon: <ArrowUndo20Regular />,
        value: "undo",
        onClick: onUndo,
      },
      {
        ariaLabel: "Redo",
        icon: <ArrowRedo20Regular />,
        value: "redo",
        onClick: onRedo,
      },
    ],
    [
      {
        ariaLabel: "Bold",
        icon: <TextBold24Regular />,
        value: "bold",
        onClick: onBold,
      },
      {
        ariaLabel: "Italic",
        icon: <TextItalic24Regular />,
        value: "italic",
        onClick: onItalic,
      },
      {
        isDropdown: true,
        ariaLabel: "Text Size",
        icon: <TextFontSize24Filled />,
        value: "redo",
        items: [
          {
            ariaLabel: "Heading 1",
            value: "h1",
            onClick: () => onHeading(1),
          },
          {
            ariaLabel: "Heading 2",
            value: "h2",
            onClick: () => onHeading(2),
          },
          {
            ariaLabel: "Heading 3",
            value: "h3",
            onClick: () => onHeading(3),
          },
          {
            ariaLabel: "Paragraph",
            value: "text",
            onClick: () => onHeading(0),
          },
        ],
      },
      {
        ariaLabel: "Bullet List",
        icon: <TextBulletListLtr24Regular />,
        value: "bulletList",
        onClick: () => onList(),
      },
      {
        ariaLabel: "Number List",
        icon: <TextNumberListLtr24Regular />,
        value: "numberList",
        onClick: () => onList("number"),
      },
      {
        ariaLabel: "Blockquote",
        icon: <TextQuote24Filled />,
        value: "quote",
        onClick: onBlockquote,
      },
      {
        ariaLabel: "Code Block",
        icon: <CodeBlock24Regular />,
        value: "code",
        onClick: onCodeBlock,
      },
      {
        ariaLabel: "Link",
        icon: <Link24Regular />,
        value: "link",
        onClick: onLink,
      },
    ],
    [
      {
        ariaLabel: "Table",
        icon: <TableSimple24Regular />,
        value: "table",
        onClick: onTable,
      },
      {
        ariaLabel: "Horizontal Rule",
        icon: <DocumentPageBreak24Regular />,
        value: "rule",
        onClick: onRule,
      },
    ],
  ];
  const styles = useStyles();
  return (
    <Toolbar
      className={styles.container}
      aria-label="Markdown Toolbar"
      size="small"
      checkedValues={{ viewOptions: [viewMode] }}
    >
      <ToolbarGroup style={{ display: "flex", width: "fit-content" }}>
        {btnsList.map((group, groupIdx) => (
          <Fragment key={groupIdx}>
            {group.map((btn) =>
              btn?.isDropdown ? (
                <Menu key={btn.value}>
                  <MenuTrigger>
                    <Tooltip content={btn.ariaLabel} showDelay={500}>
                      <ToolbarButton
                        aria-label={btn.ariaLabel}
                        icon={btn.icon}
                        disabled={viewMode === "preview"}
                      />
                    </Tooltip>
                  </MenuTrigger>

                  <MenuPopover>
                    <MenuList>
                      {btn.items.map((item) => (
                        <MenuItem
                          key={item.value}
                          aria-label={item.ariaLabel}
                          value={item.value}
                          onClick={item.onClick}
                        >
                          {item.ariaLabel}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </MenuPopover>
                </Menu>
              ) : (
                <Tooltip
                  key={btn.value}
                  content={btn.ariaLabel}
                  showDelay={500}
                >
                  <ToolbarButton
                    appearance="subtle"
                    aria-label={btn.ariaLabel}
                    icon={btn.icon}
                    value={btn.value}
                    onClick={btn.onClick}
                    disabled={viewMode === "preview"}
                  />
                </Tooltip>
              )
            )}
            {groupIdx < btnsList.length - 1 && <ToolbarDivider />}
          </Fragment>
        ))}
      </ToolbarGroup>
      <ToolbarRadioGroup>
        <Tooltip content={"Edit View"} showDelay={500}>
          <ToolbarRadioButton
            appearance="subtle"
            aria-label={"Edit View"}
            name="viewOptions"
            icon={<LayoutColumnOneThirdRight24Regular />}
            value={"edit"}
            onClick={() => onViewChange("edit")}
          />
        </Tooltip>
        <Tooltip content={"Split View"} showDelay={500}>
          <ToolbarRadioButton
            appearance="subtle"
            aria-label={"Split View"}
            name="viewOptions"
            icon={<LayoutColumnTwo24Regular />}
            value={"split"}
            onClick={() => onViewChange("split")}
          />
        </Tooltip>
        <Tooltip content={"Preview View"} showDelay={500}>
          <ToolbarRadioButton
            appearance="subtle"
            aria-label={"Preview View"}
            name="viewOptions"
            icon={<LayoutColumnOneThirdLeft24Regular />}
            value={"preview"}
            onClick={() => onViewChange("preview")}
          />
        </Tooltip>
      </ToolbarRadioGroup>
    </Toolbar>
  );
}
