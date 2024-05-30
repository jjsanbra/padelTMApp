import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TournamentDetailComponent } from './tournament-detail.component';

describe('Tournament Management Detail Component', () => {
  let comp: TournamentDetailComponent;
  let fixture: ComponentFixture<TournamentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TournamentDetailComponent,
              resolve: { tournament: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TournamentDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load tournament on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TournamentDetailComponent);

      // THEN
      expect(instance.tournament()).toEqual(expect.objectContaining({ id: 123 }));
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
