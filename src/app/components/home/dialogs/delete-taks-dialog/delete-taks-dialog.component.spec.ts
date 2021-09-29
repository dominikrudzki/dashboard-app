import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaksDialogComponent } from './delete-taks-dialog.component';

describe('DeleteTaksDialogComponent', () => {
  let component: DeleteTaksDialogComponent;
  let fixture: ComponentFixture<DeleteTaksDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTaksDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTaksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
