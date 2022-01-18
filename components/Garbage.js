import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import styles from "../styles/Garbage.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import axios from "axios";

function Garbage(props) {
  const [openPopup, setOpenPopup] = useState(false);
  const date = new Date(props.data.removeDate);
  const { user } = useUser();
  const isMy = props.data.createdBy === user.sub;
  const sharedCount = props.data.sharedTo.length;

  const headerText = () => {
    switch (sharedCount) {
      case 0:
        return "Zapisałeś ";

      case 1:
        return "Udostępniłeś użytkownikowi ";

      default:
        return "Udostępniłeś użytkownikom ";
    }
  };

  const deleteItem = async () => {
    console.log(props.data._id);
    await axios.delete(`/api/garbages/${props.data._id}`);
    props.refresh();
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.owner}>
          {isMy && (
            <>
              {headerText()}{" "}
              {props.data.sharedTo.map((email, index) => {
                if (index < sharedCount - 1) return email + ", ";
                return email;
              })}
            </>
          )}
          {!isMy && <>{props.data.ownerName} udostępnił Tobie</>}
        </div>
        <div className={styles.rightColumn}>
          <div
            className={
              openPopup
                ? styles.removeControlsShown
                : styles.removeControlsHidden
            }
          >
            {openPopup ? (
              <div className={styles.removeText}>Czy usunąć ten element?</div>
            ) : (
              <button
                className={styles.removeButton}
                onClick={() => setOpenPopup(true)}
              >
                <DeleteOutlineIcon />
              </button>
            )}

            <button className={styles.confirmButton} onClick={deleteItem}>
              <CheckIcon />
            </button>
            <button
              className={styles.denyButton}
              onClick={() => setOpenPopup(false)}
            >
              <DoDisturbIcon />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.content}>{props.data.content}</div>
      <div className={styles.removeDate}>
        Wywóz: {date.toISOString().split("T")[0]}
      </div>
    </div>
  );
}

export default Garbage;
