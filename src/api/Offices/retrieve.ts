export const retrieve = (app, db) => {
    /**
     * Retrieve single
     * GET /office/:id
     */
    app.get('/offices/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            // Select Coworking id
            let coworking = await db
                .select("coworking_id")
                .table("offices")
                .where({id})

            const coworkingResult = await coworking;
            const coworkingId: number = coworkingResult[0].coworking_id;

            // Retrieve office
            const office = await db
                .select("name", "type")
                .table("offices")
                .where({id: coworkingId})

            const officeResult = await office;

            res.json(officeResult[0]);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
