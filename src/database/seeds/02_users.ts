import { Knex } from "knex";
import faker from 'faker';
import crypto from 'crypto';
import { knexTruncate } from "../../api/shared/knex-truncate";
import { User } from "../../types/user.interface";

export async function seed(knex: Knex): Promise<void> {
    const rows: User[] = [];
    const rowsTotal: number = 200;
    const password: string = crypto
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
