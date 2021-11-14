import {MainPage} from './MainPage/MainPage'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { ProfilePage } from './ProfilePage/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/view" element={<MainPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
