interface Props {
  previousPage: () => void;
  canPreviousPage: boolean;
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  nextPage: () => void;
  canNextPage: boolean;
  pageCount: number;
  pageOptions: number[];
  pageIndex: number;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
}
export default function TablePagination({
  previousPage,
  canPreviousPage,
  gotoPage,
  nextPage,
  canNextPage,
  pageCount,
  pageOptions,
  pageIndex,
  pageSize,
  setPageSize,
}: Props) {
  return (
    <div className='flex justify-end items-center flex-col sm:flex-row my-3'>
      <button
        className='px-3 py-1 rounded-md hover:font-bold hover:shadow-sm hover:bg-gray-200 transition-all duration-200'
        type='button'
        onClick={() => gotoPage(0)}
        title='First Page'
        disabled={!canPreviousPage}>
        {'<<'}
      </button>
      <button
        className='px-3 py-1 rounded-md hover:font-bold hover:shadow-sm hover:bg-gray-200 transition-all duration-200'
        type='button'
        onClick={() => previousPage()}
        title='Previous Page'
        disabled={!canPreviousPage}>
        {'<'}
      </button>
      <button
        className='px-3 py-1 rounded-md hover:font-bold hover:shadow-sm hover:bg-gray-200 transition-all duration-200'
        type='button'
        onClick={() => nextPage()}
        title='Next Page'
        disabled={!canNextPage}>
        {'>'}
      </button>
      <button
        className='px-3 py-1 rounded-md hover:font-bold hover:shadow-sm hover:bg-gray-200 transition-all duration-200'
        type='button'
        onClick={() => gotoPage(pageCount - 1)}
        title='Last Page'
        disabled={!canNextPage}>
        {'>>'}
      </button>
      <span>
        Page{' '}
        <strong>
          {pageOptions.length ? pageIndex + 1 : 0} of {pageOptions.length}
        </strong>
      </span>
      <span className='mx-1'>| Go to page: </span>
      <input
        type='number'
        defaultValue={pageIndex + 1}
        onChange={e => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0;
          gotoPage(page);
        }}
        className='form-input rounded-sm bg-gray-100 border-transparent mr-2'
        style={{ width: '5rem' }}
      />
      <select
        value={pageSize}
        className='form-select rounded-sm bg-gray-100 border-transparent'
        onChange={e => {
          setPageSize(Number(e.target.value));
        }}>
        {[10, 20, 30, 40, 50, 100].map(itemsPerPage => (
          <option key={itemsPerPage} value={itemsPerPage}>
            Show {itemsPerPage}
          </option>
        ))}
      </select>
    </div>
  );
}
