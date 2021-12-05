import request from 'supertest';
import app from 'app';
import faker from 'faker';

describe("Plans", () => {
    it("should retrieve all", async () => {
        const response = await request(app).get("/plans");

        expect(response.statusCode).toBe(200);
    })

    it("should retrieve single", async () => {
        const response = await request(app).get("/plans/1");

        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("value");
        expect(response.body).not.toHaveProperty("message");
    })

    it("should retrieve a single with coworkers", async () => {
        const response = await request(app).get("/plans/5");
        console.log(response.body);
    })

    it("should create", async () => {
        const response = await request(app).post("/plans").send({
            office_id: 1,
            name: "Name Test",
            value: 100
        });

        expect(response.body.message).toBe("Success");
    })

    it("should update", async () => {
        const response = await request(app).post("/plans/1").send({
            name: "Name Update",
            value: "Update Value"
        });

        expect(response.body.message).toBe("Success");
    })

    it("should delete", async () => {
        const newPlan = await request(app).post("/plans").send({
            office_id: 1,
            name: "Name Test",
            value: faker.datatype.number()
        });

        const newPlanId = newPlan.body.id;
        const response = await request(app).delete(`/plans/${newPlanId}`);

        expect(response.body.message).toBe("Success");
    })
});
