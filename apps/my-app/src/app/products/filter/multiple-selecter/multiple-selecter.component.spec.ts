import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSelecterComponent } from './multiple-selecter.component';

describe('MultipleSelecterComponent', () => {
  let component: MultipleSelecterComponent;
  let fixture: ComponentFixture<MultipleSelecterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleSelecterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleSelecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
