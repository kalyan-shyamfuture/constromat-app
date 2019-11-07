import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerErrorPage } from './server-error.page';

describe('ServerErrorPage', () => {
  let component: ServerErrorPage;
  let fixture: ComponentFixture<ServerErrorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerErrorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerErrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
