def branchName = env.BRANCH_NAME.toLowerCase()
script {
    if (branchName.contains("/")) {
        branchName = branchName.split("/")[1]
    }
}
branchName = branchName.replace("-", "")

pipeline {
    options {
      buildDiscarder(logRotator(numToKeepStr: '3')) // Number of builds to keep
    }

    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Install') {
            steps {
                sh "npm install"
            }
        }

        stage('Build') {
            steps {
                sh "npm run build"
            }
        }

        stage('Docker Develop') {
                    when {
                        branch 'develop'
                    }
                    steps {
                        script {
                            def dockerfile = "Dockerfile"
                            def customImage = docker.build("covid-bouncer-develop", "-f ${dockerfile} .")
                            docker.withRegistry('https://covid-bouncer.artifactory.sybit.de', 'sybit_ausbildung_artifactory') {
                                                customImage.push("develop")
                                            }
                        }
                        echo "build image for develop"
                    }
                }
        }
    }
