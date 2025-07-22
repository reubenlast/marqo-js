import { makeStyles, useFluent } from "@fluentui/react-components";
import { MoreVerticalRegular } from "@fluentui/react-icons";
import { forwardRef } from "react";

const useStyles = makeStyles({
  root: {
    transition: "background-color 0.2s ease-in-out",
    width: "1px",
    backgroundColor: "var(--colorNeutralStrokeSubtle)",
    ":hover": {
      backgroundColor: "var(--colorNeutralStrokeSubtle)",
      width: "1px",
    },
    ":active": {
      backgroundColor: "var(--colorBrandForegroundInvertedHover)",
      width: "2px",
    },
    ":focus": {
      backgroundColor: "var(--colorNeutralStrokeSubtle)",
    },
    height: "100%",
    cursor: "ew-resize",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
});

export const ResizeHandle = forwardRef((props, ref) => {
  
  const { position, ...rest } = props;
  const { dir } = useFluent();
  const styles = useStyles();

  const handleClick = (event) => {
    if (event.detail === 2) {
      props.onDoubleClick?.();
    }
  };

  const positioningAttr =
    dir === "ltr"
      ? position === "start"
        ? "left"
        : "right"
      : position === "start"
      ? "right"
      : "left";

  const positioningProps = {
    [positioningAttr]: "0px",
  };

  return (
    <div
      {...rest}
      ref={ref}
      onClick={handleClick}
      tabIndex={0}
      style={{
        ...positioningProps,
      }}
      className={styles.root}
    />
  );
});
