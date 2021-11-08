const retrieveAll = (app, database) => {
    /**
     * Retrieve all
     * GET /coworkings
     */
    app.get('/coworkings', async (req, res) => {
        try {
            const coworking = await database
                .select("*")
                .table("coworkings")

            res.json(coworking);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });

}
export default retrieveAll;
