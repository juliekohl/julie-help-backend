import { Knex } from "knex";
import faker from 'faker';
import crypto from 'crypto';

export async function seed(knex: Knex): Promise<void> {
    const rows = [];
    const rowsTotal = 200;
    const password = crypto
        .createHash('md5')
        .update('secret')
        .digest('hex');

    await knex.raw('SET foreign_key_checks = 0');
    await knex("users").truncate();
    await knex.raw('SET foreign_key_checks = 1');

    for (let i = 1; i <= rowsTotal; i++) {
        rows.push({
            name: faker.name.findName(),
            email: faker.internet.email(),
            password
        });
    }

    await knex('users').insert(rows);
}
