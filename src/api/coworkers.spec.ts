import request from 'supertest';
import app from 'app';

describe("coworkers", () => {
    it("should respond with a 200 status code", async () => {
        const response = await request(app).get("/coworkers");
        expect(response.statusCode).toBe(200);
    })

    it("should get a coworker by its email and name", async () => {
        const response = await request(app).get("/coworkers/1");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("name");
        expect(response.body).not.toHaveProperty("message");
    })

    it("should create a coworker by its name, email and password", async () => {
        const response = await request(app).post("/coworkers").send({
            coworking_id: 5,
            name: "Name5",
            email: "email-test5@email.com",
            password: "secret"
        });
        expect(response.body.message).toBe("Success");
    })

    it("should update a coworker by its name or password", async () => {
        const response = await request(app).post("/coworkers/5").send({
            name: "Name",
            password: "secret"
        });
        expect(response.body.message).toBe("Success");
    })

    it("should delete a coworkers by its id", async () => {
        const response = await request(app).delete("/coworkers/5")
        expect(response.body.message).toBe("Success");
    })
})