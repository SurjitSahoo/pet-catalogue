import { Link } from 'react-router-dom';
import logo from 'assets/images/pet-house.png';

export default function Header() {
  return (
    <header className='bg-gray-900 flex justify-center'>
      <div className='text-white flex items-center justify-between w-full 2xl:max-w-7xl xl:max-w-6xl md:max-w-4xl min-w-[24rem]'>
        <Link to='/'>
          <div className='flex items-center px-4 py-2'>
            <img src={logo} alt='logo' className='w-14 mr-2' />
            <span className='text-5xl font-serif'>Pet Store</span>
          </div>
        </Link>
        <nav>
          <ul className='text-2xl flex'>
            <li className='text-gray-200 mx-2 hover:text-white border-b-2 border-transparent hover:border-white transition-all duration-200'>
              <Link to='/about'>About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
