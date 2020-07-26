import React from "react";
import Contacts from "../Contacts/Contacts";
import styles from "./About.module.css";
import {Octokit} from "@octokit/rest";
import RepoList from "../RepoList/RepoList";

const octokit = new Octokit();
class About extends React.Component {
    state = {
        username: 'Evg-msk',
        isLoading: true,
        repoList: [],
        fetchFail: false,
        errorMessage: '',
        infoOfUser: [],
        firstRepo: 0,
        lastRepo: 5
    };

    componentDidMount() {
        octokit.repos.listForUser({
            username: this.state.username
        }).then(({data}) => {
            this.setState({
                repoList: data,
                isLoading: false
            });
        })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    fetchFail: true,
                    errorMessage: err
                });
            });

        octokit.users.getByUsername({
            username: this.state.username
        }).then(({data}) => {
            this.setState({
                infoOfUser: data,
                isLoading: false
            });
        })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    fetchFail: true,
                    errorMessage: err
                });
            });
    };

    onClickNext = () => {
        this.setState({
            firstRepo: this.state.firstRepo + 5,
            lastRepo: this.state.lastRepo + 5
        });
    };

    onClickBack = () => {
        this.setState({
            firstRepo: this.state.firstRepo - 5,
            lastRepo: this.state.lastRepo - 5
        });
    };

    render() {
        const {isLoading, repoList, fetchFail, infoOfUser} = this.state;
        const Preloader = () => <span className={styles.preloader}> </span>;
        return (
            <div className={styles.boxAbout}>
                <div className={styles.userBox}>
                    {isLoading ? <Preloader/> :
                        <div>
                            {fetchFail ?
                                <div className={styles.info}>
                                    <h2> Evgeny Morozov </h2>
                                    <Contacts/>
                                </div> :
                                <div className={styles.user}>
                                    <img src={infoOfUser.avatar_url} alt='Здесь должно быть фото' className={styles.avatar}/>
                                    <div className={styles.info_user}>
                                    <h3> {infoOfUser.name} </h3>
                                    <p> {infoOfUser.bio} </p>
                                    <Contacts/>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
                <div className={styles.repos}>
                    {isLoading ?
                        <div>
                            <h3> Список репозиториев на github.com </h3>
                            <Preloader/>
                        </div> :
                        <div>
                            {fetchFail ?
                                <div>
                                    <h3> Что-то пошло не так. Невозможно отобразить список репозиториев :( </h3>
                                </div> :
                                <div>
                                    {repoList.length === 0 ?
                                        <div>
                                            <h3> Список репозиториев на github.com. К сожалению у Вас нет ниодного репозитория... </h3>
                                        </div> :
                                        <RepoList
                                            repoList={repoList}
                                            infoOfUser={infoOfUser}
                                            onClickNext={this.onClickNext}
                                            onClickBack={this.onClickBack}
                                            firstRepo={this.state.firstRepo}
                                            lastRepo={this.state.lastRepo}
                                        />
                                    }
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        )
    };
};



export default About;