export const retrieveAll = (app, db) => {
    /**
     * Retrieve all
     * GET /coworkings
     */
    app.get('/coworkings', async (req, res) => {
        try {
            const coworking = await db
                .select("*")
                .table("coworkings")

            res.json(coworking);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });

}
