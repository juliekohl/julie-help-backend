const teams = (app, database, crypto) => {
    /**
     * Retrieve all
     * GET /teams
     */
    app.get('/teams', async (req, res) => {
        try {
            const teamId: number = Number(req.query.team_id);

            // Get coworking_id
            const team = await database
                .select("coworking_id")
                .table("teams")
                .where({id: teamId});

            const teamResult = await team;
            const coworkingId: number = teamResult[0].coworking_id;

            // Get teams of coworking_id
            const teams = await database
                .select("teams.id","name", "email")
                .table("teams")
                .where({coworking_id: coworkingId})
                .join("users", "teams.user_id", "=", "users.id")

            res.json(teams);
        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });

    /**
     * Retrieve single
     * GET /team/:id
     */
    app.get('/teams/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            // Select Team
            let team = await database
                .select("user_id")
                .table("teams")
                .where({id})

            const teamResult = await team;
            const userId: number = teamResult[0].user_id;

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
     * POST /team { coworking_id, user_id }
     */
    app.post('/teams', async (req, res) => {
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

            // Create team
            await database
                .insert({
                    coworking_id: req.body.coworking_id,
                    user_id: userId,
                })
                .into("teams");

            res.json({ message: 'Success' });
        } catch(err) {
            res.json({ message: err.sqlMessage });
        }
    });

    /**
     * Update
     * POST /team/:id { coworking_id, user_id }
     */
    app.post('/teams/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            // Select Team
            let team = await database
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
     * DELETE /team/:id
     */
    app.delete('/teams/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            // Select Team
            let team = await database
                .select("user_id")
                .table("teams")
                .where({id})

            const teamResult = await team;
            const userId: number = teamResult[0].user_id;

            // Delete
            await database.delete().table("teams").where({id})
            await database.delete().table("users").where({id: userId})

            res.json({ message: 'Success' });
        } catch (err) {
            res.json({ message: err });
        }
    });
}

module.exports = teams;