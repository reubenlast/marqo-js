"use client";

// Import necessary dependencies from '@fluentui/react-components'
import {
  makeStyles,
  shorthands,
  Title3,
  tokens,
} from "@fluentui/react-components";
import Image from "next/image";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    padding: "0.5rem 1rem",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: tokens.colorNeutralBackground3,
    gap: "1rem",
    alignItems: "center",
  },
  main: { height: "100%", overflowY: "hidden" },
});

function Header({ children }) {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          src="/logo_s.png"
          alt="Image"
          width={32}
          height={32}
          className="rounded-md object-cover"
        />
        <Title3>Marqo - JS Demo</Title3>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Header;
