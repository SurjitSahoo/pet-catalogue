import About from 'pages/about';
import Error404 from 'pages/error/404';
import Home from 'pages/home';
import Pet from 'pages/pet';
import { Route, Routes } from 'react-router-dom';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/pet/:petId' element={<Pet />} />
      <Route path='*' element={<Error404 />} />
    </Routes>
  );
}
