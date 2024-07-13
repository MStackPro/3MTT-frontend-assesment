import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RepositoryList from './components/RepositoryList';
import RepositoryDetails from './components/RepositoryDetails';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/repos/:repoName" element={<RepositoryDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
