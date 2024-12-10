// Header.js
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const HeaderContainer = styled.header`
  background-color: #007BFF;
  padding: 10px 20px;
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
  font-weight: 600;
  text-transform: uppercase;
  font-family: 'Poppins', sans-serif;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #FFD700;
  }

  /* Adjusted font sizes for better responsiveness */
  font-size: 17px; /* Smaller default font size for phone mode */

  @media (min-width: 480px) {
    font-size: 22px;
  }

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const Nav = styled.nav`
  @media (max-width: 768px) {
    display: none; /* Hide navigation on small screens */
  }
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

/* Menu button for mobile */
const MenuButton = styled.button`
  display: none; /* Hidden by default */
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex; /* Show menu button on small screens */
    align-items: center;
    justify-content: center;
    height: 40px; /* Set a fixed height for proper alignment */
    width: 40px;  /* Optional: give it a fixed width to be square */
    padding: 1px 0px 1px 6px;
  }
`;

/* Mobile navigation styles */
const MobileNav = styled(motion.ul)`
  position: absolute;
  top: 100%; /* Position below the header */
  left: 0;
  width: 100%;
  background-color: #007BFF;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  z-index: 999;
`;

const MobileNavItem = styled(motion.li)`
  width: 100%;
  text-align: center;
`;

const MobileNavLink = styled.a`
  display: block;
  padding: 15px 0;
  color: white;
  text-decoration: none;
  font-size: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Header = ({ onHomeClick, onScholarshipListClick, onContactClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (scrollToSection) => {
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection(), 100); // Wait briefly for home page to load
    } else {
      scrollToSection();
    }
  };

  // Define menu items
  const menuItems = [
    { name: 'Home', onClick: () => handleNavigation(onHomeClick) },
    { name: 'Scholarship List', onClick: () => handleNavigation(onScholarshipListClick) },
    {
      name: 'Preparation',
      onClick: () => {
        setIsMobileMenuOpen(false);
        navigate('/preparation');
      },
    },
    {
      name: 'About Us',
      onClick: () => {
        setIsMobileMenuOpen(false);
        navigate('/about');
      },
    },
    { name: 'Contact Us', onClick: () => handleNavigation(onContactClick) },
  ];

  // Animation variants for mobile menu
  const mobileNavVariants = {
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        when: 'afterChildren',
      },
    },
  };

  const mobileNavItemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
    closed: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <TitleLink to="/">Malaysian Student Initiative</TitleLink>

        {/* Desktop Navigation */}
        <Nav>
          <NavList>
            {menuItems.map((item, index) => (
              <NavItem key={index}>
                <NavLink onClick={item.onClick}>{item.name}</NavLink>
              </NavItem>
            ))}
          </NavList>
        </Nav>

        {/* Menu Button for Mobile */}
        <MenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>
      </HeaderContent>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileNav
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileNavVariants}
          >
            {menuItems.map((item, index) => (
              <MobileNavItem key={index} variants={mobileNavItemVariants}>
                <MobileNavLink onClick={item.onClick}>{item.name}</MobileNavLink>
              </MobileNavItem>
            ))}
          </MobileNav>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
