import React, { useEffect, useState } from "react";
import Garbage from "./Garbage";
import styles from "../styles/Garbage.module.css";
import axios from "axios";

function GarbageWall(props) {
  return (
    <div className={styles.GarbageWall}>
      {props.data.map((garbage) => (
        <Garbage
          key={garbage._id}
          data={garbage}
          refresh={() => props.refresh()}
        />
      ))}
    </div>
  );
}

export default GarbageWall;
