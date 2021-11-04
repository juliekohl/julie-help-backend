import { Knex } from "knex";
import faker from 'faker';
import crypto from 'crypto';
import {knexTruncate} from "../../shared/knex-truncate";

export async function seed(knex: Knex): Promise<void> {
    const rows = [];
    const rowsTotal = 200;
    const password = crypto
        .createHash('md5')
        .update('secret')
        .digest('hex');

    await knexTruncate(knex, "users");

    for (let i = 1; i <= rowsTotal; i++) {
        rows.push({
            name: faker.name.findName(),
            email: faker.internet.email(),
            password
        });
    }

    await knex('users').insert(rows);
}
