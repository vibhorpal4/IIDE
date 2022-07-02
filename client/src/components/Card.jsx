import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = ({ id, title, content }) => {
  return (
    <Container>
      <CustomLink to={`/post/${id}`}>
        <PortTitle>{title}</PortTitle>
      </CustomLink>
      <Content>{content}</Content>
    </Container>
  );
};

const Container = styled.div`
  width: 250px;
  height: 250px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: block;
  border-radius: 10px;
  /* flex-direction: column; */
  /* justify-content: center; */
  /* align-items: center; */
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const PortTitle = styled.h3`
  margin: 20px 20px;
  font-size: 26px;
`;
const Content = styled.p`
  margin: 20px 20px;
  max-height: 100%;
`;

export default Card;
