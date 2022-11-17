import React from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components";

const Container = styled.div`
  margin: auto;
  display: block;
  width: 50%;
  padding: 40px;
  text-align: center;
  background-color: eee;
`;

const Text = styled.h2`
  font-size: 46px;
  font-weight: bold;
  padding: 15px;
`;

const Wrapper = styled.div`
  padding: 10px;
`;

const NotFound = () => {
  return (
    <Container>
      <Wrapper>
      <Text>Page Not Found</Text>
      <Link to="/">Go Back Home</Link>
      </Wrapper>
    </Container>
  )
}

export default NotFound