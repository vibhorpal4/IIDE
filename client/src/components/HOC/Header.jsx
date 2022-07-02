import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <CustomLink to={"/"}>
        <Title>IIDE Project</Title>
      </CustomLink>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 80px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
`;

const CustomLink = styled(NavLink)`
  text-decoration: none;
  color: black;
`;

const Title = styled.h1`
  margin: 0 100px;
`;

export default Header;
