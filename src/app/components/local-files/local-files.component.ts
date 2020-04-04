import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file-system/file.service';
import { ElectronService } from '../../services/electron/electron.service';
import { PathService } from 'src/app/services/path/path.service';
import { OsService } from 'src/app/services/os/os.service';


@Component({
  selector: 'app-local-files',
  templateUrl: './local-files.component.html',
  styleUrls: ['./local-files.component.scss']
})
export class LocalFilesComponent implements OnInit {
  private currentPath = '/';
  entries = [];
  private selectedTargets = [];

constructor(private fs: FileService,
            private electron: ElectronService,
            private path: PathService,
            private os: OsService) {
    this.os.homedir().then(data => {
      this.currentPath = data;
      this.updateEntries();
    }).catch((error) => {
      console.error(error);
    });
  }

  ngOnInit() { }

  private async updateEntries() {
    const files = [];
    try {
      files.push(...await this.fs.readdirSync(this.currentPath));
      this.entries = files;
    } catch (error) {
      return console.error(error);
    }
  }

  private async changeDir(newDir, $event) {
    const targetPath = await this.path.resolve(this.currentPath, newDir.name);

    if ($event.toElement.className.indexOf('mat-pseudo-checkbox') > -1) {
      if (this.selectedTargets.indexOf(targetPath) < 0) {
        this.selectedTargets.push(targetPath);
      }
      console.log(this.selectedTargets);
      return false;
    }

    if (newDir.isFile) {
      if (this.selectedTargets.indexOf(targetPath) < 0) {
        this.selectedTargets.push(targetPath);
      }
      console.log(this.selectedTargets);
      return false;
    } else if (newDir.isDirectory) {
      this.currentPath = targetPath;
      this.updateEntries();
    } else {
      console.error(new Error(`Unknown file system object: ${targetPath}`));
    }
  }

}
