/* eslint-disable indent */
import React, { Component } from 'react'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

import './app.css'

export default class App extends Component {
  maxId = 100
  state = {
    taskList: [this.createTask('Completed task'), this.createTask('Editing task'), this.createTask('Active task')],
    filter: 'all',
  }

  filter(list, filter) {
    switch (filter) {
      case 'all':
        return list
      case 'active':
        return list.filter((el) => !el.completed)
      case 'completed':
        return list.filter((el) => el.completed)
      default:
        return list
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  clearCompleted = () => {
    this.setState(({ taskList }) => {
      const newArr = taskList.filter((el) => !el.completed)
      return {
        taskList: newArr,
      }
    })
  }

  createTask(label) {
    return {
      label,
      id: this.maxId++,
      timeNow: Date.now(),
      completed: false,
    }
  }

  addTask = (label) => {
    this.setState(({ taskList }) => {
      const newArr = [...taskList, this.createTask(label)]
      return {
        taskList: newArr,
      }
    })
  }

  taskStatus = (id) => {
    this.setState(({ taskList }) => {
      const indx = taskList.findIndex((el) => el.id === id)
      let completed = taskList[indx].completed

      const newArr = taskList.map((task, i) => {
        const newTask = { ...task }
        if (i === indx) {
          newTask.completed = !completed
        }
        return newTask
      })

      return {
        taskList: newArr,
      }
    })
  }

  deleteTask = (id) => {
    this.setState(({ taskList }) => {
      const indx = taskList.findIndex((el) => el.id === id)
      const newArr = [...taskList.slice(0, indx), ...taskList.slice(indx + 1)]
      return {
        taskList: newArr,
      }
    })
  }

  render() {
    const { taskList, filter } = this.state

    const numLeft = taskList.length - taskList.filter((el) => el.completed).length

    const visibleItems = this.filter(taskList, filter)

    return (
      <section className="todoapp">
        <header>
          <h1>todos</h1>
          <NewTaskForm onAdded={(label) => this.addTask(label)} />
        </header>
        <section className="main">
          <TaskList
            todos={visibleItems}
            onCompleted={(id) => this.taskStatus(id)}
            onDeleted={(id) => this.deleteTask(id)}
          />
          <Footer
            numLeft={numLeft}
            clearCompleted={() => this.clearCompleted()}
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </section>
      </section>
    )
  }
}
