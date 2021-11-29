export const del = (app, db) => {
    /**
     * Delete
     * DELETE /offices/:id
     */
    app.delete('/offices/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            // Delete
            await db.delete().table("offices").where({id})

            res.json({ message: 'Success' });
        } catch (err) {
            res.json({ message: err });
        }
    });
}
