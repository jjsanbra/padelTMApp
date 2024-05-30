import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TeamDetailComponent } from './team-detail.component';

describe('Team Management Detail Component', () => {
  let comp: TeamDetailComponent;
  let fixture: ComponentFixture<TeamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TeamDetailComponent,
              resolve: { team: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TeamDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load team on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TeamDetailComponent);

      // THEN
      expect(instance.team()).toEqual(expect.objectContaining({ id: 123 }));
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
