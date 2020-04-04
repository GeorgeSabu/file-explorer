import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ElectronService } from './services/electron/electron.service';
import { OsService } from './services/os/os.service';
import { FileService } from './services/file-system/file.service';
import { HelperService } from './services/helper/helper.service';
import { PathService } from './services/path/path.service';
import { LocalFilesComponent } from './components/local-files/local-files.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    LocalFilesComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MatListModule,
    MatIconModule,
    MatGridListModule
  ],
  providers: [ElectronService, OsService, FileService, HelperService, PathService],
  bootstrap: [AppComponent]
})
export class AppModule { }
