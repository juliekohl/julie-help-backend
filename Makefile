#--------------------------------------------------------------------------
# Installation
#--------------------------------------------------------------------------
#
# Install the application and instantiate the MySQL server for local development.
#

#
# Creates MySQL DB in Docker
#
.PHONY: setup-docker
setup-docker:
	@echo "+ $@"
	@docker run --name julie-help --platform linux/x86_64 -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:5.7

#
# Install NPM dependencies
#
.PHONY: install
install:
	@echo "+ $@"
	@npm install

#
# Build DB
#
.PHONY: build-db
build-db:
	@echo "+ $@"
	@make rollback
	@make migrate
	@make seed

#
# Run Express server
#
.PHONY: run-server
run-server:
	@echo "+ $@"
	@npx ts-node src/server.ts

#--------------------------------------------------------------------------
# Migrations
#--------------------------------------------------------------------------
#
# Migrations files will update the database schema.
#

#
# Create migration file
# - Run on Terminal
# - Command example: make create-migration-file name=update_table
#
.PHONY: create-migration-file
create-migration-file:
	@echo "+ $@"
	@knex migrate:make $(name) -x ts --migrations-directory src/database/migrations

#
# Migrate
# - Updates the schema
#
.PHONY: migrate
migrate:
	@echo "+ $@"
	@knex migrate:latest --knexfile src/database/knexfile.ts

#
# Rollback
# - Reverts the schema
#
.PHONY: rollback
rollback:
	@echo "+ $@"
	@knex migrate:rollback --knexfile src/database/knexfile.ts

#--------------------------------------------------------------------------
# Seeding
#--------------------------------------------------------------------------
#

#
# Create seed file
# - Run on Terminal
# - Command example: make create-seed-file name=update_table
#
.PHONY: create-seed-file
create-seed-file:
	@echo "+ $@"
	@knex seed:make $(name) -x ts --knexfile src/database/knexfile.ts

#
# Seed
# - Populates the DB
#
.PHONY: seed
seed:
	@echo "+ $@"
	@knex seed:run --knexfile src/database/knexfile.ts
