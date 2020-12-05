import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregarItemPage } from './agregar-item.page';

describe('AgregarItemPage', () => {
  let component: AgregarItemPage;
  let fixture: ComponentFixture<AgregarItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
