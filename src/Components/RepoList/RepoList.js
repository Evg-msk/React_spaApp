import React from "react";
import styles from "./RepoList.module.css";
import Repository from "../Repository/Repository";

const RepoList = ({repoList, onClickNext, onClickBack, firstRepo, lastRepo }) => {
    return(
        <div>
            {repoList.length < 6 ?
                <ol className={styles.repo_list}>
                    {repoList.map(repo => (<li key={repo.id}>
                            <Repository
                                url={repo.html_url}
                                name={repo.name}
                                language={repo.language}
                                stargazers_count={repo.stargazers_count}
                                forks_count={repo.forks_count}
                                updated_at={repo.updated_at}
                            />
                        </li>
                    ))}
                </ol> :
                <div>
                    <ol className={styles.repo_list}>
                        {repoList.slice(firstRepo, lastRepo).map(repo => (
                            <li key={repo.id}>
                                <Repository
                                    url={repo.html_url}
                                    name={repo.name}
                                    language={repo.language}
                                    stargazers_count={repo.stargazers_count}
                                    forks_count={repo.forks_count}
                                    updated_at={repo.updated_at}
                                />
                            </li>
                        ))}
                    </ol>
                    <div className={styles.buttons_wrap}>
                        <button
                            className={styles.button}
                            onClick={()=>onClickBack()}
                            disabled={firstRepo < 5}
                        >
                            Назад
                        </button>
                        <button
                            className={styles.button}
                            onClick={()=>onClickNext()}
                            disabled={repoList.length - lastRepo <= 0}
                        >
                            Далее
                        </button>
                    </div>
                </div>
            }
        </div>
    )};

export default RepoList;