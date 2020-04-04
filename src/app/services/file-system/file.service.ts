import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { HelperService } from '../helper/helper.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private timeoutMs = 5000;

  constructor(private electron: ElectronService, private helper: HelperService) { }

  async readdirSync(directoryPath: string) {
    return new Promise<string[]>((resolve, reject) => {
      const address = this.helper.uuidv4();
      const timeoutHandle = setTimeout(() => reject(new Error('Timeout on getting local path')), this.timeoutMs + 100);
      this.electron.ipcRenderer.once('fs.readdirSyncResponse', (event, arg: any) => {
        clearTimeout(timeoutHandle);
        if (address === arg.address) {
          resolve(arg.data);
        } else {
          reject(new Error('Getting the message from another sender'));
        }
      });
      this.electron.ipcRenderer.send('fs.readdirSync', { directory: directoryPath, address});
    });
  }

  async stat(targetPath: string) {
    return new Promise<string[]>((resolve, reject) => {
      const address = this.helper.uuidv4();
      const timeoutHandle = setTimeout(() => reject(new Error('Timeout on getting local path')), this.timeoutMs + 100);
      this.electron.ipcRenderer.once('fs.statResponse', (event, arg: any) => {
        clearTimeout(timeoutHandle);
        if (address === arg.address) {
          resolve(arg.data);
        } else {
          reject(new Error('Getting the message from another sender'));
        }
      });
      this.electron.ipcRenderer.send('fs.stat', { targetPath, address});
    });
  }
}
