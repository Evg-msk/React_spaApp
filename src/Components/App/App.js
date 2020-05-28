import React from "react";
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import TaskTodo from "../TaskTodo/TaskTodo";
import About from "../About/About";
import styles from "./App.module.css";
import Header from "../Header/Header";

const App = () =>
    (<Router>
            <div className={styles.box}>
                <Header/>
                <nav>
                        <NavLink to='/' exact className={styles.link} activeClassName={styles.link_active}> Обо мне </NavLink>
                        <NavLink to = '/taskTodo' className={styles.link} activeClassName={styles.link_active}> Список Дел </NavLink>
                </nav>
                <div>
                    <Route path = '/' exact component={About}/>
                    <Route path ='/taskTodo' component ={TaskTodo}/>
                </div>
            </div>
        </Router>);

export default App;