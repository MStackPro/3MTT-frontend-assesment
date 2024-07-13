import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRepository } from '../services/GitHubService';

const RepositoryDetails = () => {
  const { repoName } = useParams();
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRepository();
  }, [repoName]);

  const fetchRepository = () => {
    setLoading(true);
    setError(null);
    getRepository(repoName)
      .then(response => {
        setRepo(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div className="container repository-details">
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : error ? (
        <div className="error">Error loading repository</div>
      ) : (
        <div>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
          <p>{repo.language}</p>
          <p>{repo.stargazers_count} stars</p>
          <p>{repo.forks_count} forks</p>
        </div>
      )}
    </div>
  );
};

export default RepositoryDetails;
