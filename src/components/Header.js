// Header.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #007BFF;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const TitleLink = styled(Link)`
  color: white;
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;
  font-family: 'Poppins', sans-serif;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #FFD700;
  }
`;

const Nav = styled.nav`
  display: flex;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-left: 20px;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #FFD700;
  }
`;

const Header = ({ onHomeClick, onScholarshipListClick, onContactClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (scrollToSection) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection(), 100); // Wait briefly for home page to load
    } else {
      scrollToSection();
    }
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <TitleLink to="/">Malaysian Student Initiative</TitleLink>
        <Nav>
          <NavList>
            <NavItem>
              <NavLink onClick={() => handleNavigation(onHomeClick)}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => handleNavigation(onScholarshipListClick)}>Scholarship List</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => navigate('/preparation')}>Preparation</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => navigate('/about')}>About Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => handleNavigation(onContactClick)}>Contact Us</NavLink>
            </NavItem>
          </NavList>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
