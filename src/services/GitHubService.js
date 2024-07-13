import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';

export const getRepositories = (username, page = 1, perPage = 10) => {
  return axios.get(`${GITHUB_API_BASE_URL}/users/${username}/repos`, {
    params: {
      page,
      per_page: perPage,
    },
  });
};

export const getRepository = (repoName) => {
  return axios.get(`${GITHUB_API_BASE_URL}/repos/${repoName}`);
};
