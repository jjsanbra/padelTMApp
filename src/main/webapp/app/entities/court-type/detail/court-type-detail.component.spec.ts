import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CourtTypeDetailComponent } from './court-type-detail.component';

describe('CourtType Management Detail Component', () => {
  let comp: CourtTypeDetailComponent;
  let fixture: ComponentFixture<CourtTypeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtTypeDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CourtTypeDetailComponent,
              resolve: { courtType: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CourtTypeDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtTypeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load courtType on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CourtTypeDetailComponent);

      // THEN
      expect(instance.courtType()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
