import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludeFriendsCheckboxComponent } from './include-friends-checkbox.component';

describe('IncludeFriendsCheckboxComponent', () => {
  let component: IncludeFriendsCheckboxComponent;
  let fixture: ComponentFixture<IncludeFriendsCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncludeFriendsCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncludeFriendsCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
