export const del = (app, db) => {
    /**
     * Delete
     * DELETE /coworkers/:id
     */
    app.delete('/coworkers/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            // Select Coworker
            let coworker = await db
                .select("user_id")
                .table("coworkers")
                .where({id})

            const coworkerResult = await coworker;
            const userId: number = coworkerResult[0].user_id;

            // Delete User
            await db.delete().table("coworkers").where({id})
            await db.delete().table("users").where({id: userId})

            res.json({ message: 'Success' });
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
