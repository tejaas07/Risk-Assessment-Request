pipeline {
    agent any

    environment {
        REGISTRY = "ghcr.io/tejaas07"
        IMAGE = "be-rar"
        FULL_IMAGE = "${REGISTRY}/${IMAGE}"
        DEPLOY_SERVER = "ubuntu@144.24.122.50"
        DEPLOY_DIR = "/home/ubuntu"
        TAG = "new"
        CONTAINER_NAME = "rar-backend"
        PORT = "8085"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                sh """
                docker build -t ${FULL_IMAGE}:${TAG} -f be-rar/Dockerfile be-rar
                """
            }
        }

        stage('Docker Login (GHCR)') {
            steps {
                withCredentials([string(credentialsId: 'github-docker', variable: 'GITHUB_PAT')]) {
                    sh """
                    echo \$GITHUB_PAT | docker login ghcr.io -u tejaas07 --password-stdin
                    """
                }
            }
        }

        stage('Push to Registry') {
            steps {
                sh "docker push ${FULL_IMAGE}:${TAG}"
            }
        }

        stage("Deploy to Remote Server") {
            steps {
                withCredentials([string(credentialsId: 'github-docker', variable: 'GITHUB_PAT')]) {
                    sh """
                    ssh -o UserKnownHostsFile=/dev/null \
                        -o StrictHostKeyChecking=no \
                        -i /root/.ssh/id_rsa \
                        ${DEPLOY_SERVER} "
                            # Login to GHCR on remote server
                            echo ${GITHUB_PAT} | docker login ghcr.io -u tejaas07 --password-stdin

                            # Stop existing container if running
                            docker stop ${CONTAINER_NAME} || true
                            docker rm ${CONTAINER_NAME} || true

                            # Pull the latest image from GHCR
                            docker pull ${FULL_IMAGE}:${TAG}

                            # Run new container from pulled image
                            docker run -d \
                                --name ${CONTAINER_NAME} \
                                -p ${PORT}:${PORT} \
                                -e PORT=${PORT} \
                                ${FULL_IMAGE}:${TAG}
                        "
                    """
                }
            }
        }
    }
}