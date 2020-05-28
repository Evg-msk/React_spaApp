import React from "react";
import styles from "./Header.module.css";
import logo from "./img/logo.png";

const Header = () => (
    <div className={styles.Header}>
        <a
            href='https://webheroschool.ru/'
            target='_blank'
            rel='noopener noreferrer'>
            <img src={logo} alt='Logo WHS' className={styles.logo}/>
        </a>
        <h1 className={styles.title}> Todos app </h1>
        <div className={styles.subtitle}>
            created by <strong> Evgeny Morozov </strong>
        </div>
    </div>
);

export default Header;