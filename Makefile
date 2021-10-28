.PHONY: setup-docker
setup-docker:
	@echo "+ $@"
	@docker run --name julie-help --platform linux/x86_64 -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:5.7

.PHONY: run-server
run-server:
	@echo "+ $@"
	@npx ts-node main.ts

