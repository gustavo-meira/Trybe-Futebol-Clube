import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { validUser } from './mocks/usersMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login/validate', () => {
  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(validUser as any);
  });

  afterEach(async () => {
    sinon.restore();
  });

  it('Deve retornar o role do usuário', async () => {
    const { body: { token } } = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

    const response = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', token);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.equal('admin');
  });

  it('Deve retornar um erro se o token não for válido', async () => {
    const response = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', 'token');

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Invalid token');
  });
});
