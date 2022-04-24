interface Props {
  message?: string;
}
export default function Error({ message = 'Something went wrong!' }: Props) {
  return (
    <div className='flex justify-center items-center mt-36'>
      <h1 className='text-4xl text-red-500'>{message}</h1>
    </div>
  );
}
