import crypto from "crypto";

export const update = (app, db) => {
    /**
     * Update
     * POST /coworkers/:id { name, password, plan_id }
     */
    app.post('/coworkers/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);
            const plan_id: number = Number(req.body.plan_id);

            // Select Coworker
            let coworker = await db
                .select("user_id")
                .table("coworkers")
                .where({id})

            const coworkerResult = await coworker;
            const userId: number = coworkerResult[0].user_id;

            // Update User
            const updateUser: { name?: string; password?: string } = {};

            if (req.body.name) {
                updateUser.name = req.body.name;
            }

            if (req.body.password) {
                updateUser.password = crypto
                    .createHash('md5')
                    .update(req.body.password)
                    .digest('hex');
            }

            await db
                .update(updateUser)
                .table("users")
                .where({id: userId})

            // Update Coworkers Plans
            if (req.body.plan_id) {
                await db
                    .update({plan_id: plan_id})
                    .table("coworkers_plans")
                    .where({coworker_id: id})
            }

            res.json({ message: 'Success' });
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
