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

describe('Sponsor e2e test', () => {
  const sponsorPageUrl = '/sponsor';
  const sponsorPageUrlPattern = new RegExp('/sponsor(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const sponsorSample = { sponsorName: 'a yum' };

  let sponsor;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/sponsors+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/sponsors').as('postEntityRequest');
    cy.intercept('DELETE', '/api/sponsors/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (sponsor) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/sponsors/${sponsor.id}`,
      }).then(() => {
        sponsor = undefined;
      });
    }
  });

  it('Sponsors menu should load Sponsors page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('sponsor');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Sponsor').should('exist');
    cy.url().should('match', sponsorPageUrlPattern);
  });

  describe('Sponsor page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(sponsorPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Sponsor page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/sponsor/new$'));
        cy.getEntityCreateUpdateHeading('Sponsor');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', sponsorPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/sponsors',
          body: sponsorSample,
        }).then(({ body }) => {
          sponsor = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/sponsors+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [sponsor],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(sponsorPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Sponsor page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('sponsor');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', sponsorPageUrlPattern);
      });

      it('edit button click should load edit Sponsor page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Sponsor');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', sponsorPageUrlPattern);
      });

      it('edit button click should load edit Sponsor page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Sponsor');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', sponsorPageUrlPattern);
      });

      it('last delete button click should delete instance of Sponsor', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('sponsor').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', sponsorPageUrlPattern);

        sponsor = undefined;
      });
    });
  });

  describe('new Sponsor page', () => {
    beforeEach(() => {
      cy.visit(`${sponsorPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Sponsor');
    });

    it('should create an instance of Sponsor', () => {
      cy.get(`[data-cy="sponsorName"]`).type('intentional devalue those');
      cy.get(`[data-cy="sponsorName"]`).should('have.value', 'intentional devalue those');

      cy.get(`[data-cy="description"]`).type('down');
      cy.get(`[data-cy="description"]`).should('have.value', 'down');

      cy.setFieldImageAsBytesOfEntity('logo', 'integration-test.png', 'image/png');

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        sponsor = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', sponsorPageUrlPattern);
    });
  });
});
