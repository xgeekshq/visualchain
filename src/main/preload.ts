// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';

const electronHandler = {
  execBananas: async ({ code, language }) =>
    ipcRenderer.invoke('execBananas', { code, language }),
};

contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld('envVars', {
  openAiKey: process.env.OPENAI_KEY,
});

export type ElectronHandler = typeof electronHandler;
