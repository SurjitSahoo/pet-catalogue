interface Props {
  message?: string;
}
export default function Error404({ message = 'The requested page does not exist.' }: Props) {
  return (
    <div className='flex justify-center items-center mt-36'>
      <h1 className='text-4xl text-gray-700'>404 | {message}</h1>
    </div>
  );
}
