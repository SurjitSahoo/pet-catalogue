import apis, { QUERY_CONST } from 'apis';
import { useState, FormEvent, MouseEvent } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { v4 as uuid4 } from 'uuid';

type FormInput = {
  value: string;
  isTouched: boolean;
  isValid: boolean;
};

export default function CreatePet() {
  const [name, setName] = useState<FormInput>({ value: '', isTouched: false, isValid: true });
  const [tags, setTags] = useState<FormInput>({ value: '', isTouched: false, isValid: true });

  const queryClient = useQueryClient();
  const {
    mutate: createPet,
    isError,
    isLoading,
  } = useMutation(apis.createPet, {
    onSuccess: () => {
      setName({ value: '', isTouched: false, isValid: true });
      setTags({ value: '', isTouched: false, isValid: true });
      queryClient.invalidateQueries(QUERY_CONST.PETS);
    },
  });

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName({ value: e.target.value, isTouched: true, isValid: true });
  };

  const onTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags({ value: e.target.value, isTouched: true, isValid: true });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createPet({
      id: uuid4(),
      name: name.value,
      tags: tags.value,
    });
  };

  return (
    <div className='my-4 pb-4 border-b w-8/12 mx-auto'>
      <form className='flex items-center justify-between flex-col sm:flex-col lg:flex-row' onSubmit={onSubmit}>
        <input
          type='text'
          className='bg-gray-100 lg:w-[30%] w-full mb-4 lg:mb-0 rounded-md border-transparent'
          placeholder='Pet Name'
          value={name.value}
          onChange={onNameChange}
        />
        <input
          type='text'
          className='bg-gray-100 lg:w-[30%] w-full mb-4 lg:mb-0 rounded-md border-transparent'
          placeholder='Tags (Comma Separated)'
          value={tags.value}
          onChange={onTagChange}
        />
        <button
          type='submit'
          onClick={onSubmit}
          disabled={isLoading}
          className='bg-green-700 w-full max-w-sm lg:max-w-fit disabled:bg-green-400 disabled:cursor-progress disabled:shadow-none text-white uppercase font-semibold px-8 py-2 rounded-md hover:shadow-md transition-all duration-200'>
          {isLoading ? (
            <div className='min-w-[4rem] flex justify-center items-center'>
              <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white' />
            </div>
          ) : (
            <span>Add Pet</span>
          )}
        </button>
      </form>
      {isError && <div className='text-red-500 mt-2 text-sm'>Something went wrong while saving your pet! 😟</div>}
    </div>
  );
}
