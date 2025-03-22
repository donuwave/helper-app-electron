import path from 'path'
import { createRequire } from 'module'
import fs from 'fs-extra'
import { PDFDocument } from 'pdf-lib'

const require = createRequire(import.meta.url)
const winax = require('winax')

async function addImageToPdf(pdfPath, imagePath) {
  const existingPdfBytes = await fs.readFile(pdfPath)

  const pdfDoc = await PDFDocument.load(existingPdfBytes)

  const imageBytes = await fs.readFile(imagePath)

  if (!imageBytes) {
    console.error('Изображение не найдено или не загружено!')
    return
  }

  const image = await pdfDoc.embedPng(imageBytes)
  // const image = await pdfDoc.embedJpg(imageBytes)

  const pages = pdfDoc.getPages()
  const firstPage = pages[0]

  const { width, height } = firstPage.getSize()

  firstPage.drawImage(image, {
    x: width - 240,
    y: height - 80,
    width: 200,
    height: 60
  })

  const pdfBytes = await pdfDoc.save()
  await fs.writeFile(pdfPath, pdfBytes)

  console.log(`Изображение добавлено в PDF: ${pdfPath}`)
}

async function getPathFile(sheet) {
  const codeFileValue = sheet.Cells(16, 5).Value
  const nameFileValue = sheet.Cells(16, 7).Value
  const orderFileValue = sheet.Cells(6, 6).Value

  return `${codeFileValue} ${nameFileValue} Заказ ${orderFileValue}.pdf`
}

async function generateDirectory(sheet, outputDir: string) {
  const codeFolderValue = sheet.Cells(13, 5).Value.split('-')[1]
  const folderPath = path.join(outputDir, String(codeFolderValue))

  if (!fs.existsSync(folderPath)) {
    fs.mkdir(folderPath, { recursive: true })
    console.log(`Папка создана: ${folderPath}`)
  }

  return folderPath
}

async function convertExcelToPdf(inputFile: string, outputDir: string) {
  try {
    console.log(`Конвертация файла ${inputFile} в PDF...`)

    const excel = new winax.Object('Excel.Application') // Изменение здесь
    const workbook = excel.Workbooks.Open(path.resolve(inputFile))

    const sheet = workbook.Sheets(1)

    const folderPath = await generateDirectory(sheet, outputDir)
    const fileName = await getPathFile(sheet)
    const outputFilePath = path.join(folderPath, fileName)

    const xlTypePDF = 0

    workbook.ExportAsFixedFormat(xlTypePDF, path.resolve(outputFilePath))

    workbook.Close(false)
    excel.Quit()

    console.log(`PDF создан: ${outputFilePath}`)

    return outputFilePath
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Ошибка при конвертации файла ${inputFile}: ${error.message}`)
    } else {
      console.error(`Неизвестная ошибка`)
    }
    return
  }
}

async function addMarginsToExistingPdf(pdfPath) {
  const existingPdfBytes = await fs.readFile(pdfPath)
  const pdfDoc = await PDFDocument.load(existingPdfBytes)

  const pages = pdfDoc.getPages()

  for (const page of pages) {
    const { width, height } = page.getSize()
    page.setSize(width + 10 + 10, height)
    page.translateContent(10, 0)
  }

  const pdfBytes = await pdfDoc.save()
  await fs.writeFile(pdfPath, pdfBytes)

  console.log(`Отступы добавлены в PDF: ${pdfPath}`)
}

export async function processDirectory(inputDir: string, outputDir: string, picturePath: string) {
  try {
    const files = await fs.readdir(inputDir)
    const excelFiles = files.filter((file) => ['.xls', '.xlsx'].includes(path.extname(file)))

    for (const file of excelFiles) {
      const inputFilePath = path.join(inputDir, file)
      const pathPDF = await convertExcelToPdf(inputFilePath, outputDir)
      await addImageToPdf(pathPDF, picturePath)
      await addMarginsToExistingPdf(pathPDF)
    }

    console.log('Конвертация всех файлов завершена!')
  } catch (error) {
    if (error instanceof Error) {
      console.error(`'Ошибка при обработке директории:', error.message`)
    } else {
      console.error(`Неизвестная ошибка`)
    }
  }
}
