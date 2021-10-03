import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSettingsDialogComponent } from './change-settings-dialog.component';

describe('ChangeSettingsDialogComponent', () => {
  let component: ChangeSettingsDialogComponent;
  let fixture: ComponentFixture<ChangeSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeSettingsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
