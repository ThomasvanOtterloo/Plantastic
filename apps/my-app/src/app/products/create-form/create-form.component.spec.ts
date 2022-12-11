import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateFormComponent } from './create-form.component';
import 'zone.js';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { RouterTestingModule } from "@angular/router/testing";
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {FooterComponent} from "../../shared/footer/footer.component";
import {AlertComponent} from "@find-a-buddy/util-ui";


describe('CreateFormComponent', () => {
  let component: CreateFormComponent;
  let fixture: ComponentFixture<CreateFormComponent>;

  beforeEach(async () => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    await TestBed.configureTestingModule({
      declarations: [
          CreateFormComponent,
          NavbarComponent,
          FooterComponent,
          AlertComponent,

      ],
        imports: [RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
