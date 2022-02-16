import request from 'supertest';
import app from 'app';
import faker from 'faker';

describe("Plans", () => {
    it("should show all", async () => {
        const response = await request(app).get("/plans");

        expect(response.statusCode).toBe(200);
    })

    it("should show single", async () => {
        const response = await request(app).get("/plans/1");

        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("value");
        expect(response.body).not.toHaveProperty("message");
    })

    it("should show a single with coworkers", async () => {
        const response = await request(app).get("/plans/5");

        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("value");
        expect(response.body).not.toHaveProperty("message");
    })

    it("should create", async () => {
        const newOffice = await request(app).post("/offices").send({
            coworking_id: 1,
            name: "Name Test",
            officestype_id: 1
        });

        const newOfficeId = newOffice.body.id;
        const response = await request(app).post("/plans").send({
            office_id: newOfficeId,
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
        const newOffice = await request(app).post("/offices").send({
            coworking_id: 1,
            name: "Name Test",
            officestype_id: 1
        });

        const newOfficeId = newOffice.body.id;
        const newPlan = await request(app).post("/plans").send({
            office_id: newOfficeId,
            name: "Name Test",
            value: faker.datatype.number()
        });

        const newPlanId = newPlan.body.id;
        const response = await request(app).delete(`/plans/${newPlanId}`);

        expect(response.body.message).toBe("Success");
    })
});
