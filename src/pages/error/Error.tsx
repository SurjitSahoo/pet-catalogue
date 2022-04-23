interface Props {
  message?: string;
}
export default function Error({ message = 'Something went wrong' }: Props) {
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
