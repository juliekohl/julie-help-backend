export const show = (app, db) => {
    /**
     * Retrieve single
     * GET /plan/:id
     */
    app.get('/plans/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            const response = await db
                .raw(`
                    SELECT
                        plans.name,
                        plans.value
                    FROM plans
                    WHERE plans.id = ?
                `, [id]);

            res.json(response[0][0]);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
