import apis, { QUERY_CONST } from 'apis';
import CreatePet from 'components/createPetForm';
import PetsTable from 'components/petsTable';
import { useQuery } from 'react-query';
import Error from './error/Error';

export default function Home() {
  const { isLoading, data: pets, isError } = useQuery(QUERY_CONST.PETS, apis.getPets);

  if (isLoading) {
    return (
      <div className='min-w-[32rem] mt-28 h-full flex justify-center items-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-4 border-teal-700' />
      </div>
    );
  }

  if (isError) return <Error />;

  return pets ? (
    <div className='mx-auto w-full lg:max-w-[110rem]'>
      <CreatePet />
      <PetsTable {...{ pets }} />
    </div>
  ) : null;
}
