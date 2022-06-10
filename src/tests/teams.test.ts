import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';

import { teams } from './mocks/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /teams', () => {

  beforeEach(async () => {
    sinon
      .stub(Team, 'findAll')
      .resolves(teams as any);

    sinon
      .stub(Team, 'findOne')
      .resolves(teams[0] as any);
  });

  afterEach(() => {
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findOne as sinon.SinonStub).restore();
  });

  it('Deve retornar todos os times', async () => {
    const response = await chai
      .request(app)
      .get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf(3);
  });

  it('Deve retornar um time pelo id', async () => {
    const response = await chai
      .request(app)
      .get('/teams/1');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('teamName');
    expect(response.body.id).to.be.equal(1);
    expect(response.body.teamName).to.be.equal('Team 1');
  });

  it('Deve retornar um erro caso não encontre o time com o id', async () => {
    (Team.findOne as sinon.SinonStub).restore();

    sinon
      .stub(Team, 'findOne')
      .resolves(null);

    const response = await chai
      .request(app)
      .get('/teams/4');

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('There is no team with such id!');
  });
})
