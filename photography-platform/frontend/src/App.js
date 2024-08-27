import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './components/Chat';
import Search from './components/Search';

function App() {
  return (
    <Router>
      <div>
        <Route path="/" component={Home} exact />
        <Route path="/chat" component={Chat} />
      </div>
    </Router>
  );
}

export default App;
