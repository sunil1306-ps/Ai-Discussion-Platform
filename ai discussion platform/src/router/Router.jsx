import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import TopicDetail from '../pages/TopicDetails';
import CreateTopic from '../pages/CreateTopic';
import About from '../pages/About';
import NotFound from '../pages/NotFound';

function AppRouter() {
  return (
    <Router>
        <Routes>
          <Route index element={<About />} />
          <Route path="/topic/:id" element={<TopicDetail />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-topic" element={<CreateTopic />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 pages */}
        </Routes>
    </Router>
  );
}

export default AppRouter;