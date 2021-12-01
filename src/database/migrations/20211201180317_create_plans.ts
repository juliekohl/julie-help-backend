import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
        CREATE TABLE plans (
            id int(11) NOT NULL AUTO_INCREMENT,
            office_id int(11) NOT NULL,
            name varchar(100) NOT NULL,
            value int(11) NOT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            deleted_at timestamp NULL DEFAULT NULL,
            PRIMARY KEY (id),
            UNIQUE KEY plans_id_uindex (id),
            KEY plans_offices_id_fk (office_id),
            CONSTRAINT plans_offices_id_fk FOREIGN KEY (office_id) REFERENCES offices (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `)
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        DROP TABLE IF EXISTS plans;
    `)
}
