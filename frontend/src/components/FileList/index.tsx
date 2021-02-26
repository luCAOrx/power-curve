import { CircularProgressbar } from 'react-circular-progressbar';

import { MdCheckCircle, MdError } from 'react-icons/md';

import { Container, FileInfo } from './styles';

interface FileListProps {
  file: string[];
}

export default function FileList(props: FileListProps) {
  return (
    <Container>
      {props.file.map(uploadedFile => (
        <li>
          <FileInfo>
            <div>
              <strong>{uploadedFile}</strong>
              <span>50.kb <button onClick={() => {}}>Excluir</button></span>
            </div>
          </FileInfo>
          <div>
            <CircularProgressbar 
              styles={{
                root: { width: 24, marginTop: -13 },
                path: { stroke: '#1f65aa' }
              }}
              strokeWidth={10}
              value={60}
            />
            <MdCheckCircle size={24} color="#78e5d5"/>
            <MdError size={24} color="#e57878"/>
          </div>
        </li>
      ))}
    </Container>
  );
}