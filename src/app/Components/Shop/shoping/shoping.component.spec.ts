import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopingComponent } from './shoping.component';

describe('ShopingComponent', () => {
  let component: ShopingComponent;
  let fixture: ComponentFixture<ShopingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
