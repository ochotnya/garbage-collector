import React, { useState } from "react";
import styles from "../styles/NewGarbage.module.css";
import axios from "axios";
import Chip from "@mui/material/Chip";
import AttachFileIcon from "@mui/icons-material/AttachFile";

function NewGarbage(props) {
  // define state
  const [text, setText] = useState("");
  const [expiration, setExpiration] = useState(7);
  const [mailArray, setMailArray] = useState([]);

  // define functions for reading user inputs
  const updateText = (e) => {
    setText(e.target.value);
  };

  const updateExpiration = (e) => {
    setExpiration(e.target.value);
  };

  const addEmail = (email) => {
    setMailArray([...mailArray, email]);
  };

  const removeEmail = (i) => {
    setMailArray(mailArray.filter((item, index) => index !== i));
  };

  // define user actions
  const enterEmail = (e) => {
    if (e.key === "Enter") {
      addEmail(e.target.value);
    }
  };

  const deleteEmailFromList = (index) => () => {
    removeEmail(index);
  };

  // define data object
  const newEntry = {
    content: text,
    expireIn: expiration,
    sharedTo: mailArray,
  };

  const saveData = async () => {
    console.log(newEntry);
    await axios.post("/api/garbages", newEntry, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // .then((res) => props.hide());
    props.hide();
    props.refresh();
  };
  return (
    <div className={styles.newGarbage}>
      <div className={styles.contentRow}>
        Treść:{" "}
        <input type="text" onChange={updateText} className={styles.content} />{" "}
        <button className={styles.attachFileButton}>
          <AttachFileIcon />
        </button>
      </div>

      <div>
        Udostępnij tym osobom: <input type="text" onKeyPress={enterEmail} />
        {mailArray.map((mail, index) => (
          <>
            {" "}
            <Chip
              classes={styles.chip}
              key={index}
              label={mail}
              onDelete={deleteEmailFromList(index)}
              size="small"
            />
          </>
        ))}
        <div className={styles.mailRow}></div>
      </div>

      <div>
        Wywieź śmiecia za:{" "}
        <input
          type="number"
          value={expiration}
          onChange={updateExpiration}
        ></input>{" "}
        dni
      </div>
      <button onClick={saveData} className={styles.saveButton}>
        Dodaj
      </button>
    </div>
  );
}

export default NewGarbage;
