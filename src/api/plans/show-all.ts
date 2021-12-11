export const showAll= (app, db) => {
    /**
     * Retrieve all
     * GET /plans
     */
    app.get('/plans', async (req, res) => {
       try {
           const planId: number = Number(req.query.plan_id);

           // Get office_id
           const plan = await db
               .select("office_id")
               .table("plans")
               .where({id: planId});

           const planResult = await plan;
           const officeId: number = planResult[0].office_id;

           // Get plans of office_id
           const plans = await db
               .select("plans.id", "name", "value")
               .table("plans")
               .where({office_id: officeId});

           res.json(plans);
       } catch (err) {
           res.json({ message: err.sqlMessage });
       }
    });
}
