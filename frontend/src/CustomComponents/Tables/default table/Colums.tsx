// columns.js
export const columns:any = [
  {
    accessorKey: "SNo",   // matches data.name
    header: "Sno.", 
    enableSorting: false,           // column header text
  },
  {
    accessorKey: "name",   // matches data.name
    header: "Name",  
    enableSorting: true,      // column header text
  },
  {
    accessorKey: "age",    // matches data.age
    header: "Age",
  },
  {
    accessorKey: "email",  // matches data.email
    header: "Email",
  },
  {
    accessorKey:"rollNumber",
    header:"Roll"
  }
  ,
  {
    accessorKey:"action",
    header:"action"
  }
];
