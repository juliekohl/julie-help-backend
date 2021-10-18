const apiTeams = (app, database) => {
    /**
     * Retrieve all
     * GET /teams
     */
    app.get('/teams', (req, res) => {
        database
            .select("*")
            .into("teams")
            .then(result => {
                res.json(result);
                console.log('Retrieve result', result);
            }).catch(err => {
            res.json(err);
        });
    });

    /**
     * Retrieve single
     * GET /team/:id
     */
    app.get('/team/:id', (req, res) => {
        const id = req.params.id;
        database
            .select("*")
            .table("teams")
            .where('id', id)
            .orderBy("id", "asc")
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.json(err);
            });
    });

    /**
     * Create
     * POST /team { id, name, email, password }
     */
    app.post('/team', (req, res) => {
        const team = req.body;
        console.log('team', team);
        database
            .insert(team)
            .into("teams")
            .then(result => {
                res.json(result);
                console.log('result', result);
            }).catch(err => {
            res.json(err);
            console.log('err', err);
        });
    });

    /**
     * Update
     * POST /team/:id { name }
     */
    app.post('/team/:id', (req, res) => {
        const id = req.params.id;
        const newData = req.body;

        database
            .update(newData)
            .table("teams")
            .where({id: id})
            .then(result => {
                res.json(result);
            }).catch(err => {
            res.json(err);
        });
    });

    /**
     * Delete
     * DELETE /team/:id
     */
    app.delete('/team/:id', (req, res) => {
        const id = req.params.id;

        database
            .delete()
            .table("teams")
            .where({id: id})
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.json(err);
            });
    });
}

module.exports = apiTeams;