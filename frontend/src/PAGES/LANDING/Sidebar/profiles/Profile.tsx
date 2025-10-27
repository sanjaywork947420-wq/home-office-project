import React from 'react'
import { TableRenderer } from '../../../../CustomComponents/Tables/default table/TableRenderer'
import { columns } from '../../../../CustomComponents/Tables/default table/Colums'
import { Data } from '../../../../CustomComponents/Tables/default table/Data' 

export default function SampleTable() {
  return (
    <div className='w-[100%] flex justify-center items-center h-[100%] flex-col'>
      <h1 className='text-4xl mb-6'>profile</h1>
        <TableRenderer columns={columns} data={Data} />
    </div>
  )
}
