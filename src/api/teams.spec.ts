import request from 'supertest';
import app from 'app';

describe("teams", () => {
    it("should get all teams", async () => {
        const response = await request(app).get("/teams");
        expect(response.statusCode).toBe(200);
    })

    it("should get a team by its email and name", async () => {
        const response = await request(app).get("/teams/1");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("name");
        expect(response.body).not.toHaveProperty("message");
    })

    it("should create a team by its name, email and password", async () => {
        const response = await request(app).post("/teams").send({
            coworking_id: 6,
            name: "Name6",
            email: "email-test6@email.com",
            password: "secret"
        });
        expect(response.body.message).toBe("Success");
    })

    it("should update a team by its name or password", async () => {
        const response = await request(app).post("/teams/6").send({
            name: "Name",
            password: "secret"
        });
        expect(response.body.message).toBe("Success");
    })

    it("should delete a teams by its id", async () => {
        const response = await request(app).delete("/teams/6")
        expect(response.body.message).toBe("Success");
    })
})