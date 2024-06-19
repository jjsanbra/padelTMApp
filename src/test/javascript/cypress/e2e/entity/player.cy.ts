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

describe('Player e2e test', () => {
  const playerPageUrl = '/player';
  const playerPageUrlPattern = new RegExp('/player(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const playerSample = {
    userName: 'pfft meanwhile ew',
    password: 'even regurgitate touch',
    firstName: 'Alejandro',
    lastName: 'Adame Toro',
    email: 'Claudia55@gmail.com',
  };

  let player;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/players+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/players').as('postEntityRequest');
    cy.intercept('DELETE', '/api/players/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (player) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/players/${player.id}`,
      }).then(() => {
        player = undefined;
      });
    }
  });

  it('Players menu should load Players page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('player');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Player').should('exist');
    cy.url().should('match', playerPageUrlPattern);
  });

  describe('Player page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(playerPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Player page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/player/new$'));
        cy.getEntityCreateUpdateHeading('Player');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', playerPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/players',
          body: playerSample,
        }).then(({ body }) => {
          player = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/players+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/players?page=0&size=20>; rel="last",<http://localhost/api/players?page=0&size=20>; rel="first"',
              },
              body: [player],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(playerPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Player page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('player');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', playerPageUrlPattern);
      });

      it('edit button click should load edit Player page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Player');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', playerPageUrlPattern);
      });

      it('edit button click should load edit Player page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Player');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', playerPageUrlPattern);
      });

      it('last delete button click should delete instance of Player', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('player').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', playerPageUrlPattern);

        player = undefined;
      });
    });
  });

  describe('new Player page', () => {
    beforeEach(() => {
      cy.visit(`${playerPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Player');
    });

    it('should create an instance of Player', () => {
      cy.get(`[data-cy="userName"]`).type('gnu misguided');
      cy.get(`[data-cy="userName"]`).should('have.value', 'gnu misguided');

      cy.get(`[data-cy="password"]`).type('whereas yippee');
      cy.get(`[data-cy="password"]`).should('have.value', 'whereas yippee');

      cy.get(`[data-cy="firstName"]`).type('Fernando');
      cy.get(`[data-cy="firstName"]`).should('have.value', 'Fernando');

      cy.get(`[data-cy="lastName"]`).type('Carrión Ávila');
      cy.get(`[data-cy="lastName"]`).should('have.value', 'Carrión Ávila');

      cy.get(`[data-cy="email"]`).type('Gabriela42@hotmail.com');
      cy.get(`[data-cy="email"]`).should('have.value', 'Gabriela42@hotmail.com');

      cy.get(`[data-cy="phoneNumber"]`).type('flawless bah');
      cy.get(`[data-cy="phoneNumber"]`).should('have.value', 'flawless bah');

      cy.get(`[data-cy="age"]`).type('51');
      cy.get(`[data-cy="age"]`).should('have.value', '51');

      cy.setFieldImageAsBytesOfEntity('avatar', 'integration-test.png', 'image/png');

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        player = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', playerPageUrlPattern);
    });
  });
});
