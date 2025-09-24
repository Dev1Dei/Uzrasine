import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UzrasaiView } from './uzrasaiView';

describe('UzrasaiView', () => {
  let component: UzrasaiView;
  let fixture: ComponentFixture<UzrasaiView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UzrasaiView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UzrasaiView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
