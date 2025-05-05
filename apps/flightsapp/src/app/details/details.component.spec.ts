import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailstComponent } from './details.component';

describe('DetailstComponent', () => {
  let component: DetailstComponent;
  let fixture: ComponentFixture<DetailstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailstComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
