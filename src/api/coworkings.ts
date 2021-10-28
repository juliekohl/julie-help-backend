const coworkings = (app, database) => {
    /**
     * Retrieve all
     * GET /coworkings
     */
    app.get('/coworkings', (req, res) => {
        database
            .select("*")
            .into("coworkings")
            .then(result => {
                res.json(result);
            }).catch(err => {
            res.json(err);
        });
    });

    /**
     * Retrieve single
     * GET /coworking/:id
     */
    app.get('/coworking/:id', (req, res) => {
        const id = req.params.id;
        database
            .select("*")
            .table("coworkings")
            .where('id', id)
            .orderBy("name", "asc")
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.json(err);
            });
    });

    /**
     * Create
     * POST /coworking { id, name }
     */
    app.post('/coworking', (req, res) => {
        const coworking = req.body;
        database
            .insert(coworking)
            .into("coworkings")
            .then(result => {
                res.json(result);
            }).catch(err => {
            res.json(err);
        });
    });

    /**
     * Update
     * POST /coworking/:id { name }
     */
    app.post('/coworking/:id', (req, res) => {
        const id = req.params.id;
        const newData = req.body;

        database
            .update(newData)
            .table("coworkings")
            .where({id: id})
            .then(result => {
                res.json(result);
            }).catch(err => {
            res.json(err);
        });
    });

    /**
     * Delete
     * DELETE /coworking/:id
     */
    app.delete('/coworking/:id', (req, res) => {
        const id = req.params.id;

        database
            .delete()
            .table("coworkings")
            .where({id: id})
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.json(err);
            });
    });
}

module.exports = coworkings;