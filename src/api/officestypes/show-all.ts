export const showAll= (app, db) => {
    /**
     * Retrieve all
     * GET /officestypes
     */
    app.get('/officestypes', async (req, res) => {
        try {
            const officestypes = await db
                .select("id", "name")
                .table("officestypes");

            res.json(officestypes);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
