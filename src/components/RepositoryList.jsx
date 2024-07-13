import React, { useState, useEffect } from 'react';
import { getRepositories } from '../services/GitHubService';
import { Link } from 'react-router-dom';

const RepositoryList = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('MStackPro');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRepositories();
  }, [page]);

  const fetchRepositories = () => {
    setLoading(true);
    setError(null);
    getRepositories(username, page)
      .then(response => {
        setRepos(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header">
        <h1> My GitHub Repositories</h1>
      </div>
      <input
        className="search-input"
        placeholder="Search Repositories"
        value={search}
        onChange={handleSearch}
      />
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : error ? (
        <div className="error">Error loading repositories</div>
      ) : (
        <div>
          <ul className="repository-list">
            {filteredRepos.map(repo => (
              <li key={repo.id} className="repository-item">
                <Link to={`/repos/${repo.name}`}>{repo.name}</Link>
              </li>
            ))}
          </ul>
          <div className="pagination">
            <button onClick={() => setPage(page - 1)} disabled={page === 1} className={page === 1 ? 'disabled' : ''}>
              Previous
            </button>
            <button onClick={() => setPage(page + 1)} 
              className={page >= 2 ? 'disabled' : ''}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepositoryList;
