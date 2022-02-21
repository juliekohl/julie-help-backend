export const chart = (app, db) => {
    /**
     * Chart
     * GET /coworkers/chart { coworking_id }
     */
    app.get('/coworkers/chart/:id', async (req, res) => {
        try {
            const coworking_id: number = Number(req.params.id);
            let dates = [];
            let amounts = [];

            const response = await db
                .raw(`
                    SELECT DATE(created_at) AS date,
                           COUNT(*) AS amount
                    FROM coworkers
                    WHERE coworking_id = ?
                    GROUP BY DATE(created_at)
                    ORDER BY date
                `, [coworking_id]);

            await response[0].map(function(item) {
                dates.push(item.date.toISOString().slice(0,10));
                amounts.push(item.amount);
            });

            res.json({
                message: 'Success',
                dates,
                amounts
            });
        } catch(err) {
            res.json({ message: err.sqlMessage });
        }
    });
}

