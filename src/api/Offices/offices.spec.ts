import request from 'supertest';
import faker from 'faker';
import app from 'app';

describe("Offices", () => {
    it("should retrieve all", async () => {
        const response = await request(app).get("/offices");

        expect(response.statusCode).toBe(200);
    })

    it('should retrieve a single', async () => {
        const response = await request(app).get("/offices/1");

        // console.log("response.body", response.body);
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("type");
        expect(response.body).not.toHaveProperty("message");
    })

    it("should create", async () => {
        const response = await request(app).post("/offices").send({
            coworking_id: 1,
            name: "Name Test",
            type: faker.database.type()
        });

        // console.log("response", response);
        expect(response.body.message).toBe("Success");
    })
});
