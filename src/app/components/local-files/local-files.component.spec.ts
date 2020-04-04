import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalFilesComponent } from './local-files.component';

describe('LocalFilesComponent', () => {
  let component: LocalFilesComponent;
  let fixture: ComponentFixture<LocalFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
