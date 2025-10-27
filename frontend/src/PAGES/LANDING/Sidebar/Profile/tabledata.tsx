// columns.js
export const columns:any = [
  {
    accessorKey: "SNo",   // matches data.name
    header: "Sno.",        // column header text
  },
  {
    accessorKey: "name",   // matches data.name
    header: "Name",        // column header text
  },
  {
    accessorKey: "userId",    // matches data.userId
    header: "userId",
  },
  {
    accessorKey: "email",  // matches data.email
    header: "Email",
  },
  {
    accessorKey:"dept",
    header:"Dept"
  }
];



// data.js





export const Data:any = [
  {
    // the key shodl match with the accessor value
    id: "1",
    SNo:1,
    name: "Alice",
    userId: 25,
    email: "alice@example.com",
    dept:"nabc"

  },
  {
    id: "2",
     SNo:2,
    name: "Bob",
    userId: "234houe",
    email: "bob@example.com",
     dept:"sovt"
  },
  {
    id: "3",
     SNo:3,
    name: "Charlie",
    userId: 28,
    email: "charlie@example.com",
    dept:"pdoq"
  },
];
