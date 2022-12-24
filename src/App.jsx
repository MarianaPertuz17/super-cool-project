import './App.css';
import { routes } from './routes';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { PostsDashboard } from './screens/postsDashboard';
import { PokemonDashboard } from './screens/pokemonDashboard';
import { PokemonDetail } from './screens/pokemonDetail';


function App() {
  return (
    <Router>
      <Routes>
        <Route path={routes.HOME} element={<PokemonDashboard/>}/>
        <Route path={routes.POSTS} element={<PostsDashboard/>}/>
        <Route path={routes.POKEMON} element={<PokemonDashboard/>}/>
        <Route path={routes.DETAILS} element={<PokemonDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;
