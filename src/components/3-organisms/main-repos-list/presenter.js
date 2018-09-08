import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const List = styled.ul`
  height: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  width: 80%;
  @media (min-width: 768px) {
    width: 62%;
  }
`;

const ListItem = styled.li`
  height: 2.6rem;
  min-height: 2.6rem;
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

const MainReposList = ({ repos, match }) => {
  const title = match.params.username || 'No user';
  const list = repos[match.params.username] || [];
  return (
    <Container>
      <Title>{title}</Title>
      <List>
        {list.map(repo => (
          <ListItem key={repo.id}>{repo.name}</ListItem>
        ))}
      </List>
    </Container>
  );
};

MainReposList.propTypes = {
  repos: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default MainReposList;
