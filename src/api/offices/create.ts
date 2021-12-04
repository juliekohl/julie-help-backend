export const create = (app, db) => {
    /**
     * Create
     * POST /offices { id, name, type }
     */
    app.post('/offices', async (req, res) => {
        try {
            const office: {
                coworking_id: number;
                officestype_id: number
                name: string;
            } = req.body;

            const createOffice = await db
                .insert(office)
                .into("offices")

            res.json({
                message: 'Success',
                id: createOffice[0]
            });
        } catch (err) {
            res.json({  message: err.sqlMessage })
        }
    });
}
