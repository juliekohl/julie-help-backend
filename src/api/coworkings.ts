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
                res.json(result[0]);
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
                res.json(result[0]);
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
    // app.delete('/coworking/:id', (req, res) => {
    //     const id: number = Number(req.params.id);
    //
    //     database
    //         .delete()
    //         .table("coworkings")
    //         .where({id})
    //         .then(result => {
    //             res.json(result);
    //         })
    //         .catch(err => {
    //             res.json(err);
    //         });
    //
    // });
    app.delete('/coworking/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            // Select Coworker User
            let coworker = await database
                .select("user_id")
                .table("coworkers")
                .where({id})

            const coworkerResult = await coworker;
            const userCoworkerId: number = coworkerResult[0].user_id;

            // Select Coworker Cwk
            let cwkr = await database
                .select("coworking_id")
                .table("coworkers")
                .where({id})

            const coworkerResults = await cwkr;
            const cwkCoworkerId: number = coworkerResults[0].coworking_id;

            // Delete
            await database.delete().table("coworkers").where({id})
            await database.delete().table("users").where({id: userCoworkerId})
            await database.delete().table("users").where({id: cwkCoworkerId})
            await database.delete().table("coworkings").where({id})

            res.json({message: 'Success'});
        } catch (err) {
            res.json({message: err});
        }
    });
}

export default coworkings