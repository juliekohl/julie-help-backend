import crypto from 'crypto';

const update = (app, db) => {
    /**
     * Update
     * POST /team/:id { coworking_id, user_id }
     */
    app.post('/teams/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            // Select Team
            let team = await db
                .select("user_id")
                .table("teams")
                .where({id})

            const teamResult = await team;
            const userId: number = teamResult[0].user_id;

            // Update User
            const update: { name?: string; password?: string } = {
                name: req.body.name
            };

            if(req.body.name){
                update.name
            }

            if (req.body.password) {
                update.password = crypto
                    .createHash('md5')
                    .update(req.body.password)
                    .digest('hex');
            }

            await db
                .update(update)
                .table("users")
                .where({id: userId})

            res.json({ message: 'Success' });
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
export default update;
