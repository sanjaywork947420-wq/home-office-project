import React from 'react'
import { Button } from "@/components/ui/button"
export default function Button1({onClick1}) {

  return (
    <div>
        <Button onClick={onClick1} className='bg-status-info hover:bg-amber-300 cursor-pointer'>
            clcik me new
        </Button>
    </div>
  )
}
