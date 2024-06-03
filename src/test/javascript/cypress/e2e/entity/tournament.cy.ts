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

describe('Tournament e2e test', () => {
  const tournamentPageUrl = '/tournament';
  const tournamentPageUrlPattern = new RegExp('/tournament(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const tournamentSample = {};

  let tournament;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/tournaments+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/tournaments').as('postEntityRequest');
    cy.intercept('DELETE', '/api/tournaments/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (tournament) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/tournaments/${tournament.id}`,
      }).then(() => {
        tournament = undefined;
      });
    }
  });

  it('Tournaments menu should load Tournaments page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('tournament');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Tournament').should('exist');
    cy.url().should('match', tournamentPageUrlPattern);
  });

  describe('Tournament page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(tournamentPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Tournament page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/tournament/new$'));
        cy.getEntityCreateUpdateHeading('Tournament');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', tournamentPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/tournaments',
          body: tournamentSample,
        }).then(({ body }) => {
          tournament = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/tournaments+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/tournaments?page=0&size=20>; rel="last",<http://localhost/api/tournaments?page=0&size=20>; rel="first"',
              },
              body: [tournament],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(tournamentPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Tournament page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('tournament');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', tournamentPageUrlPattern);
      });

      it('edit button click should load edit Tournament page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Tournament');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', tournamentPageUrlPattern);
      });

      it('edit button click should load edit Tournament page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Tournament');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', tournamentPageUrlPattern);
      });

      it('last delete button click should delete instance of Tournament', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('tournament').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', tournamentPageUrlPattern);

        tournament = undefined;
      });
    });
  });

  describe('new Tournament page', () => {
    beforeEach(() => {
      cy.visit(`${tournamentPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Tournament');
    });

    it('should create an instance of Tournament', () => {
      cy.get(`[data-cy="tournamentName"]`).type('moist which underneath');
      cy.get(`[data-cy="tournamentName"]`).should('have.value', 'moist which underneath');

      cy.get(`[data-cy="description"]`).type('provided pause defender');
      cy.get(`[data-cy="description"]`).should('have.value', 'provided pause defender');

      cy.get(`[data-cy="startDate"]`).type('2024-06-02T07:10');
      cy.get(`[data-cy="startDate"]`).blur();
      cy.get(`[data-cy="startDate"]`).should('have.value', '2024-06-02T07:10');

      cy.get(`[data-cy="endDate"]`).type('2024-06-02T03:39');
      cy.get(`[data-cy="endDate"]`).blur();
      cy.get(`[data-cy="endDate"]`).should('have.value', '2024-06-02T03:39');

      cy.get(`[data-cy="lastInscriptionsDate"]`).type('2024-06-01T15:56');
      cy.get(`[data-cy="lastInscriptionsDate"]`).blur();
      cy.get(`[data-cy="lastInscriptionsDate"]`).should('have.value', '2024-06-01T15:56');

      cy.get(`[data-cy="maxTeamsAllowed"]`).type('74');
      cy.get(`[data-cy="maxTeamsAllowed"]`).should('have.value', '74');

      cy.get(`[data-cy="prices"]`).type('instead properly');
      cy.get(`[data-cy="prices"]`).should('have.value', 'instead properly');

      cy.get(`[data-cy="active"]`).should('not.be.checked');
      cy.get(`[data-cy="active"]`).click();
      cy.get(`[data-cy="active"]`).should('be.checked');

      cy.setFieldImageAsBytesOfEntity('poster', 'integration-test.png', 'image/png');

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        tournament = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', tournamentPageUrlPattern);
    });
  });
});
