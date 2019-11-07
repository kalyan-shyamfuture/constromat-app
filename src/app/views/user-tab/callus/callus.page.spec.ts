import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallusPage } from './callus.page';

describe('CallusPage', () => {
  let component: CallusPage;
  let fixture: ComponentFixture<CallusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
