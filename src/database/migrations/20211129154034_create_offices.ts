import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
        CREATE TABLE offices (
            id int(11) NOT NULL AUTO_INCREMENT,
            name varchar(100) NOT NULL,
            type varchar(100) NOT NULL,
            coworking_id int(11) NOT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            deleted_at timestamp NULL DEFAULT NULL,
            PRIMARY KEY (id),
            UNIQUE KEY offices_id_uindex (id),
            KEY offices_coworkings_id_fk (coworking_id),
            CONSTRAINT offices_coworkings_id_fk FOREIGN KEY (coworking_id) REFERENCES coworkings (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `)
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        DROP TABLE IF EXISTS offices;
    `)
}
