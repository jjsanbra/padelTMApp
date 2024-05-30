import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { SponsorDetailComponent } from './sponsor-detail.component';

describe('Sponsor Management Detail Component', () => {
  let comp: SponsorDetailComponent;
  let fixture: ComponentFixture<SponsorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: SponsorDetailComponent,
              resolve: { sponsor: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(SponsorDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load sponsor on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', SponsorDetailComponent);

      // THEN
      expect(instance.sponsor()).toEqual(expect.objectContaining({ id: 123 }));
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
