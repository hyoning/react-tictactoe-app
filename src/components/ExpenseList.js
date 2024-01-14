import React, { Component } from 'react'
import { MdDelete } from 'react-icons/md'
import ExpenseItem from './ExpenseItem'
import './ExpenseList.css'

export class ExpenseList extends Component {
  render() {
    return (
      <>
        <ul className='list'>
          <ExpenseItem/>
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