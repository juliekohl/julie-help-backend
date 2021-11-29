export const update = (app, db) => {
    /**
     * Update
     * POST /offices/:id { name }
     */
    app.post('/offices/:id', async (req, res) => {
       try {
           const id: number = Number(req.params.id);
           const newData: { name?: string; type?: string } = {
               name: req.body.name
           };

           if (req.body.name){
               newData.name
           }

           if (req.body.type){
               newData.type
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
