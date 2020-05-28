import React from "react";
import styles from "./Contacts.module.css";

const userInfo = {
    email: 'jek1544@mail.ru',
    phoneNumber: '+7(916)-407-77-20'
};

const Contacts = () => (
    <div className={styles.boxContact}>
        <div className={styles.baseInfo}>
            <a href='mailto:jek1544@mail.ru' className={styles.emailLink}>{userInfo.email} </a>
            <a href='tg://resolve?domain=Evgeny Morozov' className={styles.phoneLink}> {userInfo.phoneNumber} </a>
        </div>

        <div className={styles.socialInfo}>
            <a href='https://www.instagram.com/e.morozov_msk'>
                <div className={styles.instagram}> </div>
            </a>
            <a href='https://vk.com/jon.moroz'>
                <div className={styles.vk}> </div>
            </a>
            <a href='https://github.com/Evg-msk'>
                <div className={styles.github}> </div>
            </a>
        </div>
    </div>
);

export default Contacts;