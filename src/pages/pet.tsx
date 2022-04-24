import apis, { QUERY_CONST } from 'apis';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { loremIpsum } from 'lorem-ipsum';
import betterFetch from 'utils';

export default function Pet() {
  const { petId } = useParams();

  const pet = useQuery([QUERY_CONST.PET, petId], () => apis.getPet(petId ?? ''), {
    enabled: !!petId,
  });

  const image = useQuery(['random-image', petId], () => betterFetch('https://dog.ceo/api/breeds/image/random'), {
    enabled: !!petId,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });

  return image.data && pet.data ? (
    <div className='flex mt-12 justify-center'>
      <img src={image.data.message} alt='pet' className='shadow-md rounded-md mr-6 max-h-[70vh] max-w-[40vw]' />
      <div className='flex flex-col justify-center'>
        <h1 className='text-4xl font-semibold'>{pet.data.name}</h1>
        <div className='my-4'>
          {pet.data.tags?.split(',').map(tag => (
            <span key={tag} className='bg-gray-100 rounded-md px-2 py-1 mr-2'>
              {tag}
            </span>
          ))}
        </div>
        <p className='prose'>{loremIpsum({ units: 'paragraph', count: 2 })}</p>
      </div>
    </div>
  ) : null;
}
