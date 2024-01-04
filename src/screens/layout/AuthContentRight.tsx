import React from 'react';
import styled from 'styled-components';

const AuthContentRight: React.FC = () => {
  return (
    <Container>
      <Box1 />
      <Box2 />
      <Box3 />
      <Box4>
        <Box4Child />
      </Box4>
    </Container>
  );
};

const Container = styled.div`
  & {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.white};
    position: relative;
    width: 100%;
    overflow: hidden;
  }
`;

const Box1 = styled.div`
  background-color: #003DB1;
  border-radius: 50px;
  height: 300px;
  right: 0;
  position: absolute;
  top: -200px;
  transform: rotate(-17.13deg);
  width: 667px;
  z-index: 50;`

const Box2 = styled.div`
  background-color: #FFFFFF1A;
  border-radius: 50px 50px 0px 50px;
  height: 300px;
  right: -50px;
  position: absolute;
  top: -190px;
  transform: rotate(15deg);
  width: 767px;
  z-index: 40;`;

const Box3 = styled.div`
  background-color: #045AFF;
  border-radius: 50px;
  right: -50px;
  position: absolute;
  top: -50px;
  bottom: 0;
  transform: rotate(6.51deg);
  width: 550px;
  z-index: 10;`;

const Box4 = styled.div`
  background-color: #003DB1;
  border-radius: 50px;
  height: 500px;
  right: 0;
  position: absolute;
  bottom: -200px;
  transform: rotate(-42.02deg);
  width: 550px;
  z-index: 40;`;

const Box4Child = styled.div`
  background-color: #FFFFFF1A;
  border-radius: 50px;
  height: 400px;
  right: 100px;
  position: absolute;
  bottom: -40px;
  transform: rotate(-190deg);
  width: 500px;`;

export default AuthContentRight;
