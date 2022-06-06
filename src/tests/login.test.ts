import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { validUser } from './mocks/usersMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login', () => {

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(validUser as any);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Deve retornar um token de acesso', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'oiwolfi@email.com',
        password: 'secret_admin',
      });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token');
  })

  it('Deve retornar um erro ao tentar logar com um usuário não cadastrado', async () => {
    (User.findOne as sinon.SinonStub).restore();
    sinon
      .stub(User, "findOne")
      .resolves(null as any);

    const response = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'oiwolfi@email.com',
        password: '123456',
      });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Incorrect email or password');
  })

  it('Deve retornar um erro se a senha não for a mesma cadastrada', async () => {
    (User.findOne as sinon.SinonStub).restore();
    sinon
      .stub(User, "findOne")
      .resolves(validUser as any);

    const response = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'oiwolfi@email.com',
        password: '123456',
      });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Incorrect email or password');
  });
});
