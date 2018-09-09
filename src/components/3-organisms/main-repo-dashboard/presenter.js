import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  @media (min-width: 768px) {
    padding: 0 10rem;
  }
`;

const Row = styled.div`
  width: 100%;
  height: ${props => props.height || '2rem'};
  display: flex;
  ${props =>
    props.alignItems &&
    css`
      align-items: ${props.alignItems};
    `};
  ${props =>
    props.justifyContent &&
    css`
      justify-content: ${props.justifyContent};
    `};
`;

const Title = styled.h2`
  width: 100%;
  height: 2rem;
  display: flex;
`;

const BlockA = styled.a`
  width: ${props => props.width || '100%'};
  height: 100%;
  ${props =>
    props.flexGrow !== undefined &&
    css`
      flex-grow: ${props.flexGrow};
    `} display: flex;
  align-items: center;
  color: black;
  &:hover {
    color: black;
  }
  text-decoration: none !important;
`;

const MainRepoDashboard = ({ match, repos, commits, fetchStart }) => {
  const { username, repoName } = match.params;
  const repoList = repos[username] || [];
  const currentRepo = repoList.find(repo => `${repo.name}` === repoName);
  const currentCommits =
    commits[`${currentRepo.owner.login}/${currentRepo.name}`];
  currentCommits === undefined &&
    fetchStart(currentRepo.owner.login, currentRepo.name);
  console.log(currentCommits);
  return !currentRepo ? null : (
    <Container>
      <Title>
        <BlockA href={currentRepo.html_url} target="_blank">
          {currentRepo.name}
        </BlockA>
      </Title>
      <Row>
        <span
          style={{
            marginRight: '0.8rem',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          owned by
        </span>
        <BlockA
          href={currentRepo.owner.html_url}
          target="_blank"
          width="0"
          flexGrow="1"
        >
          {currentRepo.owner.login}
        </BlockA>
      </Row>
      <Row alignItems="center">
        {currentRepo.description || 'No description'}
      </Row>
      <Row alignItems="center">
        {`Watch: ${currentRepo.watchers_count}, Star: ${
          currentRepo.stargazers_count
        }`}
      </Row>
      <Row alignItems="center">
        {`Language: ${currentRepo.language || 'No language'}`}
      </Row>
    </Container>
  );
};

MainRepoDashboard.propTypes = {
  match: PropTypes.object.isRequired,
  repos: PropTypes.object.isRequired,
  commits: PropTypes.object.isRequired,
  fetchStart: PropTypes.func.isRequired,
};

export default MainRepoDashboard;
