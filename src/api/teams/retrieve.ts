export const retrieve = (app, db) => {
    /**
     * Retrieve single
     * GET /team/:id
     */
    app.get('/teams/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            // Select Team
            let team = await db
                .select("user_id")
                .table("teams")
                .where({id})

            const teamResult = await team;
            const userId: number = teamResult[0].user_id;

            // Retrieve User
            const user = await db
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
