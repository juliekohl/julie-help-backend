export const del = (app, db) => {
    /**
     * Delete
     * DELETE /plans/:id
     */
    app.delete('/plans/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            await db
                .delete()
                .table("plans")
                .where({id});

            await db
                .delete()
                .table("coworkers_plans")
                .where({plan_id: id});

            res.json({ message: 'Success' });
        } catch (err) {
            res.json({ message: err });
        }
    });
}
