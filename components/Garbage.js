import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import styles from "../styles/Garbage.module.css";

function Garbage(props) {
  const date = new Date(props.data.removeDate);
  const { user } = useUser();
  const isMy = props.data.createdBy === user.sub;
  return (
    <div className={styles.container}>
      <div className={styles.owner}>
        {isMy && "Udostępniłeś"}
        {!isMy && <>{props.data.ownerName} udostępnił Tobie</>}
      </div>
      <div className={styles.content}>{props.data.content}</div>
      <div className={styles.removeDate}>
        Wywóz: {date.toISOString().split("T")[0]}
      </div>
    </div>
  );
}

export default Garbage;
