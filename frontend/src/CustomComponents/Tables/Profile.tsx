import React from 'react'
import { TableRenderer } from './default table/TableRenderer'
import { columns } from './default table/Colums'
import { Data } from './default table/Data' 

export default function SampleTable() {
  return (
    <div className='w-[100%] flex justify-center items-center h-[100%] flex-col'>
      <h1 className='text-4xl mb-6'>profile</h1>
        <TableRenderer columns={columns} data={Data} />
    </div>
  )
}
