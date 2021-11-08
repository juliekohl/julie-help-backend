const del = (app, database) => {
    /**
     * Delete
     * DELETE /coworkers/:id
     */
    app.delete('/coworkers/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            // Select Coworker
            let coworker = await database
                .select("user_id")
                .table("coworkers")
                .where({id})

            const coworkerResult = await coworker;
            const userId: number = coworkerResult[0].user_id;

            // Delete User
            await database.delete().table("coworkers").where({id})
            await database.delete().table("users").where({id: userId})

            res.json({ message: 'Success' });
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}

export default del;

