import React, { useState } from "react";
import styles from "../styles/NewGarbage.module.css";
import axios from "axios";
import Chip from "@mui/material/Chip";

function NewGarbage(props) {
  const bucketURL =
    "https://garbage-collector-files.s3.eu-central-1.amazonaws.com/";
  const [myURL, setMyURL] = useState("");
  // define state
  const [text, setText] = useState("");
  const [expiration, setExpiration] = useState(7);
  const [mailArray, setMailArray] = useState([]);
  const [email, setEmail] = useState("");

  // define functions for reading user inputs
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file.type);
    const response = await axios.post(
      "api/s3",
      { type: file.type, name: file.name },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { url } = await response.data;
    console.log(url);
    try {
      await axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
          ACL: "public-read",
        },
      });
    } catch (error) {
      console.log(error);
    }
    setMyURL(`${bucketURL}/${file.name}`);
    console.log(myURL);
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
      addEmail(email);
      setEmail("");
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
    props.hide();
    props.refresh();
  };
  return (
    <div className={styles.newGarbage}>
      <div className={styles.contentRow}>
        {myURL && <img src={myURL} />}
        Treść:{" "}
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          className={styles.content}
        />{" "}
      </div>
      <div>
        Udostępnij tym osobom:{" "}
        <input
          type="text"
          onKeyPress={enterEmail}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
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
        Wywieź śmieć za:{" "}
        <input
          type="number"
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
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
