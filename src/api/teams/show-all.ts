export const showAll= (app, db) => {
    /**
     * Retrieve all
     * GET /teams
     */
    app.get('/teams', async (req, res) => {
        try {
            const coworkingId: number = Number(req.query.coworking_id);

            // Get teams of coworking_id
            const teams = await db
                .select("teams.id","name", "email")
                .table("teams")
                .where({coworking_id: coworkingId})
                .join("users", "teams.user_id", "=", "users.id")

            res.json(teams);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
