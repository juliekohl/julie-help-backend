APP_PORT="3000"
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_USER="root"
DB_PASSWORD="root"
DB_NAME="julie-help"

SET_APP_PORT = 'APP_PORT=${APP_PORT}'
SET_DB_HOST = 'DB_HOST=${DB_HOST}'
SET_DB_PORT = 'DB_PORT=${DB_PORT}'
SET_DB_USER = 'DB_USER=${DB_USER}'
SET_DB_PASSWORD = 'DB_PASSWORD=${DB_PASSWORD}'
SET_DB_NAME = 'DB_NAME=${DB_NAME}'

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
# Create .env
#

.PHONY: create-dotenv
create-dotenv:
	@echo "+ $@"
	@ > .env; \
		( echo $(SET_APP_PORT); \
		  echo $(SET_DB_HOST); \
		  echo $(SET_DB_PORT); \
		  echo $(SET_DB_USER); \
		  echo $(SET_DB_PASSWORD); \
		  echo $(SET_DB_NAME); \
		) >> .env

#
# Run Express server
#
.PHONY: run-server
run-server:
	@echo "+ $@"
	@APP_PORT=${APP_PORT} DB_HOST=${DB_HOST} DB_PORT=${DB_PORT} DB_USER=${DB_USER} DB_PASSWORD=${DB_PASSWORD} DB_NAME=${DB_NAME} npx ts-node src/server.ts

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
	@knex migrate:latest --knexfile knexfile.ts

#
# Rollback
# - Reverts the schema
#
.PHONY: rollback
rollback:
	@echo "+ $@"
	@knex migrate:rollback --knexfile knexfile.ts

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
	@knex seed:make $(name) -x ts --knexfile knexfile.ts

#
# Seed
# - Populates the DB
#
.PHONY: seed
seed:
	@echo "+ $@"
	@knex seed:run --knexfile knexfile.ts

#
# Test
# - Run all test files
#
.PHONY: run-tests
run-tests:
	@echo "+ $@"
	@jest
