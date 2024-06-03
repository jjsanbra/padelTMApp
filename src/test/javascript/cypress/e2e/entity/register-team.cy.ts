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
  const registerTeamSample = { teamName: 'jubilant' };

  let registerTeam;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/register-teams+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/register-teams').as('postEntityRequest');
    cy.intercept('DELETE', '/api/register-teams/*').as('deleteEntityRequest');
  });

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

  it('RegisterTeams menu should load RegisterTeams page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('register-team');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
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
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', registerTeamPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/register-teams',
          body: registerTeamSample,
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
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(registerTeamPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details RegisterTeam page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('registerTeam');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', registerTeamPageUrlPattern);
      });

      it('edit button click should load edit RegisterTeam page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('RegisterTeam');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', registerTeamPageUrlPattern);
      });

      it('edit button click should load edit RegisterTeam page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('RegisterTeam');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', registerTeamPageUrlPattern);
      });

      it('last delete button click should delete instance of RegisterTeam', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('registerTeam').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
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

    it('should create an instance of RegisterTeam', () => {
      cy.get(`[data-cy="teamName"]`).type('overconfidently merchandise yuck');
      cy.get(`[data-cy="teamName"]`).should('have.value', 'overconfidently merchandise yuck');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        registerTeam = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', registerTeamPageUrlPattern);
    });
  });
});
