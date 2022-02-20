import crypto from "crypto";

export const login = (app, db) => {
    /**
     * Login
     * POST /login { email, password }
     */
    app.post('/login', async (req, res) => {
        try {
            const email: string = String(req.body.email);
            let hash: string = crypto
                .createHash('md5')
                .update(req.body.password)
                .digest('hex');

            // Select User
            let user = await db
                .select("*")
                .table("users")
                .where({
                    email,
                    password: hash
                })

            const userResult = await user;

            if (!userResult[0]) {
                res.json({ message: 'False' });
                return;
            }

            res.json({
                message: 'Success',
                id: userResult[0].id,
                name: userResult[0].name
            });

        } catch (err) {
            res.json({ message: err.sqlMessage });
        }
    });
}
