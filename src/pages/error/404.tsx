interface Props {
  message?: string;
}
export default function Error404({ message = 'The requested page does not exist.' }: Props) {
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
