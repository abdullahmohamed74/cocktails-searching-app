import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SharedLayout from './pages/SharedLayout';
import Home from './pages/Home';
import About from './pages/About';
import Error from './pages/Error';
import SingleCocktail from './components/SingleCocktail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="cocktail/:cocktailId" element={<SingleCocktail />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
