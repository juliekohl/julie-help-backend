export const create = (app, db) => {
    /**
     * Create
     * POST /coworking { id, name }
     */
    app.post('/coworking', async (req, res) => {
        try {
            const coworking: object = req.body;

            const createCoworking = await db
                .insert(coworking)
                .into("coworkings")

            res.json({
                message: 'Success',
                id: createCoworking[0]
            });
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
