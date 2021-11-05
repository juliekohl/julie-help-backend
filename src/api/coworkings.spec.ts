import request from 'supertest';
import app from 'app';

describe("coworkings", () => {
    it("should get all coworkings", async () => {
        const response = await request(app).get("/coworkings");
        expect(response.statusCode).toBe(200);
    })

    it("should get a coworking by its id", async () => {
        const response = await request(app).get("/coworking/2");
        expect(response.body).toHaveProperty("name");
        expect(response.body).not.toHaveProperty("message");
        // expect(response.body.id).toBe(1);
    })

    it("should create a coworking by its name", async () => {
        const response = await request(app).post("/coworking").send({
            name: "Name"
        });
        expect(response.body.message).toBe("Success");
        // expect(typeof response.body).toBe("number");
    })

    it("should update a coworking by its name", async () => {
        const response = await request(app).post("/coworking/2").send({
            name: "New Name"
        });
        // console.log(response.body)
        expect(response.body.message).toBe("Success");
        // expect(response.body).toBe("number");
    })

    it("should delete a coworking by its id", async () => {
        const response = await request(app).delete("/coworking/2")
        expect(response.body.message).toBe("Success");
    })
})