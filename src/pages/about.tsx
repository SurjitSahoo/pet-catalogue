import { loremIpsum } from 'lorem-ipsum';

export default function About() {
  return (
    <div className='flex justify-center items-center flex-col mt-4'>
      <h1 className='prose text-3xl text-gray-900 mb-4'>About Me</h1>
      <p className='prose prose-amber'>{loremIpsum({ units: 'paragraphs', count: 3 })}</p>
    </div>
  );
}
