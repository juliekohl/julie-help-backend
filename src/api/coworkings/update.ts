export const update = (app, db) => {
    /**
     * Update
     * POST /coworking/:id { name }
     */
    app.post('/coworking/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);
            const newData: object = req.body;

            await db
                .update(newData)
                .table("coworkings")
                .where({id})

            res.json({message: 'Success'});
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
