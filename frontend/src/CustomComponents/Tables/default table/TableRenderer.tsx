"use client";

import React, { useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import styles from "./DataTable.module.css";
import { Search } from "lucide-react";
export function TableRenderer({ columns, data }) {
  const [sorting, setSorting] = useState([]); // initial table unsorted
  const [globalFilter, setGlobalFilter] = useState(""); // search filter

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // enable filtering
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className={styles.container}>
      {/* Search bar */}
      <div className="mb-2 relative w-full md:w-1/3">
  <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
  <input
    type="text"
    placeholder="Search..."
    value={globalFilter ?? ""}
    onChange={(e) => setGlobalFilter(e.target.value)}
    className="pl-7 border border-gray-400 rounded px-3 py-1 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
  />
</div>

      {/* Table */}
      <Table className="w-[800px]">
        {/* Table Header */}
        <TableHeader className={styles.header}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className={styles.tableRow}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className={styles.headerCell}>
                  {header.isPlaceholder ? null : (
                    <button
                      className="flex items-center gap-1 text-sm"
                      {...(header.column.columnDef.enableSorting
                        ? { onClick: header.column.getToggleSortingHandler() }
                        : {})}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {/* Show sorting arrows only if sorting is enabled */}
                      {header.column.columnDef.enableSorting &&
                        (header.column.getIsSorted() === "asc"
                          ? " 🔼"
                          : header.column.getIsSorted() === "desc"
                          ? " 🔽"
                          : "")}
                    </button>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className={styles.row}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={styles.cell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className={styles.empty}>
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
