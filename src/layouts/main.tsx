import Header from 'components/header';
import Routes from 'routes';

export default function MainLayout() {
  return (
    <div className='min-h-screen'>
      <Header />
      <Routes />
    </div>
  );
}
