export const showAll= (app, db) => {
    /**
     * Retrieve all
     * GET /teams
     */
    app.get('/teams', async (req, res) => {
        try {
            const teamId: number = Number(req.query.team_id);

            // Get coworking_id
            const team = await db
                .select("coworking_id")
                .table("teams")
                .where({id: teamId});

            const teamResult = await team;
            const coworkingId: number = teamResult[0].coworking_id;

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
