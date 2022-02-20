import request from 'supertest';
import app from 'app';

describe("login", () => {
    let newTeamId = null;

    beforeEach(async () => {
        const response = await request(app).post("/teams").send({
            coworking_id: 1,
            name: "Test Jest",
            email: "test@test.com",
            password: "secret"
        });

        newTeamId = response.body.id;
    })

    afterEach(() => {
        request(app).delete(`/teams/${newTeamId}`)
    })

    it("should login", async () => {
        const response = await request(app).post("/login").send({
            email: "test@test.com",
            password: "secret"
        });

        expect(response.body.message).toBe("Success");
    })

    it("should not login", async () => {
        const response = await request(app).post("/login").send({
            email: "wrong@gmail.com",
            password: "wrong"
        });

        expect(response.body.message).toBe("False");
    })
})