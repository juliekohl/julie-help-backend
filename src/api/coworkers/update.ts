import crypto from "crypto";

const update = (app, database) => {
    /**
     * Update
     * POST /coworkers/:id { coworking_id, user_id }
     */
    app.post('/coworkers/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            // Select Coworker
            let coworker = await database
                .select("user_id")
                .table("coworkers")
                .where({id})

            const coworkerResult = await coworker;
            const userId: number = coworkerResult[0].user_id;

            // Update User
            const update: { name?: string; password?: string } = {
                name: req.body.name
            };
            if(req.body.name) {
                update.name
            }
            if(req.body.password) {
                update.password = crypto
                    .createHash('md5')
                    .update(req.body.password)
                    .digest('hex');
            }

            await database
                .update(update)
                .table("users")
                .where({id: userId})

            res.json({ message: 'Success' });
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}

export default update
