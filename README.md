# ct
 Claim Tracker

DEVELOPMENT INSTALL
Copy .env for server
Copy .env.development for client
Copy credentials to ~/.aws

PRODUCTION SERVER DEPLOY
1. git remote add api dokku@claimtracker.ru:api
2. git push api
3. dokku domains:add api.claimtracker.ru
4. add A record to DNS service
5. dokku config:add DB_LINK=link_to_db etc...

PRODUCTION FRONTEND DEPLOY
1. git remote add frontend dokku@claimtracker.ru:frontend
2. Make .env with "API=http://api.claimtracker.ru" if not exist.
3. npm run build
4. make .static in public folder
4. git push frontend

SSH SERVER CONFIG
1. Backup /etc/ssh/sshd_config
2. Edit /etc/ssh/sshd_config
3. PubkeyAuthentication yes, ChallengeResponseAuthentication no, PasswordAuthentication no, UsePAM no

SSH ACCESS CONFIG
1. ssh-keygen -b 4096
2. cat ~/.ssh/id_rsa.pub | ssh pavel@claimtracker.ru "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
3. dokku ssh-keys:add KEY_NAME path/to/id_rsa.pub

SERVER INSTALL
1. Install dokku
2. dokku config:set api AWS_ACCESS_KEY_ID=XXX AWS_SECRET_ACCESS_KEY=XXX

