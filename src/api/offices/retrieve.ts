export const retrieve = (app, db) => {
    /**
     * Retrieve single
     * GET /office/:id
     */
    app.get('/offices/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            // Retrieve office
            const office = await db
                .select("name", "type")
                .table("offices")
                .where({id})

            const officeResult = await office;

            res.json(officeResult[0]);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
