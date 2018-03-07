/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CsvContentComponent } from './csv-content.component';

describe('CsvContentComponent', () => {
  let component: CsvContentComponent;
  let fixture: ComponentFixture<CsvContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
