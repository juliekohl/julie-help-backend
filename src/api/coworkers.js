const apiCoworkers = (app, database, crypto) => {
    /**
     * Retrieve all
     * GET /coworkers
     */
    app.get('/coworkers', async (req, res) => {
        try {
            const coworkerId = req.body.coworker_id;

            // Select Coworker
            let coworker = await database
                .select("coworking_id")
                .table("coworkers")
                .where({id: coworkerId});

            const coworkerResult = await coworker;
            const coworkingId = coworkerResult[0].coworking_id;

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
     * GET /coworker/:id
     */
    app.get('/coworker/:id', async (req, res) => {
        try {
            const id = req.params.id;

            // Select Coworker
            let coworker = await database
                .select("user_id")
                .table("coworkers")
                .where({id: id})

            const coworkerResult = await coworker;
            const userId = coworkerResult[0].user_id;

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
     * POST /coworker { coworking_id, user_id }
     */
    app.post('/coworker', async (req, res) => {
        try {
            let password = req.body.password;
            let hash = crypto.createHash('md5').update(password).digest('hex');

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
     * POST /coworker/:id { coworking_id, user_id }
     */
    app.post('/coworker/:id', async (req, res) => {
        try {
            const id = req.params.id;

            // Select Coworker
            let coworker = await database
                .select("user_id")
                .table("coworkers")
                .where({id: id})

            const coworkerResult = await coworker;
            const userId = coworkerResult[0].user_id;

            // Update User
            await database
                .update({
                    name: req.body.name,
                    password: req.body.password
                })
                .table("users")
                .where({id: userId})

            res.json({ message: 'Success' });
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });

    /**
     * Delete
     * DELETE /coworker/:id
     */
    app.delete('/coworker/:id', async (req, res) => {
        try {
            const id = req.params.id;

            // Select Coworker
            let coworker = await database
                .select("user_id")
                .table("coworkers")
                .where({id: id})

            const coworkerResult = await coworker;
            const userId = coworkerResult[0].user_id;

            // Delete User
            await database.delete().table("coworkers").where( {id: id})
            await database.delete().table("users").where( {id: userId})

            res.json({ message: 'Success' });
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}

module.exports = apiCoworkers;