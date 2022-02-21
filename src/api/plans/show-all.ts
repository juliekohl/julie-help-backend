export const showAll= (app, db) => {
    /**
     * Retrieve all
     * GET /plans
     */
    app.get('/plans', async (req, res) => {
       try {
           const coworkingId: number = Number(req.query.coworking_id);

           // Get plans of office_id
           const plans = await db
               .select("plans.id", "plans.name", "value")
               .table("plans")
               .join("offices", "plans.office_id", "=", "offices.id")
               .where({coworking_id: coworkingId});

           res.json(plans);
       } catch (err) {
           res.json({ message: err.sqlMessage });
       }
    });
}
