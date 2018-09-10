import axios from 'axios';

const githubApi = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

export const listRepos = (username, page) =>
  githubApi
    .get(
      `/users/${username}/repos?sort=created&type=all${
        !page ? '' : `&page=${page}`
      }`,
    )
    .then(({ data: repos, headers: { link } }) => ({
      success: true,
      repos,
      link,
    }))
    .catch(() => ({ success: false }));

export const listCommits = (username, repo, page) =>
  githubApi
    .get(
      `repos/${username}/${repo}/commits?since=2018-01-01T00:00:00Z${
        !page ? '' : `&page=${page}`
      }`,
    )
    .then(({ data: commits, headers: { link } }) => ({
      success: true,
      commits,
      link,
    }))
    .catch(() => ({ success: false, commits: [], link: undefined }));
