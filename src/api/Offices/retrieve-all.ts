export const retrieveAll = (app, db) => {
    /**
     * Retrieve all
     * GET /offices
     */
    app.get('/offices', async (req, res) => {
        try {
            const officeId: number = Number(req.query.office_id);

            // Get coworking_id
            const office = await db
                .select("coworking_id")
                .table("offices")
                .where({id: officeId});

            const officeResult = await office;
            const coworkingId: number = officeResult[0].coworking_id;

            // Get offices of coworking_id
            const offices = await db
                .select("offices.id", "name", "type")
                .table("offices")
                .where({coworking_id: coworkingId});

            res.json(offices);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }

    });
}
