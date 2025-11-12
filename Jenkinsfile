pipeline {
    agent { docker { image 'node:18' } }

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
                // run tests only if a test script exists in package.json
                sh '''
                node -e "try{const p=require('./package.json'); process.exit(p.scripts && p.scripts.test ? 0 : 1)}catch(e){process.exit(1)}" && npm test || echo "no tests configured"
                '''
            }
        }

        stage('Build') {
            steps {
                // run build if script exists
                sh '''
                node -e "try{const p=require('./package.json'); process.exit(p.scripts && p.scripts.build ? 0 : 1)}catch(e){process.exit(1)}" && npm run build || echo "no build step"
                '''
            }
        }

        stage('Smoke Test (start server and request /)') {
            steps {
                // start server in background, hit root endpoint, then stop server
                sh '''
                nohup npm start > server.log 2>&1 & echo $! > .pid
                sleep 2
                node -e "const http=require('http'); http.get('http://localhost:3000',(res)=>{res.setEncoding('utf8'); let b=''; res.on('data',d=>b+=d); res.on('end',()=>{console.log(b); process.exit(0)})}).on('error',e=>{console.error(e); process.exit(2)})"
                kill $(cat .pid) || true
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
        success { echo 'Jenkins pipeline completed successfully.' }
        failure { echo 'Jenkins pipeline failed.' }
    }
}
```// filepath: c:\Users\Dell\OneDrive\Desktop\nodejs\nodejs-application\Jenkinsfile
pipeline {
    agent { docker { image 'node:18' } }

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
                // run tests only if a test script exists in package.json
                sh '''
                node -e "try{const p=require('./package.json'); process.exit(p.scripts && p.scripts.test ? 0 : 1)}catch(e){process.exit(1)}" && npm test || echo "no tests configured"
                '''
            }
        }

        stage('Build') {
            steps {
                // run build if script exists
                sh '''
                node -e "try{const p=require('./package.json'); process.exit(p.scripts && p.scripts.build ? 0 : 1)}catch(e){process.exit(1)}" && npm run build || echo "no build step"
                '''
            }
        }

        stage('Smoke Test (start server and request /)') {
            steps {
                // start server in background, hit root endpoint, then stop server
                sh '''
                nohup npm start > server.log 2>&1 & echo $! > .pid
                sleep 2
                node -e "const http=require('http'); http.get('http://localhost:3000',(res)=>{res.setEncoding('utf8'); let b=''; res.on('data',d=>b+=d); res.on('end',()=>{console.log(b); process.exit(0)})}).on('error',e=>{console.error(e); process.exit(2)})"
                kill $(cat .pid) || true
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
        success { echo 'Jenkins pipeline completed successfully.' }
        failure { echo 'Jenkins pipeline failed.' }
    }
}