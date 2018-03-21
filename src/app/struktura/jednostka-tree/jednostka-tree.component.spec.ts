/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JednostkaTreeComponent } from './jednostka-tree.component';

describe('JednostkaTreeComponent', () => {
  let component: JednostkaTreeComponent;
  let fixture: ComponentFixture<JednostkaTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JednostkaTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JednostkaTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
