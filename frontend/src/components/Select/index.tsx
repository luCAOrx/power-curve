import styled from 'styled-components';

const Select = styled.select`
  width: 70%;
  margin-left: 40px;
  background-color: rgb(0, 0, 0, 0.6);
  color: #D2D2E3;
  font-size: 16px;
  border-radius: 4px;
  padding: 20px;
  border: 0;
  cursor: pointer;

  &:hover {
    background-color: rgba(0,0,0,0.1);
    color: #7c7c85
  }

  transition: 0.2s;

  option {
    background-color: #222;
    color: #D2D2E3;
    font-size: 16px;
    border-radius: 4px;
    padding: 20px;
    border: 0;
  }

  option:disabled {
    color: #7c7c85;
  }
`;

export default function SelectCustom() {
  return (
    <Select>
      <option disabled >Selecione a curva de potência</option>
      <option>Curva de potência 1</option>
      <option>Curva de potência 2</option>
      <option>Curva de potência 3</option>
    </Select>
  );
}