export const retrieveAll = (app, db) => {
    /**
     * Retrieve all
     * GET /coworkers
     */
    app.get('/coworkers', async (req, res) => {
        try {
            const coworkerId: number = Number(req.query.coworker_id);

            // Select Coworker
            let coworker = await db
                .select("coworking_id")
                .table("coworkers")
                .where({id: coworkerId});

            const coworkerResult = await coworker;
            const coworkingId: number = coworkerResult[0].coworking_id;

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

