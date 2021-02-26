import styled, { css } from 'styled-components';

interface DropContainerProps {
  isDragActive: boolean;
  isDragReject: boolean;
};

interface UploadProps {
  type: string;
  placeholderColor?: string;
}

interface MessageColors {
  [key: string]: string;
};

const dragActive = css`
  background-color: #78e5d5;
`;

const dragReject = css`
  background-color: #e57878;
`;

export const DropContainer = styled.div.attrs((props: DropContainerProps) => ({
  isDragActive: props.isDragActive,
  isDragReject: props.isDragReject
}))`
  height: 70px;
  width: 30%;
  margin: 10px;
  background-color: rgb(0, 0, 0, 0.6);
  font-size: 16px;
  border-radius: 4px;
  padding: 20px;
  border: 0;
  cursor: pointer;

  &:hover {
    background-color: rgba(0,0,0,0.1);
    color: #7c7c85
  }

  transition: height 0.2s ease;

  ${(props: DropContainerProps) => props.isDragActive && dragActive}
  ${(props: DropContainerProps) => props.isDragReject && dragReject}
`;

const messageColors: MessageColors = {
  defaul: '#7c7c85',
  error: '#e57878',
  sucess: '#78e5d5'
}

export const UploadMessage = styled.p.attrs((props: UploadProps) => ({
  type: props.type,
  placeholderColor: props.placeholderColor
}))`
  display: flex;
  color: ${props => props.placeholderColor ? '#7c7c85' : messageColors[props.type || 'default'] };
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const FileListContainer = styled.div`
  height: 50%;
  margin-top: 50%;
  height: 50px;
  color: '#fff';
`;