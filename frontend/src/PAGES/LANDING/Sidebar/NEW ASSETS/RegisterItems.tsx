import DynamicForm from '@/PAGES/DYNAMIC FORM/DynamicForm';
import React from 'react'
import z, { object } from 'zod'

const formSchema = z.object({
    name: z.string().min(2).max(50),
    personalID: z.string().min(2).max(50),
    age: z.string(),
    rank: z.string(),
    department: z.string(),
    unit: z.string(),
    roll: z.string(),
    dob: z.string(),
});

let obj={
  label:"computer"
  ,type:"text",

}


export default function RegisterItems({arr}) {


  return (
    <div>
      <DynamicForm obj={obj}/>
    </div>
  )
}
