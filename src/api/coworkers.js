const apiCoworkers = (app, database) => {
    /**
     * Retrieve all
     * GET /coworkers
     */
    app.get('/coworkers', async (req, res) => {
        try {
            // Select Coworker
            let coworker = await database
                .select("user_id")
                .table("coworkers")

            const coworkerResult = await coworker;
            const userId = coworkerResult[0].user_id;

            // Retrieve User
            await database
                .select("name", "email")
                .table("users")
                .then(result => {
                    res.json(result);
                })
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });

    /**
     * Retrieve single
     * GET /coworker/:id
     */
    app.get('/coworker/:id', async (req, res) => {
        const id = req.params.id;

        try {
            // Select Coworker
            let coworker = await database
                .select("user_id")
                .table("coworkers")
                .where({id: id})

            const coworkerResult = await coworker;
            const userId = coworkerResult[0].user_id;

            // Retrieve User
            await database
                .select("name", "email")
                .table("users")
                .where({id: userId})
                .then(result => {
                    res.json(result);
                })
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
            // Create User
            let createUser = await database
                .insert({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
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
        const id = req.params.id;

        try {
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
        const id = req.params.id;

        try {
            // Select Coworker
            let coworker = await database
                .select("user_id")
                .table("coworkers")
                .where({id: id})

            const coworkerResult = await coworker;
            const userId = coworkerResult[0].user_id;

            // Delete User
            // await database.delete().table("coworkers").where( {id: id})
            //todo
            await database.delete().table("users").where( {id: userId})

            res.json({ message: 'Success deleted' });
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}

module.exports = apiCoworkers;