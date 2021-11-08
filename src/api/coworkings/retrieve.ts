export const retrieve = (app, db) => {
    /**
     * Retrieve single
     * GET /coworking/:id
     */
    app.get('/coworking/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            let coworking = await db
                .select("*")
                .table("coworkings")
                .where({id})
                .orderBy("name", "asc")

            res.json(coworking[0]);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
