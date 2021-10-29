const coworkers = (app, database, crypto) => {
    /**
     * Retrieve all
     * GET /coworkers
     */
    app.get('/coworkers', async (req, res) => {
        try {
            const coworkerId: number = Number(req.query.coworker_id);

            // Select Coworker
            let coworker = await database
                .select("coworking_id")
                .table("coworkers")
                .where({id: coworkerId});

            const coworkerResult = await coworker;
            const coworkingId: number = coworkerResult[0].coworking_id;

            // Retrieve Coworker of coworking_id
            const coworkers = await database
                .select("coworkers.id", "name", "email")
                .table("coworkers")
                .where({coworking_id: coworkingId})
                .join("users", "coworkers.user_id", "=", "users.id")

            res.json(coworkers);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });

    /**
     * Retrieve single
     * GET /coworkers/:id
     */
    app.get('/coworkers/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            // Select Coworker
            let coworker = await database
                .select("user_id")
                .table("coworkers")
                .where({id})

            const coworkerResult = await coworker;
            const userId: number = coworkerResult[0].user_id;

            // Retrieve User
           const user = await database
                .select("name", "email")
                .table("users")
                .where({id: userId})

            const userResult = await user;
            res.json(userResult[0]);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });

    /**
     * Create
     * POST /coworkers { coworking_id, user_id }
     */
    app.post('/coworkers', async (req, res) => {
        try {
            let password: string = req.body.password;
            let hash: string = crypto.createHash('md5').update(password).digest('hex');

            // Create User
            let createUser = await database
                .insert({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                })
                .into("users");

            const userId = await createUser;

            // Create Coworker
            await database
                .insert({
                    coworking_id: req.body.coworking_id,
                    user_id: userId,
                })
                .into("coworkers");

            res.json({ message: 'Success' });
        } catch(err) {
            res.json({ message: err.sqlMessage });
        }
    });

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

    /**
     * Delete
     * DELETE /coworkers/:id
     */
    app.delete('/coworkers/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            // Select Coworker
            let coworker = await database
                .select("user_id")
                .table("coworkers")
                .where({id})

            const coworkerResult = await coworker;
            const userId: number = coworkerResult[0].user_id;

            // Delete User
            await database.delete().table("coworkers").where({id})
            await database.delete().table("users").where({id: userId})

            res.json({ message: 'Success' });
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}

module.exports = coworkers;