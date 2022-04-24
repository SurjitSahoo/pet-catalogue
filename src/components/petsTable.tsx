/* eslint-disable react/no-unstable-nested-components */
import apis, { QUERY_CONST } from 'apis';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Column } from 'react-table';
import { IPet } from 'types/pets';
import Table from './table';

interface Props {
  pets: IPet[];
}
export default function PetsTable({ pets }: Props) {
  const queryClient = useQueryClient();
  const { mutate: deletePet } = useMutation(apis.deletePet, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_CONST.PETS);
    },
  });

  const columns = useMemo<Column<IPet>[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        maxWidth: 100,
      },
      {
        Header: 'Tags',
        accessor: 'tags',
        Cell: ({ cell: { value } }) => {
          const values = value?.split(',');
          if (!values) return '';
          return (
            <div>
              {values.map((val, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <span className='bg-gray-50 mx-1 px-2 rounded-sm' key={val + idx}>
                  {val}
                </span>
              ))}
            </div>
          );
        },
      },
    ],
    [],
  );

  const onDelete = (pet: IPet) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Are you sure you want to delete ${pet.name}?`)) {
      deletePet(pet.id);
    }
  };

  if (!pets.length) {
    return <div>No pets found</div>;
  }

  return (
    <div className='w-8/12 mx-auto'>
      <Table {...{ columns, data: pets, onDelete }} />
    </div>
  );
}
