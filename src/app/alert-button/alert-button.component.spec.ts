import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";

import { By } from "@angular/platform-browser";
import { AlertButtonComponent } from "./alert-button.component";
import { DebugElement } from "@angular/core";

describe("AlertButtonComponent", () => {
  let component: AlertButtonComponent;
  let fixture: ComponentFixture<AlertButtonComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertButtonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertButtonComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have a message with 'tested'", () => {
    expect(component.content).toContain("tested");
  });

  it("should have a severity greater than 2", () => {
    expect(component.severity).toBeGreaterThan(2);
  });

  it("should have an H1 tag of 'Alert Button'", () => {
    expect(de.query(By.css("h1")).nativeElement.innerText).toBe("Alert Button");
  });

  it("should toggle the message boolean", () => {
    expect(component.hideContent).toBeTruthy();
    component.toggle();
    expect(component.hideContent).toBeFalsy();
  });

  it("should toggle the message boolean asynchronously", fakeAsync(() => {
    expect(component.hideContent).toBeTruthy();
    component.toggleAsync();
    tick(500);
    expect(component.hideContent).toBeFalsy();
  }));
});
