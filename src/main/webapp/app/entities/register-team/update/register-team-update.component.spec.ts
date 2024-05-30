import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { RegisterTeamService } from '../service/register-team.service';
import { IRegisterTeam } from '../register-team.model';
import { RegisterTeamFormService } from './register-team-form.service';

import { RegisterTeamUpdateComponent } from './register-team-update.component';

describe('RegisterTeam Management Update Component', () => {
  let comp: RegisterTeamUpdateComponent;
  let fixture: ComponentFixture<RegisterTeamUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let registerTeamFormService: RegisterTeamFormService;
  let registerTeamService: RegisterTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RegisterTeamUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(RegisterTeamUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RegisterTeamUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    registerTeamFormService = TestBed.inject(RegisterTeamFormService);
    registerTeamService = TestBed.inject(RegisterTeamService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const registerTeam: IRegisterTeam = { id: 456 };

      activatedRoute.data = of({ registerTeam });
      comp.ngOnInit();

      expect(comp.registerTeam).toEqual(registerTeam);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRegisterTeam>>();
      const registerTeam = { id: 123 };
      jest.spyOn(registerTeamFormService, 'getRegisterTeam').mockReturnValue(registerTeam);
      jest.spyOn(registerTeamService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ registerTeam });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: registerTeam }));
      saveSubject.complete();

      // THEN
      expect(registerTeamFormService.getRegisterTeam).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(registerTeamService.update).toHaveBeenCalledWith(expect.objectContaining(registerTeam));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRegisterTeam>>();
      const registerTeam = { id: 123 };
      jest.spyOn(registerTeamFormService, 'getRegisterTeam').mockReturnValue({ id: null });
      jest.spyOn(registerTeamService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ registerTeam: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: registerTeam }));
      saveSubject.complete();

      // THEN
      expect(registerTeamFormService.getRegisterTeam).toHaveBeenCalled();
      expect(registerTeamService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRegisterTeam>>();
      const registerTeam = { id: 123 };
      jest.spyOn(registerTeamService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ registerTeam });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(registerTeamService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
