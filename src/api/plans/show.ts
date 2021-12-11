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
                        plans.value,
                        coworkers.id,
                        users.name
                    FROM plans
                    JOIN coworkers_plans on plans.id = coworkers_plans.plan_id
                    JOIN coworkers on coworkers.id = coworkers_plans.coworker_id
                    JOIN users on users.id = coworkers.user_id
                    WHERE plans.id = ?
                `, [id]);

            res.json(response[0]);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
