const update = (app, database) => {
    /**
     * Update
     * POST /coworking/:id { name }
     */
    app.post('/coworking/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);
            const newData: object = req.body;

            await database
                .update(newData)
                .table("coworkings")
                .where({id})

            res.json({message: 'Success'});
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}

export default update;
