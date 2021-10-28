const coworkings = (app, database): void => {
    /**
     * Retrieve all
     * GET /coworkings
     */
    app.get('/coworkings', (req, res): void => {
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
    app.get('/coworking/:id', (req, res): void => {
        const id: string = req.params.id;
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
    app.post('/coworking', (req, res): void => {
        const coworking: string = req.body;
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
    app.post('/coworking/:id', (req, res): void => {
        const id: string = req.params.id;
        const newData: string = req.body;

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
    app.delete('/coworking/:id', (req, res): void => {
        const id: string = req.params.id;

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