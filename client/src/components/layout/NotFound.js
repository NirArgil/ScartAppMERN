import React, { Fragment } from "react";
import styled from 'styled-components';

const Wrapper = styled.div`
font-family: "Trebuchet MS", sans-serif;
text-align: center;
margin-top: 70px;
margin-bottom: 235px;
`;

const NotFound = () => {
  return (
  <Wrapper> 
    <Fragment>
      <h1 className="x-large text-primary">
        <i class="fas fa-exclamation-triangle" /> Page Not Found
      </h1>
      <p className="large">Sorry, this page does not exist</p>
    </Fragment>
 </Wrapper>   
  );
};

export default NotFound;