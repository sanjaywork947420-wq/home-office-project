import React from 'react'
import { Button } from "@/components/ui/button"
import Button1 from '../../CustomComponents/Button1'
import SmallForm from '../../CustomComponents/FORMS/SmallForm'

  import LoginForm from '../../CustomComponents/FORMS/LoginForm'
import { SideBar } from '../LANDING/NAVIGATION/SideBar'
import { NavBar } from '../LANDING/NAVIGATION/NavBar'
export default function Home() {
  function onclick(){
   
  }
 
  return (
    <div>
      <div className="flex bg-[#111827]  min-h-svh flex-col items-center justify-center home">
      {/* <Button1 onClick1={onclick}></Button1> */}

      <LoginForm/><br />

{/* <SmallForm/> */}

   
    </div>
    </div>
  )
}
