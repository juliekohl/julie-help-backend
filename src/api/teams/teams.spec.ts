import request from 'supertest';
import faker from 'faker';
import app from 'app';

describe("teams", () => {
    it("should show all", async () => {
        const response = await request(app).get("/teams");

        expect(response.statusCode).toBe(200);
    })

    it("should show a single", async () => {
        const response = await request(app).get("/teams/1");

        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("name");
        expect(response.body).not.toHaveProperty("message");
    })

    it("should create", async () => {
        const response = await request(app).post("/teams").send({
            coworking_id: 1,
            name: "Name Test",
            email: 'team_' + faker.internet.email(),
            password: "secret"
        });

        expect(response.body.message).toBe("Success");
    })

    it("should update", async () => {
        const response = await request(app).post("/teams/1").send({
            name: "Name Update",
            password: "secret"
        });

        expect(response.body.message).toBe("Success");
    })

    it("should delete", async () => {
        const newTeam = await request(app).post("/teams").send({
            coworking_id: 1,
            name: "Name Delete",
            email: 'team_' + faker.internet.email(),
            password: "secret"
        });

        const newTeamId = newTeam.body.id;
        const response = await request(app).delete(`/teams/${newTeamId}`)

        expect(response.body.message).toBe("Success");
    })
})
