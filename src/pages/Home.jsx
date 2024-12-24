import React from 'react';
import styled from 'styled-components';

const Home = () => {
  return (
    <Container>
      <Logo>YONGCHA</Logo>
      <WelcomeMessage>Welcome to YONGCHA</WelcomeMessage>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #111;
  color: #fff;
`;

const Logo = styled.h1`
  font-size: 80px;
  color: #e50914;
  margin: 0;
`;

const WelcomeMessage = styled.h2`
  font-size: 24px;
  margin-top: 10px;
  color: #fff;
`;

export default Home;
