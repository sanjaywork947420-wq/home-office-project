import React from 'react'
import { TableRenderer } from './default table/TableRenderer'
import { columns } from './default table/Colums'
import { Data } from './default table/Data' 

export default function SampleTable() {
  return (
    <div>
        <TableRenderer columns={columns} data={Data} />
    </div>
  )
}
