import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
        CREATE TABLE teams (
            id int(11) NOT NULL AUTO_INCREMENT,
            coworking_id int(11) NOT NULL,
            user_id int(11) NOT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            deleted_at timestamp NULL DEFAULT NULL,
            PRIMARY KEY (id),
            UNIQUE KEY teams_id_uindex (id),
            KEY teams_coworkings_id_fk (coworking_id),
            KEY teams_users_id_fk (user_id),
            CONSTRAINT teams_coworkings_id_fk FOREIGN KEY (coworking_id) REFERENCES coworkings (id),
            CONSTRAINT teams_users_id_fk FOREIGN KEY (user_id) REFERENCES users (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `)
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        DROP TABLE IF EXISTS teams;
    `)
}