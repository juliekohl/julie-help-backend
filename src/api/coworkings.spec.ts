import request from 'supertest';
import app from 'app';

describe("coworkings", () => {
    it('sanity test', () => {
        expect(true).toBe(true);
    })

    it("should respond with a 200 status code", async () => {
        const response = await request(app).get("/coworkings");
        expect(response.statusCode).toBe(200);
    })

    it("should get a coworking by its id", async () => {
        const response = await request(app).get("/coworking/1");
        expect(response.body.id).toBe(1);
    })

    it("should post create a coworking by its name", async () => {
        const response = await request(app).post("/coworking").send({
            name: "Name"
        });
        expect(response.body).toBe("number");
    })

    it("should post update a coworking by its name", async () => {
        const response = await request(app).post("/coworking/1").send({
            name: "Name"
        });
        expect(response.body).toBe("number");
    })

    it("should delete a coworking by its id", async () => {
        const response = await request(app).delete("/coworking/1")
        expect(response.body.message).toBe("Success");
    })
})