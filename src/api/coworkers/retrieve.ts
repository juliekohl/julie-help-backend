export const retrieve = (app, db) => {
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
                        plans.id AS plan_id, 
                        plans.name AS plan_name, 
                        plans.value
                    FROM coworkers
                    JOIN users on coworkers.user_id = users.id
                    JOIN coworkers_plans on coworkers.id = coworkers_plans.coworker_id
                    JOIN plans on plans.id = coworkers_plans.plan_id
                    WHERE coworkers.id = ?
                `, [id]);

            res.json(response[0]);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
