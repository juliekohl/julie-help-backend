export const showAll= (app, db) => {
    /**
     * Retrieve all
     * GET /offices
     */
    app.get('/offices', async (req, res) => {
        try {
            const coworkingId: number = Number(req.query.coworking_id);

            // Get offices of coworking_id
            const offices = await db
                .select("offices.id", "offices.name", "officestypes.name AS type")
                .table("offices")
                .where({coworking_id: coworkingId})
                .join("officestypes", "officestype_id", "officestypes.id")
                .orderBy("offices.id", "asc");

            res.json(offices);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
