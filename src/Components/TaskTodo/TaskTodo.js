import React, {useState} from "react";
import InputItem from "../InputItem/InputItem";
import ItemList from "../ItemList/ItemList";
import Footer from "../Footer/Footer";
import styles from "./TaskTodo.module.css";
import { DragDropContext } from "react-beautiful-dnd";

const TaskTodo = () => {
   const initialState = {
        items :
            JSON.parse(localStorage.getItem('editedList') ||
                '[{"task": "Задача №1", "isDone": true, "id": 1, "disabled": true}, {"task": "Обязательно нужно что-то сделать!", "isDone": false, "id": 2, "disabled": true}]'
            ),
        count: 2,
        sortTask: 'Все',
        isEmpty: false,
        isExist: false,
        isEdited: false
    };

   const [items, setItems] = useState(initialState.items);
   const [count, setCount] = useState(initialState.count);
   const [isEmpty, setEmpty] = useState(initialState.isEmpty);
   const [isExist, setExist] = useState(initialState.isExist);
   const [sortTask, setSort] = useState(initialState.sortTask);

    const onClickDone = id => {
        const newItemList = items.map( item => {
            const newItem = {...item};
            if (item.id === id && item.disabled) {
                newItem.isDone = !item.isDone;
            }
            return newItem;
        });
        setItems(newItemList)
   };

    const onClickDelete = id => {
        const newItemList = items.filter(item => item.id !== id);
        setItems(newItemList);
        setCount(count - 1);
    };

    const onClickAdd = task => {
        if (task !== '' && !items.some(item => item.task === task)) {
            const id = items.length > 0?
                items[items.length-1].id + 1: 0;
            const newItems = [
                ...items,
                {
                    task,
                    isDone: false,
                    id: id,
                    disabled: true
                }
            ];
            setItems(newItems);
            setCount(count + 1);
            setSort('Незавершенные');
            setEmpty(false);
            setExist(false);
        } else {
            setEmpty(task === '');
            setExist(task !== '');
        }
    };

   const onClickEdit = (id, task) => {
       if (task === '') {
           return;
       }
           const newItemList = items.map( item => {
               if (item.id === id) {
                   item.disabled = !item.disabled;
               }
               return item;
           });
           setItems(newItemList);
   };

   const onChangeItem = (id, newTask) => {
       const newItemList = items.map(item => {
           const newTaskValue = {...item};
           if (item.id === id) {
               newTaskValue.task = newTask;
           }
           return newTaskValue;
       });
           setItems(newItemList);
   };

   const onClickSort = sorting => setSort(sorting);

   const onDragEnd = result => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        const newItemList = [...items];
        const [removed] = newItemList.splice(source.index, 1);
        newItemList.splice(destination.index, 0, removed);
        setItems([...newItemList])
    };

        let addToLocal = JSON.stringify(items);
        localStorage.setItem('editedList', addToLocal);

        let sortingTasks;
        switch (sortTask) {
            case 'Завершенные':
                sortingTasks = items.filter(item => item.isDone);
                break;
            case 'Незавершенные':
                sortingTasks = items.filter(item => !item.isDone);
                break;
            case 'Все':
                sortingTasks = items;
                break;
            default :
                sortingTasks = items;
        }
        return (
            <div className={styles.container}>
                <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.footer}>
                    <Footer
                        items={items}
                        onClickSort={onClickSort}
                        sorting={sortTask}
                    />
                </div>
                <div className={styles.tasks_item_list}>
                <ItemList
                    task = {items.task}
                    disabled = {items.disabled}
                    sort={sortingTasks}
                    sortValue={sortTask}
                    onClickDone={onClickDone}
                    onClickDelete={onClickDelete}
                    onClickEdit = {onClickEdit}
                    onChangeItem = {onChangeItem}
                />
                </div>
                <InputItem onClickAdd={onClickAdd} isEmpty={isEmpty} isExist={isExist}/>
                </DragDropContext>
            </div>)
    };

export default TaskTodo;