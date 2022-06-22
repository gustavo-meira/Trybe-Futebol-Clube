import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';

import { allMatches, matchesInProgress, matchesNotInProgress } from './mocks/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota GET /matches', () => {
  beforeEach(async () => {
    sinon
      .stub(Match, 'findAll')
      .resolves(allMatches as any);
  });

  afterEach(() => {
    (Match.findAll as sinon.SinonStub).restore();
  });

  it('Deve retornar todos os jogos', async () => {
    const response = await chai
      .request(app)
      .get('/matches');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(allMatches);
  });

  it('Deve retornar todos os jogos em andamento', async () => {
    (Match.findAll as sinon.SinonStub).resolves(matchesInProgress);

    const response = await chai
      .request(app)
      .get('/matches?inProgress=true');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(matchesInProgress);
  });

  it('Deve retornar todos os jogos que não estão em andamento', async () => {
    (Match.findAll as sinon.SinonStub).resolves(matchesNotInProgress);

    const response = await chai
      .request(app)
      .get('/matches?inProgress=false');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(matchesNotInProgress);
  });
});