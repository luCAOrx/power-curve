import { Container, Number } from "./styles";

export default function NumberList() {
  return (
    <Container>
      <li>
        <Number>
          <div>
            <h1>1</h1>
          </div>
        </Number>
      </li>

      <Number>
          <div>
            <h1>2</h1>
          </div>
        </Number>

        <Number>
          <div>
            <h1>2</h1>
          </div>
        </Number>

        <Number>
          <div>
            <h1>2</h1>
          </div>
        </Number>
    </Container>
  );
}