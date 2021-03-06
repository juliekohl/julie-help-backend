export const show = (app, db) => {
    /**
     * Retrieve single
     * GET /coworkers/:id
     */
    app.get('/coworkers/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            const response = await db
                .raw(`
                    SELECT
                        users.name, 
                        users.email,
                        plans.id AS planId, 
                        plans.name AS planName, 
                        plans.value
                    FROM coworkers
                    JOIN users on coworkers.user_id = users.id
                    JOIN coworkers_plans on coworkers.id = coworkers_plans.coworker_id
                    JOIN plans on plans.id = coworkers_plans.plan_id
                    WHERE coworkers.id = ?
                `, [id]);

            res.json(response[0][0]);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
