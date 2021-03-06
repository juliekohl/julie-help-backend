import request from 'supertest';
import app from 'app';

describe("Offices", () => {
    it("should show all", async () => {
        const response = await request(app).get("/offices");

        expect(response.statusCode).toBe(200);
    })

    it('should show a single', async () => {
        const response = await request(app).get("/offices/2");

        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("type");
        expect(response.body).not.toHaveProperty("message");
    })

    it("should create", async () => {
        const response = await request(app).post("/offices").send({
            coworking_id: 1,
            name: "Name Test",
            officestype_id: 1
        });

        expect(response.body.message).toBe("Success");
    })

    it("should update", async () => {
        const response = await request(app).post("/offices/1").send({
            name: "Name Update",
            officestype_id: 1
        });

        expect(response.body.message).toBe("Success");
    })

    it("should delete", async () => {
        const newOffice = await request(app).post("/offices").send({
            coworking_id: 1,
            name: "Name Test",
            officestype_id: 1
        });

        const newOfficeId = newOffice.body.id;
        const response = await request(app).delete(`/offices/${newOfficeId}`);

        expect(response.body.message).toBe("Success");
    })
});
