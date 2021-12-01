export const update = (app, db) => {
    /**
     * Update
     * POST /plans/:id { name, value }
     */
    app.post('/plans/:id', async (req, res) =>{
       try {
           const id: number = Number(req.params.id);
           const newData: { name?: string, value?: number } = {
               name: req.body.name
           };

           if (req.body.name){
               newData.name
           }

           if (req.body.value){
               newData.value
           }

           await db
               .update(newData)
               .table("plans")
               .where({id})

           res.json({ message: 'Success' });
       } catch (err) {
           res.json({ message: err.sqlMessage });
       }
    });
}
