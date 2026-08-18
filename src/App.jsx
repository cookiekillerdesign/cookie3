import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Project from './pages/Project';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/project/:slug" element={<Project />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
