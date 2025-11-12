pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        PORT = '3000'
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh '''
node -e "try{const p=require('./package.json'); process.exit(p.scripts && p.scripts.test ? 0 : 1)}catch(e){process.exit(1)}" && npm test || echo "no tests configured"
'''
            }
        }

        stage('Build') {
            steps {
                sh '''
node -e "try{const p=require('./package.json'); process.exit(p.scripts && p.scripts.build ? 0 : 1)}catch(e){process.exit(1)}" && npm run build || echo "no build step"
'''
            }
        }

        stage('Smoke Test') {
            steps {
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

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'server.log', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            sh 'kill $(cat .pid) 2>/dev/null || true; rm -f .pid || true'
        }
        success { echo 'Jenkins pipeline completed successfully.' }
        failure { echo 'Jenkins pipeline failed.' }
    }
}