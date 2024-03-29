import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 32px;
  width: 100%;

  input {
    width: 100%;
    background: #fff;
    border: none;
    border-radius: 25px;
    height: 50px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    padding: 0 16px;

    &::placeholder {
      color: #bcbcbc;
    }
  }
`;
