import app from '../../app/app';
import { agent as request } from 'supertest';
import { expect } from 'chai';
import { JwtService } from '../../app/auth/services/jwt.service';
import { environment } from '../../dev.env';
let firstUserIdTest = '';
let firstUserBody = {
    "email": environment.testing_user_email,
    "password": environment.testing_user_password
};
let secondUserBody = {
    "email": "2_" + environment.testing_user_email,
    "password": environment.testing_user_password
};
let jwt = {
    accessToken: '',
    refreshToken: ''
};
const adminJWT = JwtService.generateToken(2147483647);
it('should POST /users', async function () {
    const res = await request(app)
        .post('/users').send(firstUserBody);
    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("object");
    expect(res.body.id).to.be.an('string');
    firstUserIdTest = res.body.id;
});
it(`should POST to /auth and retrieve an access token`, async () => {
    const res = await request(app)
        .post('/auth').send({
            "email": firstUserBody.email,
            "password": firstUserBody.password
        });
    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("object");
    expect(res.body.accessToken).to.be.an("string");
    expect(res.body.refreshToken).to.be.an("string");
    jwt.accessToken = res.body.accessToken;
    jwt.refreshToken = res.body.refreshToken;
});
it(`should GET /users/:userId`, async function () {
    console.log(`Bearer ${jwt.accessToken}`);
    const res = await request(app)
        .get(`/users/${firstUserIdTest}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${jwt.accessToken}`)
        .send();
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("object");
    expect(res.body._id).to.be.an('string');
    expect(res.body.email).to.be.equals(firstUserBody.email);
    expect(res.body.permissionLevel).to.be.equals(15);
    expect(res.body._id).to.be.equals(firstUserIdTest);
});
it(`should GET /users`, async function () {
    const res = await request(app)
        .get(`/users`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${adminJWT.token}`)
        .send();
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("array");
    // console.log(res.body)
    expect(res.body).to.have.length.greaterThan(0);
    let users_length = res.body.length;
    expect(res.body[users_length - 1]._id).to.be.an('string');
    expect(res.body[users_length - 1].email).to.be.equals(firstUserBody.email);
    expect(res.body[users_length - 1]._id).to.be.equals(firstUserIdTest);
});
it('should PUT /users/:userId', async function () {
    const res = await request(app)
        .put(`/users/${firstUserIdTest}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${jwt.accessToken}`)
        .send({
            email: secondUserBody.email,
            favourite_places: [
                'ChIJsb6K1VzzfVMRU1SQdEZvxsk'
            ]
        });
    expect(res.status).to.equal(204);
});
it(`should GET /users/:userId to have a new email`, async function () {
    const res = await request(app)
        .get(`/users/${firstUserIdTest}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${jwt.accessToken}`)
        .send();
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("object");
    expect(res.body._id).to.be.an('string');
    expect(res.body.email).to.be.equals(secondUserBody.email);
    expect(res.body._id).to.be.equals(firstUserIdTest);
});

it(`should GET /places/favs/:userId and return data about favourie places`, async function () {
    const res = await request(app)
    .get(`/users/${firstUserIdTest}`)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${jwt.accessToken}`)
    .send();
    expect(res.status).to.equal(200);

    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("object");
    expect(res.body.favourite_places).to.not.be.empty;
    expect(res.body.favourite_places).to.be.an("array");
    expect(res.body.favourite_places).to.have.length.greaterThan(0);
    expect(res.body.favourite_places[0]).to.equal('ChIJsb6K1VzzfVMRU1SQdEZvxsk');
});

it('should DELETE /users/:userId', async function () {
    const res = await request(app)
        .delete(`/users/${firstUserIdTest}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${jwt.accessToken}`)
        .send();
    expect(res.status).to.equal(204);
});
it(`should GET /users and receive a 403 for not being an ADMIN`, async function () {
    const res = await request(app)
        .get(`/users`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${jwt.accessToken}`)
        .send();
    expect(res.status).to.equal(403);
});