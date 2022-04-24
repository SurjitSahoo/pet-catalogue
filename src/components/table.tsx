/* eslint-disable react/jsx-key */
import { Column, useGlobalFilter, usePagination, useSortBy, useTable, Row, useFlexLayout } from 'react-table';
import { AiFillDelete, AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';
import { a11yOnClick } from 'utils';
import { useCallback } from 'react';
import { IPet } from 'types/pets';
import TablePagination from './tablePagination';

interface Props {
  columns: Column<IPet>[];
  data: IPet[];
  onDelete: (row: IPet) => void | null;
  deleteTitle?: string;
}
export default function Table({ columns, data, onDelete, deleteTitle = 'Delete' }: Props) {
  const RowActions = useCallback(
    ({ row }: { row: Row<any> }) => (
      <div
        title={deleteTitle}
        className='p-1 w-max hover:bg-red-200 hover:text-red-700 transition-all duration-200 rounded-md'
        {...a11yOnClick({ role: 'button', fn: () => onDelete(row.original) })}>
        <AiFillDelete size={24} />
      </div>
    ),
    [onDelete, deleteTitle],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,

    // pagination stuff
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },

    // Filter
    // setGlobalFilter,
    // preGlobalFilteredRows,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination, useFlexLayout, hooks => {
    hooks.visibleColumns.push(cols => [
      ...cols,
      {
        Header: 'Actions',
        Cell: RowActions,
        maxWidth: 30,
        minWidth: 90,
      },
    ]);
  });

  return (
    <>
      <table {...getTableProps()} className='w-full table-fixed rounded-lg border-collapse overflow-hidden'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className='flex justify-between items-center bg-gray-300 py-2 px-4'>
                    <div>{column.render('Header')}</div>
                    {(function getSortingUI() {
                      if (column.isSorted) {
                        if (column.isSortedDesc) {
                          return <AiFillCaretDown className='text-teal-700' />;
                        }
                        return <AiFillCaretUp className='text-teal-700' />;
                      }
                      if (column.canSort) {
                        return <span className='text-teal-700'>Sort</span>;
                      }
                      return null;
                    })()}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className='group even:bg-gray-100 hover:bg-gray-200 transition-all duration-200'>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    className='px-4 group-hover:first:underline group-hover:first:cursor-pointer'>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <TablePagination
        {...{
          nextPage,
          previousPage,
          canNextPage,
          canPreviousPage,
          gotoPage,
          pageCount,
          pageIndex,
          pageOptions,
          pageSize,
          setPageSize,
        }}
      />
    </>
  );
}
