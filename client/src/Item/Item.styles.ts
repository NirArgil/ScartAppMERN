import styled from 'styled-components';

export const Wrapper = styled.div`
 display: flex;
 justify-content: space-between;
 flex-direction: column;
 width: 100%;
 border: 1px solid lightblue;
 border-radius: 20px;
 height: 100%;

 button {
  font-family: "Trebuchet MS", sans-serif;
  border-radius: 0 0 20px 20px;
  }

 img {
     max-height: 250px;
     object-fit: contain;
     border-radius: 20px 20px 0 0;
  }

 div {
    font-family: "Trebuchet MS", sans-serif;
    padding: 1rem;
    height:  100%;
  }
`;

