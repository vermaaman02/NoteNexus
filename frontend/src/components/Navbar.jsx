import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Upload, User, LogOut, Home, Menu } from 'lucide-react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;

  &:hover {
    color: #f0f0f0;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    color: white;
    cursor: pointer;
  }
`;

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <NavbarContainer>
      <NavContent>
        <Logo to="/">
          <BookOpen size={24} />
          NoteNexus
        </Logo>

        <NavLinks>
          <NavLink to="/">
            <Home size={18} />
            Home
          </NavLink>
          
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard">
                <BookOpen size={18} />
                Dashboard
              </NavLink>
              <NavLink to="/upload">
                <Upload size={18} />
                Upload
              </NavLink>
              <NavLink to="/profile">
                <User size={18} />
                Profile
              </NavLink>
              <LogoutButton onClick={handleLogout}>
                <LogOut size={18} />
                Logout
              </LogoutButton>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </NavLinks>

        <MobileMenu>
          <Menu size={24} />
        </MobileMenu>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;
