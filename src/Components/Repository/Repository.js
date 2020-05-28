import React from "react";
import styles from "./Repository.module.css";
import classnames from "classnames";


const Respository= ({url, name, forks_count, stargazers_count, language, updated_at}) => (
    <div>
        <div className={styles.repo_name}>
            <a
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.repo_name_link}
            >
                {name}
            </a>
        </div>
        <div className={styles.repo_about}>
            <span className={classnames({
                [styles.language]: true,
                [styles.html_circle]: language === 'HTML',
                [styles.css_circle]: language === 'CSS',
                [styles.js_circle]: language === 'JavaScript'
            })}
            >
                {language}
            </span>
            <span className={styles.stargazers}> {stargazers_count} </span>
            <span className={styles.forks}> {forks_count} </span>
            <span className={styles.updated}>
                {'Updated on ' + new Date(updated_at).toLocaleDateString(
                    'en-GB',
                    {
                        day: 'numeric',
                        month:'short',
                        year: 'numeric'
                    }
                )}
            </span>
        </div>
    </div>
);

export default Respository;