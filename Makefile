pglog:
	sudo cp /var/lib/postgresql/14/main/log/*.log ./
	sudo chmod 644 ./postgresql-2025-07-11_021847.log
active:
	chmod +x ./scripts/liam.sh
	chmod +x ./scripts/exa.sh
	chmod +x ./scripts/tree.sh
tree:
	./scripts/tree.sh
join:
	node ./scripts/node/join-prisma-files.ts
gen:
	pnpm prisma generate
liamerd:
	./scripts/liamerd.sh
migrate:
	prisma migrate dev

