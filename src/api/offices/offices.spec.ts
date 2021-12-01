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

        expect(response.body.message).toBe("Success");
    })

    it("should update", async () => {
        const response = await request(app).post("/offices/1").send({
            name: "Name Update",
            type: "Update Type"
        });

        expect(response.body.message).toBe("Success");
    })

    it("should delete", async () => {
        const newOffice = await request(app).post("/offices").send({
            coworking_id: 1,
            name: "Name Test",
            type: faker.database.type()
        });

        const newOfficeId = newOffice.body.id;
        const response = await request(app).delete(`/offices/${newOfficeId}`);

        expect(response.body.message).toBe("Success");
    })
});
