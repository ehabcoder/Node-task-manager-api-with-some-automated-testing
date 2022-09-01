const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase);

test('Should sign up a new user', async () => {
    const response = await request(app)
                            .post('/users')
                            .send({
                                name: "Hoopa",
                                email: "ehab@gmail.com",
                                password: 'myPass123'
                            })
                            .expect(201)
    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertion about the response
    // expect(response.body.user.name).toBe('Hoopa');
    expect(response.body).toMatchObject({
        user: {
            name: "Hoopa",
            email: "ehab@gmail.com",
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('myPass123');
})

test('Should not signup user with invalid name/email/password', async () => {
    const response = await request(app)
                            .post('/users')
                            .send({
                                name: '',
                                email: 'eee',
                                password: 'pass'
                            })
                            .expect(400)
}) 


test('Should login in existing user', async() => {
    const response = await request(app)
                            .post('/users/login')
                            .send({
                                email: userOne.email,
                                password: userOne.password
                            })
                            .expect(200);
    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login unexistent user', async () => {
    await request(app)
    .post('/users/login')
    .send({
        email: userOne.email,
        password: 'password'
    })
    .expect(400);
})

test('Should get profile for user', async () => {
    await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
            .get('/users/me')
            .send()
            .expect(401)
})

test('Should delete account for user', async () => {
    const response = await request(app)
                            .delete('/users/me')
                            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                            .send()
                            .expect(200)
    const user = await User.findById(userOneId);
    expect(user).toBeNull();
})

test('Should not delete account for unauthnticated users', async() => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
            .post('/users/me/avatar')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .attach('avatar', 'tests/fixtures/city.jpg')
            .expect(200)
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({
                name: "Edited Ehab",
                password: "edited pass"
            })
            .expect(200);
    const user = await User.findById(userOneId);
    expect(user.name).toBe('Edited Ehab');
})

test('Should not update when unauthorized.', async () => {
    await request(app)
            .patch('/users/me')
            .send({
                name: "Edited Ehab",
                password: "edited pass"
            })
            .expect(401);
})

test('Should not update invalid fields.', async () => {
    await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({
              location: 'Egypt'
            })
            .expect(400);
})
