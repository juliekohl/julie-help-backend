import request from 'supertest';
import app from 'app';

describe("coworkings", () => {
    it("should retrieve all", async () => {
        const response = await request(app).get("/coworkings");

        expect(response.statusCode).toBe(200);
    })

    it("should retrieve a single", async () => {
        const response = await request(app).get("/coworking/1");

        expect(response.body).toHaveProperty("name");
        expect(response.body).not.toHaveProperty("message");
    })

    it("should create", async () => {
        const response = await request(app).post("/coworking").send({
            name: "Name Test"
        });

        expect(response.body.message).toBe("Success");
    })

    it("should update", async () => {
        const response = await request(app).post("/coworking/1").send({
            name: "New Update"
        });

        expect(response.body.message).toBe("Success");
    })

    it("should delete a coworking by its id", async () => {
        const newCoworking = await request(app).post("/coworking").send({
            name: "Name Delete",
        });

        const newCoworkingId = newCoworking.body.id;
        const response = await request(app).delete(`/coworking/${newCoworkingId}`);

        expect(response.body.message).toBe("Success");
    })
})