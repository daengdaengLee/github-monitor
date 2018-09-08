import axios from 'axios';

const githubApi = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

export const listRepos = (username, page) =>
  githubApi.get(
    `/users/${username}/repos?sort=created&type=all${
      !page ? '' : `&page=${page}`
    }`,
  );
