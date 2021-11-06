import request from 'supertest';
import faker from 'faker';
import app from 'app';

describe("coworkers", () => {
    it("should retrieve all", async () => {
        const response = await request(app).get("/coworkers");

        expect(response.statusCode).toBe(200);
    })

    it("should retrieve a single", async () => {
        const response = await request(app).get("/coworkers/1");

        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("name");
        expect(response.body).not.toHaveProperty("message");
    })

    it("should create", async () => {
        const response = await request(app).post("/coworkers").send({
            coworking_id: 1,
            name: "Name5",
            email: faker.internet.email(),
            password: "secret"
        });

        expect(response.body.message).toBe("Success");
    })

    it("should update", async () => {
        const response = await request(app).post("/coworkers/1").send({
            name: "Name",
            password: "secret"
        });

        expect(response.body.message).toBe("Success");
    })

    it("should delete", async () => {
        const newCoworker = await request(app).post("/teams").send({
            coworking_id: 1,
            name: "Name",
            email: faker.internet.email(),
            password: "secret"
        });

        const newTeamId = newCoworker.body.id;

        const response = await request(app).delete(`/coworkers/${newTeamId}`)

        expect(response.body.message).toBe("Success");
    })
})
