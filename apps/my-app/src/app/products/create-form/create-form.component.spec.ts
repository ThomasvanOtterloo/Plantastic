import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateFormComponent } from './create-form.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { RouterTestingModule } from "@angular/router/testing";
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {FooterComponent} from "../../shared/footer/footer.component";
import {AlertComponent, CustomConfig} from "@find-a-buddy/util-ui";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpHandler} from "@angular/common/http";
import {FormControl} from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NO_ERRORS_SCHEMA, NgModule, NgZone } from '@angular/core';
import { Router } from '@angular/router';

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
        imports: [RouterTestingModule, FormsModule],
        providers: [
            CustomConfig,
            HttpClient,
            HttpHandler,
            FormControl
        ]
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
