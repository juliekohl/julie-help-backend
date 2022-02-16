export const create = (app, db) => {
    /**
     * Create
     * POST /plans { id, name, value }
     */
    app.post('/plans', async (req, res) => {
        try {
            const plan: {
                office_id: number;
                name: string;
                value: number;
            } = req.body;

            const createPlan = await db
                .insert(plan)
                .into("plans");

            res.json({
                message: 'Success',
                id: createPlan[0]
            });
        } catch (err) {
            res.json({  message: err.sqlMessage })
        }
    });
}
