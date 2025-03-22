/// <reference types="vite/client" />

export {}

declare global {
  interface Window {
    api: {
      selectFolders: () => Promise<void>
      selectFiles: () => Promise<void>
      convertedExcelToPdf: (
        inputDir: string,
        outputDir: string,
        picturePath: string
      ) => Promise<void>
    }
  }
}
