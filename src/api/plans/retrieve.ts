export const retrieve = (app, db) => {
    /**
     * Retrieve single
     * GET /plan/:id
     */
    app.get('/plans/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            // Retrieve Plan
            const plan = await db
                .select("name", "value")
                .table("plans")
                .where({id});

            const planResult = await plan;

            res.json(planResult[0]);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
