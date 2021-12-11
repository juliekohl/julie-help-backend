export const update = (app, db) => {
    /**
     * Update
     * POST /offices/:id { name }
     */
    app.post('/offices/:id', async (req, res) => {
       try {
           const id: number = Number(req.params.id);
           const newData: { name?: string; officestype_id?: number } = {
               name: req.body.name
           };

           if (req.body.officestype_id){
               newData.officestype_id = req.body.officestype_id;
           }

           await db
               .update(newData)
               .table("offices")
               .where({id})

           res.json({ message: 'Success' });
       } catch (err) {
           res.json({ message: err.sqlMessage });
       }
    });
}
