import React from "react";
import styles from "./Footer.module.css";
import classnames from "classnames";

const Footer = ({items, onClickSort, sorting}) => {
    const allTasks = items.length;
    const completedTasks = items.filter(item => item.isDone).length;
    const uncompletedTasks = items.filter(item => !item.isDone).length;

    return(
        <div className={styles.footer_menu}>
            <h1 className={styles.footer_title}> Список моих дел </h1>
            <button
                className={classnames({
                    [styles.button]: true,
                    [styles.selected]: sorting === 'Завершенные'
                })}
                onClick={()=>onClickSort('Завершенные')
                }>
                    Завершённые
                <span className={styles.task_count}> {completedTasks} </span>
            </button>
            <button
                className={classnames({
                    [styles.button]: true,
                    [styles.selected]: sorting === 'Незавершенные'
                })}
                onClick={()=> onClickSort('Незавершенные')
                }>
                Незавершённые
                <span className={styles.task_count}> {uncompletedTasks} </span>
            </button>
            <button
                className={classnames({
                    [styles.button]: true,
                    [styles.selected]: sorting === 'Все'
                })}
                onClick={()=> onClickSort('Все')
                }>
                Все
                <span className={styles.task_count}> {allTasks} </span>
            </button>
        </div>
    )
};

export default Footer;