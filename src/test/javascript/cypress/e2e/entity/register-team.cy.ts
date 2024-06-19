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

describe('RegisterTeam e2e test', () => {
  const registerTeamPageUrl = '/register-team';
  const registerTeamPageUrlPattern = new RegExp('/register-team(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const registerTeamSample = {"registerDate":"2024-06-03T10:15:24.925Z"};

  let registerTeam;
  // let team;
  // let tournament;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/teams',
      body: {"teamName":"bleakly blah corrupt","logo":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","logoContentType":"unknown"},
    }).then(({ body }) => {
      team = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/tournaments',
      body: {"tournamentName":"next ankle","description":"garb detail","startDate":"2024-06-02T19:58:07.746Z","endDate":"2024-06-03T14:03:29.855Z","lastInscriptionsDate":"2024-06-03T08:11:17.218Z","maxTeamsAllowed":52,"prices":"salute antler soldier","active":false,"poster":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","posterContentType":"unknown"},
    }).then(({ body }) => {
      tournament = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/register-teams+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/register-teams').as('postEntityRequest');
    cy.intercept('DELETE', '/api/register-teams/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/teams', {
      statusCode: 200,
      body: [team],
    });

    cy.intercept('GET', '/api/tournaments', {
      statusCode: 200,
      body: [tournament],
    });

  });
   */

  afterEach(() => {
    if (registerTeam) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/register-teams/${registerTeam.id}`,
      }).then(() => {
        registerTeam = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (team) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/teams/${team.id}`,
      }).then(() => {
        team = undefined;
      });
    }
    if (tournament) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/tournaments/${tournament.id}`,
      }).then(() => {
        tournament = undefined;
      });
    }
  });
   */

  it('RegisterTeams menu should load RegisterTeams page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('register-team');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('RegisterTeam').should('exist');
    cy.url().should('match', registerTeamPageUrlPattern);
  });

  describe('RegisterTeam page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(registerTeamPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create RegisterTeam page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/register-team/new$'));
        cy.getEntityCreateUpdateHeading('RegisterTeam');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', registerTeamPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/register-teams',
          body: {
            ...registerTeamSample,
            team: team,
            tournaments: tournament,
          },
        }).then(({ body }) => {
          registerTeam = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/register-teams+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [registerTeam],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(registerTeamPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(registerTeamPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response?.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details RegisterTeam page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('registerTeam');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', registerTeamPageUrlPattern);
      });

      it('edit button click should load edit RegisterTeam page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('RegisterTeam');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', registerTeamPageUrlPattern);
      });

      it('edit button click should load edit RegisterTeam page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('RegisterTeam');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', registerTeamPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of RegisterTeam', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('registerTeam').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', registerTeamPageUrlPattern);

        registerTeam = undefined;
      });
    });
  });

  describe('new RegisterTeam page', () => {
    beforeEach(() => {
      cy.visit(`${registerTeamPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('RegisterTeam');
    });

    it.skip('should create an instance of RegisterTeam', () => {
      cy.get(`[data-cy="registerDate"]`).type('2024-06-02T21:23');
      cy.get(`[data-cy="registerDate"]`).blur();
      cy.get(`[data-cy="registerDate"]`).should('have.value', '2024-06-02T21:23');

      cy.get(`[data-cy="team"]`).select(1);
      cy.get(`[data-cy="tournaments"]`).select([0]);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        registerTeam = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', registerTeamPageUrlPattern);
    });
  });
});
