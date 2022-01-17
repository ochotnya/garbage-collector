import React from "react";
import styles from "../styles/TopBar.module.css";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";

function TopBar(props) {
  return (
    <div className={styles.topBar}>
      <div className={styles.controls}>
        <button onClick={props.eventRefresh}>
          <RefreshIcon />
        </button>
        <button onClick={props.eventAddNew}>
          <AddIcon />
        </button>
      </div>
      <div className={styles.title}>Mój śmietnik</div>
      {props.user && (
        <div className={styles.profileControls}>
          <div className={styles.userName}>{props.user.name}</div>
          <img className={styles.img} src={props.user.picture} alt="Logo" />
          <Link href="/api/auth/logout">
            <button>
              <LogoutIcon />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default TopBar;
