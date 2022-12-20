import './App.css';
import PostList from './components/PostList';
import { routes } from './routes';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path={routes.POSTS} element={<PostList/>}/>
      </Routes>
    </Router>
  );
}

export default App;
