import { SButtonChoice, SButtonDelete, SChoice, SChoiceDirectory } from './choiceDirectory.styles'
import { Dispatch, FC, SetStateAction } from 'react'
import { STitle } from '../excelToPdf.styles'

interface ChoiceFileSystemProps {
  title: string
  fileSystem: string
  setFileSystem: Dispatch<SetStateAction<string>>
  type?: 'file' | 'directory'
}

export const ChoiceFileSystem: FC<ChoiceFileSystemProps> = ({
  setFileSystem,
  fileSystem,
  title,
  type = 'directory'
}) => {
  const isFile = type === 'file'

  const choiceType = isFile ? 'файл' : 'директорию'

  const handleChoice = async () => {
    if (isFile) {
      const directoryUserChoice = await window.api.selectFiles()
      setFileSystem(directoryUserChoice[0])
    } else {
      const directoryUserChoice = await window.api.selectFolders()
      setFileSystem(directoryUserChoice[0])
    }
  }

  return (
    <SChoiceDirectory>
      <STitle>{title}</STitle>
      <SChoice>
        {!fileSystem && <SButtonChoice onClick={handleChoice}>Выберете {choiceType}</SButtonChoice>}
        {fileSystem && (
          <>
            <div>{fileSystem}</div>
            <SButtonDelete onClick={handleChoice}>Изменить путь</SButtonDelete>
          </>
        )}
      </SChoice>
    </SChoiceDirectory>
  )
}
