import request from 'supertest'
import app from './server'

describe('Sample Test', () => {
    it('sanity test', () => {
        const result = true
        expect(result).toBe(true)
    })
})

describe('Test My app server', () => {
    it('should get main route', async () => {
        const res = await request(app).get('/');

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('message')
    })
})

describe('POST /users', () => {
    describe("give a username and password", () => {
        // should save the username and password to the database
        // should respond with a json object contain the user id
        test('should respond with a 200 status code', async () => {
            const res = await request(app).post('/users').send({
                username: "username",
                password: "password"
            })
            expect(res.statusCode).toBe(200)
        })
        test('specify json in the content type header', async () => {
            const res = await request(app).post('/users').send({
                username: "username",
                password: "password"
            })
            expect(res.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test('response has userId', async () => {
            const res = await request(app).post('/users').send({
                username: "username",
                password: "password"
            })
            expect(res.body.userId).toBeDefined()
        })
    })

    describe("when the username and password is missing", () => {
        test('should respond with a status code of 400', async () => {
            const bodyData = [
                {username: "username"},
                {password: "password"},
                {}
            ]
            for (const body of bodyData) {
                const res = await request(app).post('/users').send()
                expect(res.statusCode).toBe(400)
            }
        })
    })
})