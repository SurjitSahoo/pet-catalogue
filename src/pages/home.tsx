import apis, { QUERY_CONST } from 'apis';
import CreatePet from 'components/createPetForm';
import PetsTable from 'components/petsTable';
import { useQuery } from 'react-query';

export default function Home() {
  const { isLoading, data: pets } = useQuery(QUERY_CONST.PETS, apis.getPets);

  if (isLoading) return <span>Loading...</span>;
  return pets ? (
    <div className='mx-auto'>
      <CreatePet />
      <PetsTable {...{ pets }} />
    </div>
  ) : null;
}
