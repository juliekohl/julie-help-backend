#--------------------------------------------------------------------------
# Installation
#--------------------------------------------------------------------------
#
# Install the application and instantiate the MySQL server for local development.
#

.PHONY: setup-docker
setup-docker:
	@echo "+ $@"
	@docker run --name julie-help --platform linux/x86_64 -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:5.7

.PHONY: run-server
run-server:
	@echo "+ $@"
	@npx ts-node main.ts

#--------------------------------------------------------------------------
# Create migration file
#--------------------------------------------------------------------------
#
# Migrations files will update the database schema.
# Command example: make create-migration-file name=update_table
#

.PHONY: create-migration-file
create-migration-file:
	@echo "+ $@"
	@npx knex migrate:make $(name) -x ts --migrations-directory src/database/migrations

.PHONY: migrate
migrate:
	@echo "+ $@"
	@knex migrate:latest --knexfile src/database/knexfile.ts

.PHONY: rollback
rollback:
	@echo "+ $@"
	@knex migrate:rollback --knexfile src/database/knexfile.ts
