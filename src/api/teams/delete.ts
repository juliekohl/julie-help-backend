import teams from "./teams";

const del = (app, db) => {
    /**
     * Delete
     * DELETE /team/:id
     */
    app.delete('/teams/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            // Select Team
            let team = await db
                .select("user_id")
                .table("teams")
                .where({id})

            const teamResult = await team;
            const userId: number = teamResult[0].user_id;

            // Delete
            await db.delete().table("teams").where({id})
            await db.delete().table("users").where({id: userId})

            res.json({ message: 'Success' });
        } catch (err) {
            res.json({ message: err });
        }
    });
}
export default del;
