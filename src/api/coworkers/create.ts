import crypto from "crypto";

export const create = (app, db) => {
    /**
     * Create
     * POST /coworkers { coworking_id, user_id }
     */
    app.post('/coworkers', async (req, res) => {
        try {
            let password: string = req.body.password;
            let hash: string = crypto.createHash('md5').update(password).digest('hex');

            // Create User
            let createUser = await db
                .insert({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                })
                .into("users");

            const userId = await createUser;

            // Create Coworker
            const createCoworker = await db
                .insert({
                    coworking_id: req.body.coworking_id,
                    user_id: userId,
                })
                .into("coworkers");

            const coworkerId = await createCoworker[0];

            res.json({
                message: 'Success',
                id: coworkerId
            });
        } catch(err) {
            res.json({ message: err.sqlMessage });
        }
    });
}

