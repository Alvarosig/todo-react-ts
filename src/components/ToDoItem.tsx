import styles from './ToDoItem.module.css'
import { ToDo } from './Task';
import { Trash } from 'phosphor-react'
import { useState } from 'react';

interface ToDoItemProps {
  toDo: ToDo;
  handleRemoveTask: (id: string) => void;
}

export function ToDoItem({ toDo: task, handleRemoveTask }: ToDoItemProps) {
  const [isChecked, setIsChecked] = useState(task.isDone);

  function handleTaskDone() {
    setIsChecked(!isChecked)
  }

  return (
    <div className={styles.board}>
      <input onChange={handleTaskDone} type="checkbox" checked={isChecked}/>
      <span>{task.title}</span>
      <button type='button' onClick={() => handleRemoveTask(task.id)}>
        <Trash size={18}/>
      </button>
    </div>
  )
}