import { ClipboardText, PlusCircle } from "phosphor-react"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

import { ToDoItem } from "./ToDoItem"
import styles from "./Task.module.css"

export interface ToDo {
  id: string;
  title: string;
  isDone: boolean;
}

export function Task() {
  const [newTitle, setNewTitle] = useState("")
  const [numberOfTasks, setNumberOfTasks] = useState<number>(() => {
  const savedNumberOfTasks = localStorage.getItem("numberOfTasks")
  return savedNumberOfTasks ? JSON.parse(savedNumberOfTasks) : 0
  })
  const [allTasks, setAllTasks] = useState<ToDo[]>(() => {
  const savedTasks = localStorage.getItem("tasks")
  return savedTasks ? JSON.parse(savedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(allTasks))
    localStorage.setItem("numberOfTasks", JSON.stringify(numberOfTasks))
  }, [allTasks, numberOfTasks])

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTitle(event.currentTarget.value)
  }

  function handleCreateNewTask(event: FormEvent) {
    event?.preventDefault()

    if (!newTitle?.trim()) {
      return
    }

    const newToDo: ToDo = {
      title: newTitle,
      isDone: false,
      id: crypto.randomUUID(),
    }
    setAllTasks([...allTasks, newToDo]);
    setNewTitle("")
    setNumberOfTasks(prevNumberOfTasks => prevNumberOfTasks + 1)
  }

  function handleRemoveTask(id: string) {
    setAllTasks(prevTasks => prevTasks.filter( task => task.id !== id))
    setNumberOfTasks(prevNumberOfTasks => prevNumberOfTasks - 1)
  }

  // TO-DO Contador de tarefas concluídas
  return (
    <div className={styles.task}>
      <form onSubmit={handleCreateNewTask}>
        <input
          onChange={handleNewTaskChange}
          value={newTitle}
          type="text"
          placeholder="Adicione uma nova tarefa"
        />
        <button type="submit">
          Criar
          <PlusCircle size={20} weight="bold" />
        </button>
      </form>

        <div className={styles.countTask}>
          <p>
            Tarefas criadas <span>{numberOfTasks}</span>
          </p>
          <p>
            Concluídas <span>{0}</span> 
          </p>
        </div>

        <div className={styles.allTasks}>
          {allTasks.length <= 0 ? (
            <div className={styles.board}>
              <ClipboardText size={56} />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          ) : (
            allTasks.map((task) => {
              return <ToDoItem key={task.id} toDo={task} handleRemoveTask={handleRemoveTask}/>
            })
          )}
        </div>
    </div>
  )
}
