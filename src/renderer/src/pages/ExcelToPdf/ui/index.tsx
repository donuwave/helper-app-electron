import { SExcelToPdf } from './excelToPdf.styles'
import { useState } from 'react'
import { ChoiceFileSystem } from './ChoiceDirectory'
import { Button } from 'antd'

export const ExcelToPdf = () => {
  const [inputDirectory, setInputDirectory] = useState<string>('')
  const [outputDirectory, setOutputDirectory] = useState<string>('')
  const [picturePath, setPicturePath] = useState<string>('')

  const handleConvert = () => {
    window.api.convertedExcelToPdf(inputDirectory, outputDirectory, picturePath)
  }

  return (
    <SExcelToPdf>
      <ChoiceFileSystem
        title="Выберете папку где находяться excel файлы"
        fileSystem={inputDirectory}
        setFileSystem={setInputDirectory}
      />
      <ChoiceFileSystem
        title="Выберете папку где будут находиться pdf файлов"
        fileSystem={outputDirectory}
        setFileSystem={setOutputDirectory}
      />
      <ChoiceFileSystem
        title="Выберете картинку (Подпись)"
        fileSystem={picturePath}
        setFileSystem={setPicturePath}
        type="file"
      />
      <Button onClick={handleConvert}>Конвертировать</Button>
    </SExcelToPdf>
  )
}
