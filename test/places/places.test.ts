import app from '../../app/app';
import { agent as request } from 'supertest';
import { expect } from 'chai';
import { environment } from '../../dev.env';

let testPlaceId = '';
it('should GET /places for nyc restaurants', async function () {
    const res = await request(app)
        .get(`/places?lat=${environment.testing_location.lat}&lng=${environment.testing_location.lng}&keyword=restaurant`).send();
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body.places).to.be.an('array');
    expect(res.body.places).not.to.be.empty;
    expect(res.body.places[0]).not.to.be.empty;
    expect(res.body.places[0].place_id).not.to.be.empty;
    expect(res.body.places[0].name).not.to.be.empty;
    testPlaceId = res.body.places[0].place_id;
    
});

it('should GET /place details for restaurant', async function () {
    const res = await request(app)
    .get(`/places/${testPlaceId}`)
    expect(res.status).to.equal(200);
    
});
