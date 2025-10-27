import DynamicForm from '@/PAGES/DYNAMIC FORM/DynamicForm'
import React from 'react'

export default function Reports() {
  let arr1=[
    {label:"username",title:"signup"},
    {label:"email"},
    {label:"password"},
    {label:"username"}
  ]

  let arr2=[
    {label:"email",title:"login"},
    
    {label:"password"},
    
  ]
  return (
    <div>
      <DynamicForm formConstructor={arr1}/>

       <DynamicForm formConstructor={arr2}/>
    </div>
  )
}
