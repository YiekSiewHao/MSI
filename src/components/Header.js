import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

/* Styled Components */

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

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-right:5px;

    @media (max-width: 768px) {
  padding-right:3px;
  }

  @media (max-width: 480px) {
  padding-right:0px;
  }
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%; /* Optional: for circular logos */
  object-fit: cover;

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
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

  font-size: 14px;

  @media (min-width: 480px) {
    font-size: 20px;
  }

  @media (min-width: 768px) {
    font-size: 26px;
  }
`;

const Nav = styled.nav`
  @media (max-width: 768px) {
    display: none;
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

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    padding: 1px 0px 1px 6px;
  }
`;

const MobileNav = styled(motion.ul)`
  position: absolute;
  top: 100%;
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

const Header = ({ 
  onHomeClick, 
  onScholarshipListClick, 
  onContactClick, 
  onWishesClick, 
  onEventsClick 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (scrollToSection) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection(), 100);
    } else {
      scrollToSection();
    }
  };

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
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <Logo src="/assets/MSI_Logo.png" alt="Logo" />
          <TitleLink to="/">Malaysian Student Initiative</TitleLink>
        </LogoContainer>

        <Nav>
          <NavList>
            {menuItems.map((item, index) => (
              <NavItem key={index}>
                <NavLink onClick={item.onClick}>{item.name}</NavLink>
              </NavItem>
            ))}
          </NavList>
        </Nav>

        <MenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>
      </HeaderContent>

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
