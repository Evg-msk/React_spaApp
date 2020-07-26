import React from "react";
import Item from "../Item/Item";
import Checkbox from "@material-ui/core/Checkbox";
import styles from "./ItemList.module.css";
import classnames from "classnames";
import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";

class ItemList extends React.Component {

    render() {
        const {sort, sortValue, onClickDone, onClickDelete, onClickEdit, onChangeItem} = this.props;

        return(
            <div>
            { sort.length === 0 && sortValue !== 'Завершенные' ?
                <div className={styles.task_list_empty}>
                    <span className={styles.picture}> </span>
                    <p className={styles.empty_article}> У вас нет активных задач. </p>
                    <p className={styles.empty_sub_article}> Добавьте хотя бы одну прямо сейчас! </p>
                </div>:
                sort.length === 0 && sortValue !== 'Незавершенные' ?
                    <div className={styles.task_list_empty}>
                        <span className={styles.picture_done}> </span>
                        <p className={styles.empty_article}> Здесь будет отображён список выполненных задач. </p>
                        <p className={styles.empty_sub_article}> Пока Вы не выполнили ни одной задачи. </p>
                    </div>:

                    <Droppable droppableId={'list'}>
                        {(provided) => (
                    <ul className={styles.task_list}
                         ref={provided.innerRef}
                         {...provided.droppableProps}
                    >
                        {sort.map((item, index) =>
                            <Draggable
                                draggableId={'item' + item.id}
                                index={index}
                                key={item.id}
                            >
                                {(provided) => (
                    <li
                        className={styles.task_list_item}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                    <Checkbox
                        checked={item.isDone}
                        color='primary'
                        onClick={() => onClickDone(item.id)}
                    />
                    <Item
                        task={item.task}
                        disabled = {item.disabled}
                        isDone={item.isDone}
                        id={item.id}
                        onChangeItem={onChangeItem}
                    />
                    <div
                        className={
                            classnames({
                                [styles.but_edit]: true,
                                [styles.but_edit_done]: item.isDone + !item.disabled
                            })}
                        onClick={() => onClickEdit(item.id)}
                    />
                    <div
                        className={
                            classnames({
                                [styles.edit_mode_off]: item.disabled + item.isDone,
                                [styles.edit_mode_on]: !item.disabled
                            })}
                        onClick={() => onClickEdit(item.id, item.task)}
                        />
                    <div
                        className={styles.but_delete}
                        onClick={() => onClickDelete(item.id)}
                    />
                </li>)}
                    </Draggable>)}
                        {provided.placeholder}
            </ul>)}
                    </Droppable>}
        </div>);
    }
}
    ItemList.propTypes = {
        items: PropTypes.oneOfType ([
            PropTypes.array.isRequired,
            PropTypes.object.isRequired,
            PropTypes.string.isRequired
        ]),
        onClickDone: PropTypes.func.isRequired,
        onClickDelete: PropTypes.func.isRequired,
        onChangeItem: PropTypes.func.isRequired
    };

export default ItemList;
