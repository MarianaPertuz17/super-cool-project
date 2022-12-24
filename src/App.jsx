import './App.css';
import { routes } from './routes';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { PostsDashboard } from './screens/postsDashboard';
import { MoviesDashboard } from './screens/moviesDashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path={routes.HOME} element={<PostsDashboard/>}/>
        <Route path={routes.POSTS} element={<PostsDashboard/>}/>
        {/* <Route path={routes.MOVIES} element={<MoviesDashboard/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
