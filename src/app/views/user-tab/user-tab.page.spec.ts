import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTabPage } from './user-tab.page';

describe('UserTabPage', () => {
  let component: UserTabPage;
  let fixture: ComponentFixture<UserTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
