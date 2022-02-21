export const showAll= (app, db) => {
    /**
     * Retrieve all
     * GET /coworkers
     */
    app.get('/coworkers', async (req, res) => {
        try {
            const coworkingId: number = Number(req.query.coworking_id);

            // Retrieve Coworker of coworking_id
            const coworkers = await db
                .select("coworkers.id", "name", "email")
                .table("coworkers")
                .where({coworking_id: coworkingId})
                .join("users", "coworkers.user_id", "=", "users.id")

            res.json(coworkers);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
