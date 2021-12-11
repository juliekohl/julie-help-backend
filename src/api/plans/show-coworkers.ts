export const showCoworkers = (app, db) => {
    /**
     * Retrieve single
     * GET /plan/:id
     */
    app.get('/plans/coworkers/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            const response = await db
                .raw(`
                    SELECT
                        coworkers.id,
                        users.name,
                        users.email
                    FROM plans
                    JOIN coworkers_plans ON plans.id = coworkers_plans.plan_id
                    JOIN coworkers ON coworkers_plans.coworker_id = coworkers.id
                    JOIN users on coworkers.user_id = users.id
                    WHERE plans.id = ?
                `, [id]);

            res.json(response[0]);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
