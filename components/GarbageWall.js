import React, { useEffect, useState } from 'react'
import Garbage from './Garbage'
import styles from '../styles/Garbage.module.css'
import axios from 'axios'

function GarbageWall({data}) {
    return (
        <div className={styles.GarbageWall}>
            {data.map(garbage => <Garbage key={garbage._id} data={garbage}/>)}
        </div>
    )
}

export default GarbageWall