import GlobalStyle from './styles/global';

import fileSize from 'filesize';
import { useState } from 'react';

import { 
  Container, 
  InputContent, 
  ScatterGraphicContainer,
  ContentContainer,
  FileListContainer,
  SecondTaskContainer,
  Title,
  NumberListContainer,
  NumberListContent
} from './styles';

import { Input } from './components/Input/index';
import { Button } from './components/Button/index';
import SelectCustom from './components/Select/index';
import Upload from './components/Upload';
import FileList from './components/FileList';
import NumberList from './components/NumberList';


function App() {
  const [uploadedFile, setUploadedFile] = useState<string[]>([]);

  return (
    <Container>
      <ContentContainer>
        <InputContent>
          <Input type="text" placeholder="Informe o nome da curva de potência"/>
            <Upload onDrop={file => file.map(file => ({
                name: file.name,
                readableSize: fileSize(file.size),
                progress: 0,
                uploaded: false,
                error: false,
              }),
                setUploadedFile(uploadedFile.concat(uploadedFile))
              )}
            />
          <Button>Enviar</Button>
        </InputContent>
          {
            !!uploadedFile.length && 
            <FileListContainer>
              <FileList file={uploadedFile}/>
            </FileListContainer>
          }
        <SelectCustom />
        <ScatterGraphicContainer>
          Grafico aqui
        </ScatterGraphicContainer>
        <Title>Tarefa 2: Algoritimo</Title>
        <SecondTaskContainer>
          <Input placeholder="Insira um número inteiro"/>
          <Button>Enviar</Button>
          <NumberListContainer>
            <h1>Números adicionados</h1>
            <NumberListContent>
              <NumberList />
            </NumberListContent>
          </NumberListContainer>
        </SecondTaskContainer>
      </ContentContainer>
      <GlobalStyle />
    </Container>
  );
}

export default App;
