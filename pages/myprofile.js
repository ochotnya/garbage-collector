import GarbageWall from "../components/GarbageWall";
import TopBar from "../components/TopBar";
import styles from "../styles/content.module.css";
import NewGarbage from "../components/NewGarbage";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function MyProfile({ items }) {
  const { user, isLoading } = useUser();
  const [itemList, setItemList] = useState([]);
  const [showNew, setShowNew] = useState(false);

  const refreshList = async () => {
    const data = await GetList();
    setItemList(data.garbages);
  };

  const showHideNew = () => {
    setShowNew(!showNew);
  };
  useEffect(() => {
    refreshList();
  }, []);
  return (
    <div className={styles.page}>
      <TopBar
        user={user}
        eventAddNew={showHideNew}
        eventRefresh={refreshList}
      />
      <div className={styles.content}>
        {showNew && (
          <NewGarbage
            hide={() => setShowNew(false)}
            refresh={() => refreshList()}
          />
        )}
        <GarbageWall data={itemList} refresh={() => refreshList()} />
      </div>
    </div>
  );
}

async function GetList() {
  const response = await axios.get("/api/garbages");
  const items = response.data;
  return items;
}

export const getServerSideProps = withPageAuthRequired();
