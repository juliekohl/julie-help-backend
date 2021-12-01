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

            res.json({ message: 'Success' });
        } catch (err) {
            res.json({ message: err });
        }
    });
}
