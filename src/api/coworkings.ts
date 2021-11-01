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
        const id: number = Number(req.params.id);

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
        const coworking: object = req.body;

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
        const id: number = Number(req.params.id);
        const newData: object = req.body;

        database
            .update(newData)
            .table("coworkings")
            .where({id})
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
        const id: number = Number(req.params.id);

        database
            .delete()
            .table("coworkings")
            .where({id})
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.json(err);
            });
    });
}

export function sum(a, b) {
    return a
}

module.exports = coworkings;