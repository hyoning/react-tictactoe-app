import React, { Component } from 'react'
import { MdDelete } from 'react-icons/md'
import ExpenseItem from './ExpenseItem'
import './ExpenseList.css'

export class ExpenseList extends Component {
  render() {
    return (
      <>
        <ul className='list'>
          {this.props.initialExpenses.map(expense =>{
            return(
              <ExpenseItem
                expense = {expense}
                key={expense.id}
                handleDelete={this.props.handleDelete}
              />
            )
          })}

        </ul>
        <button className='btn'>
          목록 지우기
          <MdDelete className='btn-icon'/>
        </button>
      </>
    )
  }
}

export default ExpenseList