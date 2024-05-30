import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { LevelDetailComponent } from './level-detail.component';

describe('Level Management Detail Component', () => {
  let comp: LevelDetailComponent;
  let fixture: ComponentFixture<LevelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: LevelDetailComponent,
              resolve: { level: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(LevelDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load level on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LevelDetailComponent);

      // THEN
      expect(instance.level()).toEqual(expect.objectContaining({ id: 123 }));
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
