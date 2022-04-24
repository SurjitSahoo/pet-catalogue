import { IPet } from 'types/pets';
import betterFetch from 'utils';

if (!process.env.REACT_APP_BACKEND_ROOT || process.env.REACT_APP_BACKEND_ROOT.length === 0) {
  throw new Error('env variable REACT_APP_BACKEND_ROOT is not set');
}

const ROOT = process.env.REACT_APP_BACKEND_ROOT;

export default {
  getPets: () => betterFetch(`${ROOT}/pets`) as Promise<IPet[]>,

  getPet: (id: string) => betterFetch(`${ROOT}/pets/${id}`) as Promise<IPet>,

  createPet: (pet: IPet) =>
    betterFetch(`${ROOT}/pets`, {
      method: 'POST',
      body: JSON.stringify(pet),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }) as Promise<IPet>,

  deletePet: (id: string) => betterFetch(`${ROOT}/pets/${id}`, { method: 'DELETE' }) as Promise<void>,
};

export const QUERY_CONST = {
  PETS: 'pets',
  PET: 'pet',
};
