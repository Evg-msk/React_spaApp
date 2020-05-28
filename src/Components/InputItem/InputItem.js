import React from "react";
import styles from "./Input.module.css";
import classnames from "classnames";
import PropTypes from "prop-types";

class InputItem extends React.Component {
    state = {
            inputValue: ''
    };

    onIconClick = () => {
        this.setState({
            inputValue: ''
        });
            this.props.onClickAdd(this.state.inputValue);
    };

    render() {
        const {isEmpty, isExist} = this.props;
        return (
            <form className={styles.tasks}>
                <div className={classnames({
                    [styles.input_box]: true,
                    [styles.input_empty]: isEmpty,
                    [styles.input_exist]: isExist
                })}>
                    <input
                        type='text'
                        placeholder="Введите новую задачу"
                        className={classnames({
                            [styles.input]: true,
                            [styles.input_empty]: isEmpty,
                            [styles.input_exist]: isExist
                        })}
                        value={this.state.inputValue}
                        onChange={event => this.setState({inputValue: event.target.value})}
                    />
                </div>
                <div className={styles.addbutton} onClick={this.onIconClick}> </div>
            </form>);
    }
}

    InputItem.propTypes = {
        onClickAdd: PropTypes.func.isRequired,
        isEmpty: PropTypes.bool.isRequired,
        isExist: PropTypes.bool.isRequired
    };

export default InputItem;
