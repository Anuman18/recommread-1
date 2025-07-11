import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Write from './pages/Write';
import Drafts from './pages/Drafts';
import Rewards from './pages/Rewards';
import Contests from './pages/Contests';
import Leaderboard from './pages/Leaderboard';
import Analytics from './pages/Analytics';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Settings from './pages/Settings';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/write" element={<Write />} />
        <Route path="/contests" element={<Contests />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/drafts" element={<Drafts />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
