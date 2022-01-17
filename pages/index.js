import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

export default function Home() {
  const { user, isLoading } = useUser();
  return (
    <>
      <div className={styles.mainFrame}>
        <div className={styles.welcome}>
          <h1>Witaj w Garbage Collectorze!</h1>
          <h3>Udostępnij swoje śmieci innym użytkownikom</h3>
        </div>
        <div className={styles.login}>
          <Link href="/myprofile">
            <button className={styles.loginButton}>Rozpocznij</button>
          </Link>
          {user && <h1>{user.email}</h1>}
          <div></div>
        </div>
      </div>
    </>
  );
}
