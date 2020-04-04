import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { HelperService } from '../helper/helper.service';

@Injectable({
  providedIn: 'root',
})
export class PathService {
  private timeoutMs = 5000;

  constructor(private electron: ElectronService, private helper: HelperService) { }

  async resolve(...functionargs: any) {
    return new Promise<any>((resolve, reject) => {
      const address = this.helper.uuidv4();
      const timeoutHandle = setTimeout(() => reject(new Error('Timeout on path resolving')), this.timeoutMs + 100);
      this.electron.ipcRenderer.once('path.resolveResponse', (event, arg: any) => {
        clearTimeout(timeoutHandle);
        if (address === arg.address) {
          resolve(arg.data);
        } else {
          reject(new Error('Getting the message from another sender'));
        }
      });
      this.electron.ipcRenderer.send('path.resolve', { functionargs, address});
    });
  }
}
