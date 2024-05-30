import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { RegisterTeamDetailComponent } from './register-team-detail.component';

describe('RegisterTeam Management Detail Component', () => {
  let comp: RegisterTeamDetailComponent;
  let fixture: ComponentFixture<RegisterTeamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterTeamDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: RegisterTeamDetailComponent,
              resolve: { registerTeam: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(RegisterTeamDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTeamDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load registerTeam on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', RegisterTeamDetailComponent);

      // THEN
      expect(instance.registerTeam()).toEqual(expect.objectContaining({ id: 123 }));
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
