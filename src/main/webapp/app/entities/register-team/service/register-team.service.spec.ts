import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRegisterTeam } from '../register-team.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../register-team.test-samples';

import { RegisterTeamService } from './register-team.service';

const requireRestSample: IRegisterTeam = {
  ...sampleWithRequiredData,
};

describe('RegisterTeam Service', () => {
  let service: RegisterTeamService;
  let httpMock: HttpTestingController;
  let expectedResult: IRegisterTeam | IRegisterTeam[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RegisterTeamService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a RegisterTeam', () => {
      const registerTeam = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(registerTeam).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RegisterTeam', () => {
      const registerTeam = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(registerTeam).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RegisterTeam', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RegisterTeam', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a RegisterTeam', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRegisterTeamToCollectionIfMissing', () => {
      it('should add a RegisterTeam to an empty array', () => {
        const registerTeam: IRegisterTeam = sampleWithRequiredData;
        expectedResult = service.addRegisterTeamToCollectionIfMissing([], registerTeam);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(registerTeam);
      });

      it('should not add a RegisterTeam to an array that contains it', () => {
        const registerTeam: IRegisterTeam = sampleWithRequiredData;
        const registerTeamCollection: IRegisterTeam[] = [
          {
            ...registerTeam,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRegisterTeamToCollectionIfMissing(registerTeamCollection, registerTeam);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RegisterTeam to an array that doesn't contain it", () => {
        const registerTeam: IRegisterTeam = sampleWithRequiredData;
        const registerTeamCollection: IRegisterTeam[] = [sampleWithPartialData];
        expectedResult = service.addRegisterTeamToCollectionIfMissing(registerTeamCollection, registerTeam);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(registerTeam);
      });

      it('should add only unique RegisterTeam to an array', () => {
        const registerTeamArray: IRegisterTeam[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const registerTeamCollection: IRegisterTeam[] = [sampleWithRequiredData];
        expectedResult = service.addRegisterTeamToCollectionIfMissing(registerTeamCollection, ...registerTeamArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const registerTeam: IRegisterTeam = sampleWithRequiredData;
        const registerTeam2: IRegisterTeam = sampleWithPartialData;
        expectedResult = service.addRegisterTeamToCollectionIfMissing([], registerTeam, registerTeam2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(registerTeam);
        expect(expectedResult).toContain(registerTeam2);
      });

      it('should accept null and undefined values', () => {
        const registerTeam: IRegisterTeam = sampleWithRequiredData;
        expectedResult = service.addRegisterTeamToCollectionIfMissing([], null, registerTeam, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(registerTeam);
      });

      it('should return initial array if no RegisterTeam is added', () => {
        const registerTeamCollection: IRegisterTeam[] = [sampleWithRequiredData];
        expectedResult = service.addRegisterTeamToCollectionIfMissing(registerTeamCollection, undefined, null);
        expect(expectedResult).toEqual(registerTeamCollection);
      });
    });

    describe('compareRegisterTeam', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRegisterTeam(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareRegisterTeam(entity1, entity2);
        const compareResult2 = service.compareRegisterTeam(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareRegisterTeam(entity1, entity2);
        const compareResult2 = service.compareRegisterTeam(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareRegisterTeam(entity1, entity2);
        const compareResult2 = service.compareRegisterTeam(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
