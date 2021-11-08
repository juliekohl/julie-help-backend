const del = (app, database) => {
    /**
     * Delete
     * DELETE /coworking/:id
     */

    app.delete('/coworking/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            /**
             * Delete coworkers
             */

            await database.delete().table("coworkers").where({
                coworking_id: id
            })

            /**
             * Delete coworkers users
             */

            let coworkers = await database
                .select("user_id")
                .table("coworkers")
                .where({coworking_id: id})

            const coworkersResult = await coworkers;

            for (const i in coworkersResult) {
                await database.delete().table("users").where({
                    id: coworkersResult[i].user_id
                })
            }

            /**
             * Delete teams
             */

            await database.delete().table("teams").where({
                coworking_id: id
            })

            /**
             * Delete teams users
             */

            let teams = await database
                .select("user_id")
                .table("teams")
                .where({coworking_id: id})

            const teamsResult = await teams;

            for (const i in teamsResult) {
                await database.delete().table("users").where({
                    id: teamsResult[i].user_id
                })
            }

            /**
             * Delete coworking
             */

            await database.delete().table("coworkings").where({id})

            res.json({message: 'Success'});
        } catch (err) {
            res.json({message: err});
        }
    });
}
export default del;
