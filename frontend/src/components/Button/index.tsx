import styled from 'styled-components';

export const Button = styled.button.attrs({
  type: 'submit'
})`
  height: 70px;
  width: 10%;
  margin: 10px;
  background-color: #248a24;
  color: #D2D2E3;
  font-size: 16px;
  border-radius: 4px;
  border: 0;
  cursor: pointer;

  &:hover {
    background-color: rgba(0,0,0,0.1);
    color: #7c7c85
  }

  transition: 0.2s;
`;