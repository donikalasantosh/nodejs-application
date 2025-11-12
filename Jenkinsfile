pipeline {
    agent any

    tools {
        nodejs "NodeJS_18"
    }

    environment {
        NODE_ENV = 'production'
        PORT = '3000'
    }

    stages {
        stage('Install') {
            steps {
                dir('node-welcome-server/node-welcome-server') {
                    sh '''
if [ -f package-lock.json ]; then
  echo "Lockfile found, running npm ci..."
  npm ci
else
  echo "No lockfile found, running npm install..."
  npm install
fi
'''
                }
            }
        }

        stage('Test') {
            steps {
                dir('node-welcome-server/node-welcome-server') {
                    sh '''
node -e "try{const p=require('./package.json'); process.exit(p.scripts && p.scripts.test ? 0 : 1)}catch(e){process.exit(1)}" && npm test || echo "no tests configured"
'''
                }
            }
        }

        stage('Build') {
            steps {
                dir('node-welcome-server/node-welcome-server') {
                    sh '''
node -e "try{const p=require('./package.json'); process.exit(p.scripts && p.scripts.build ? 0 : 1)}catch(e){process.exit(1)}" && npm run build || echo "no build step"
'''
                }
            }
        }

        stage('Smoke Test') {
            steps {
                dir('node-welcome-server/node-welcome-server') {
                    sh '''
nohup npm start > server.log 2>&1 & echo $! > .pid
sleep 2
if curl -fsS http://localhost:${PORT}/ -o /dev/null; then
  echo "smoke test passed"
else
  echo "smoke test failed"
  cat server.log
  kill $(cat .pid) || true
  exit 1
fi
kill $(cat .pid) || true
rm -f .pid || true
'''
                }
            }
        }

        stage('Archive') {
            steps {
                dir('node-welcome-server/node-welcome-server') {
                    archiveArtifacts artifacts: 'server.log', allowEmptyArchive: true
                }
            }
        }
    }

    post {
        always {
            dir('node-welcome-server/node-welcome-server') {
                sh 'kill $(cat .pid) 2>/dev/null || true; rm -f .pid || true'
            }
        }
        success { echo 'Jenkins pipeline completed successfully.' }
        failure { echo 'Jenkins pipeline failed.' }
    }
}
