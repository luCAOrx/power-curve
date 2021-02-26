import styled from 'styled-components';

export const Container = styled.div`

  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #d2d2e3;

    & + li {
      margin-top: 15px;
    }
  }
`;

export const Number = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;

    h1 {
      font-size: 16px;
      color: #d2d2e3
    }
  }
`;