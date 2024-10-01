pipeline {
    agent any
    environment {
        REGISTRY_URL="${REGISTRY_NAME}/${REGISTRY_REPO}"
        DOCKERHUB_CREDENTIALS = credentials('jk-dh-tk')
    }
    
    stages {        
        stage('Building Docker Image') {
            steps {
                sh 'docker build -t ${REGISTRY_URL}:${BUILD_NUMBER} .'
            }
        }
        
        stage('Push image to DockerHub') {
            steps {
                // script {
                //     docker.withRegistry('', DOCKERHUB_CREDENTIALS) {
                //         sh "docker push ${REGISTRY_URL}/${IMAGE_NAME}:${BUILD_NUMBER}"
                //     }
                // }   
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh "docker push ${REGISTRY_URL}:${BUILD_NUMBER}"
            }
        }
    }
}