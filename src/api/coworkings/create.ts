const create = (app, database) => {
    /**
     * Create
     * POST /coworking { id, name }
     */
    app.post('/coworking', async (req, res) => {
        try {
            const coworking: object = req.body;

            await database
                .insert(coworking)
                .into("coworkings")

            res.json({ message: 'Success' });
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
export default create;
