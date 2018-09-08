import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link as _Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

const Header = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

const CloseButton = styled.button`
  width: 25px;
  height: 25px;
  background-color: #dee0e2;
  border: 0 none;
  outline: 0 none;
  cursor: pointer;
`;

const Nav = styled.nav`
  height: 0;
  flex-grow: 1;
`;

const List = styled.ul`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden:
  overflow-y: auto;
`;

const ListItem = styled.li`
  width: 100%;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  padding-left: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #dee0e2;
  }
`;

const Link = styled(_Link)`
  color: black;
  text-decoration: none !important;
  &:hover {
    color: black;
  }
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const MainNav = ({ users, onToggleNav, onClickNavItem }) => (
  <Container>
    <Header>
      <Title>Users</Title>
      <CloseButton onClick={onToggleNav} />
    </Header>
    <Nav>
      <List>
        {users.map(user => (
          <ListItem key={user} onClick={onToggleNav}>
            <Link to={`/repos/${user}`}>{user}</Link>
          </ListItem>
        ))}
      </List>
    </Nav>
  </Container>
);

MainNav.defaultProps = {
  users: [],
};

MainNav.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string),
  onToggleNav: PropTypes.func.isRequired,
};

export default MainNav;
