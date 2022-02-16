import request from 'supertest';
import app from 'app';

describe("login", () => {
    let newCoworkerId = null;

    beforeEach(async () => {
        const response = await request(app).post("/teams").send({
            coworking_id: 1,
            name: "Test Jest",
            email: "jesttest@gmail.com",
            password: "secret"
        });

        newCoworkerId = response.body.id;
    })

    afterEach(() => {
        request(app).delete(`/teams/${newCoworkerId}`)
    })

    it("should login", async () => {
        const response = await request(app).post("/login").send({
            email: "jesttest@gmail.com",
            password: "secret"
        });

        expect(response.body.message).toBe("Success");
    })
})