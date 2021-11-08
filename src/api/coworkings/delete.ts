const del = (app, db) => {
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

            await db.delete().table("coworkers").where({
                coworking_id: id
            })

            /**
             * Delete coworkers users
             */

            let coworkers = await db
                .select("user_id")
                .table("coworkers")
                .where({coworking_id: id})

            const coworkersResult = await coworkers;

            for (const i in coworkersResult) {
                await db.delete().table("users").where({
                    id: coworkersResult[i].user_id
                })
            }

            /**
             * Delete teams
             */

            await db.delete().table("teams").where({
                coworking_id: id
            })

            /**
             * Delete teams users
             */

            let teams = await db
                .select("user_id")
                .table("teams")
                .where({coworking_id: id})

            const teamsResult = await teams;

            for (const i in teamsResult) {
                await db.delete().table("users").where({
                    id: teamsResult[i].user_id
                })
            }

            /**
             * Delete coworking
             */

            await db.delete().table("coworkings").where({id})

            res.json({message: 'Success'});
        } catch (err) {
            res.json({message: err});
        }
    });
}
export default del;
