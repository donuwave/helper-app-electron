import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', {
      selectFolders: () => ipcRenderer.invoke('select-folders'),
      selectFiles: () => ipcRenderer.invoke('select-files'),
      convertedExcelToPdf: (inputDir: string, outputDir: string, picturePath: string) =>
        ipcRenderer.invoke('convert-excel-to-pdf', inputDir, outputDir, picturePath)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
