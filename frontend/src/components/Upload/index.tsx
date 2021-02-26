import Dropzone, { DropzoneOptions } from 'react-dropzone';

import { DropContainer, UploadMessage } from './styles';

interface UploadProps extends DropzoneOptions {
  onUpload?: () => {};
}

export default function Upload(props: UploadProps) {
  const renderMessage = (
    isDragActive: boolean, isDragReject: boolean) => {
      if (!isDragActive) {
        return <UploadMessage placeholderColor="#7c7c85">Informe o arquivo para upload</UploadMessage>
      }

      if (isDragReject) {
        return <UploadMessage type="error">Arquivo não suportado</UploadMessage>
      }

      return <UploadMessage type="sucess">Solte o arquivo aqui</UploadMessage>
  }

  return (
    <Dropzone 
      accept="text/csv" 
      onDropAccepted={() => {}}
      maxFiles={1}
      onDrop={props.onDrop}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()}/>
          {renderMessage(isDragActive, isDragReject)}
        </DropContainer>
      )}
    </Dropzone>
  );
  
}