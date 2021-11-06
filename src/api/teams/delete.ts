import teams from "./teams";

const del = (app, database) => {
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
export default del