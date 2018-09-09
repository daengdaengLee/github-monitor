import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 0 4rem;
  @media (min-width: 768px) {
    padding: 0 10rem;
  }
`;

const MainRepoDashboard = ({ match, repos }) => {
  const { username, repoId } = match.params;
  const repoList = repos[username] || [];
  const currentRepo = repoList.find(repo => `${repo.id}` === repoId);
  return !currentRepo ? null : (
    <Container>
      {[...Array(1000)].map((v, i) => (
        <div key={i} style={{ height: '2rem', minHeight: '2rem' }}>
          {i}
        </div>
      ))}
    </Container>
  );
};

MainRepoDashboard.propTypes = {
  match: PropTypes.object.isRequired,
  repos: PropTypes.object.isRequired,
};

export default MainRepoDashboard;
