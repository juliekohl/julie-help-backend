const retrieve = (app, database) => {
    /**
     * Retrieve single
     * GET /coworkers/:id
     */
    app.get('/coworkers/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            // Select Coworker
            let coworker = await database
                .select("user_id")
                .table("coworkers")
                .where({id})

            const coworkerResult = await coworker;
            const userId: number = coworkerResult[0].user_id;

            // Retrieve User
            const user = await database
                .select("name", "email")
                .table("users")
                .where({id: userId})

            const userResult = await user;
            res.json(userResult[0]);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}

export default retrieve;
