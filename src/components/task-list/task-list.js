import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../task'

import './task-list.css'

export default class TaskList extends Component {
  static defaultProps = {
    todos: [],
  }

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
  }

  render() {
    const { todos, onCompleted, onDeleted } = this.props

    const tasks = todos.map((task) => {
      const { id, completed } = task

      // if ( '' === "editing") {
      //   return (
      //     <li className={ status } key={id}>
      //       <input type="text" class="edit" value="Editing task" />
      //     </li>
      //   );
      // }

      let classNames = ''

      if (completed) {
        classNames += 'completed'
      }

      return (
        <li className={classNames} key={id}>
          <Task taskProps={task} onCompleted={(id) => onCompleted(id)} onDeleted={(id) => onDeleted(id)} />
        </li>
      )
    })

    return <ul className="todo-list">{tasks}</ul>
  }
}
