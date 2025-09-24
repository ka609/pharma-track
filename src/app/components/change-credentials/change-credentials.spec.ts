import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCredentials } from './change-credentials';

describe('ChangeCredentials', () => {
  let component: ChangeCredentials;
  let fixture: ComponentFixture<ChangeCredentials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeCredentials]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCredentials);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
