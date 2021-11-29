export const del = (app, db) => {
    /**
     * Delete
     * DELETE /offices/:id
     */
    app.delete('/offices/:id', async (req, res) => {
        try {
            const id: number = Number(req.params.id);

            // Select office
            let office = await db
                .select("coworking_id")
                .table("offices")
                .where({id})

            const officeResult = await office;
            const coworkingId: number = officeResult[0].coworking_id;

            // Delete
            await db.delete().table("offices").where({id})
            await db.delete().table("coworkings").where({id: coworkingId})

            res.json({ message: 'Success' });
        } catch (err) {
            res.json({ message: err });
        }
    });
}
