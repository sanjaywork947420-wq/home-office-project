
import { TableRenderer } from '@/CustomComponents/Tables/default table/TableRenderer'
import React from 'react'
import { columns, Data } from './tabledata'

export default function ResetTable() {
  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-3xl mb-6'>Pending Password Resets</h1>
       <TableRenderer columns={columns} data={Data} />
    </div>
  )
}
