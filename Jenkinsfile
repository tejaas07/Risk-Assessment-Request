pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                // This checks out your entire repository, including
                // docker-compose.yml, be-rar, and fe-rar
                checkout scm
            }
        }
        
        stage('Build Backend Image') {
            steps {
                echo 'Building the rar-backend service...'
                
                // This command runs from the root of the workspace,
                // where docker-compose.yml is located.
                // It finds the 'rar-backend' service and follows
                // its 'build: ./be-rar' instruction.
                sh 'docker compose build rar-backend'
                
                echo 'Backend image (rar-be:latest) built successfully!'
            }
        }
    }
}