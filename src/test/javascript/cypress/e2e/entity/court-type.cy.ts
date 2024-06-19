import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('CourtType e2e test', () => {
  const courtTypePageUrl = '/court-type';
  const courtTypePageUrlPattern = new RegExp('/court-type(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const courtTypeSample = { courtTypeName: 'hourly' };

  let courtType;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/court-types+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/court-types').as('postEntityRequest');
    cy.intercept('DELETE', '/api/court-types/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (courtType) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/court-types/${courtType.id}`,
      }).then(() => {
        courtType = undefined;
      });
    }
  });

  it('CourtTypes menu should load CourtTypes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('court-type');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('CourtType').should('exist');
    cy.url().should('match', courtTypePageUrlPattern);
  });

  describe('CourtType page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(courtTypePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create CourtType page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/court-type/new$'));
        cy.getEntityCreateUpdateHeading('CourtType');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', courtTypePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/court-types',
          body: courtTypeSample,
        }).then(({ body }) => {
          courtType = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/court-types+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [courtType],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(courtTypePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details CourtType page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('courtType');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', courtTypePageUrlPattern);
      });

      it('edit button click should load edit CourtType page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('CourtType');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', courtTypePageUrlPattern);
      });

      it('edit button click should load edit CourtType page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('CourtType');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', courtTypePageUrlPattern);
      });

      it('last delete button click should delete instance of CourtType', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('courtType').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', courtTypePageUrlPattern);

        courtType = undefined;
      });
    });
  });

  describe('new CourtType page', () => {
    beforeEach(() => {
      cy.visit(`${courtTypePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('CourtType');
    });

    it('should create an instance of CourtType', () => {
      cy.get(`[data-cy="courtTypeName"]`).type('pfft');
      cy.get(`[data-cy="courtTypeName"]`).should('have.value', 'pfft');

      cy.get(`[data-cy="description"]`).type('blubber exam');
      cy.get(`[data-cy="description"]`).should('have.value', 'blubber exam');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        courtType = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', courtTypePageUrlPattern);
    });
  });
});
