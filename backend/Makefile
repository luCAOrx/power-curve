include .env

.PHONY: up
up:
	docker-compose up -d

.PHONY: restart
restart:
	docker-compose restart

.PHONY: logs
logs:
	docker-compose logs -f logap-database

.PHONY: down
down:
	docker-compose down
