#!/usr/bin/env groovy

pipeline {
    agent any

    options {
      skipStagesAfterUnstable()
      disableConcurrentBuilds()
      timestamps()
      buildDiscarder(logRotator(numToKeepStr: '15', artifactNumToKeepStr: '15'))
      ansiColor('xterm')
    }

    parameters {
      string(name: 'APP_NAME', defaultValue: 'soby-webapp', description: 'Define app name')
      string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Define branch name')
      choice(name: 'DEPLOY_ENV', choices: ['dev', 'test', 'prod'], description: 'Define environment name')
    }

    environment {
        GIT_URL            = 'git@github.com:SOBY-JSC/soby-webapp.git'
        GIT_CREDS          = 'github-jenkins'
        AWS_S3_BUCKET      = "soby-${params.DEPLOY_ENV}-webapp"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout( [$class: 'GitSCM',
                    branches: [[name: "*/${params.BRANCH_NAME}"]],
                    userRemoteConfigs: [
                        [
                            credentialsId: "${GIT_CREDS}",
                            url: "${GIT_URL}"]
                        ]
                ])
            }
        }

        stage('STEP 0: Approve Deployment') {
            when {
                beforeAgent true
                expression { params.DEPLOY_ENV == 'prod' }
            }
            steps {
                timeout(time:1, unit:'DAYS') {
                    input message:'Do you want to confirm the deployment?'
                }
                echo 'Continue'
            }
        }

        stage("STEP 1: Build webapp") {
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS'
              }
            }
            steps {
                    sh ("npx create-react-app ${params.APP_NAME}")
                    sh ("cd ${env.WORKSPACE}/${params.APP_NAME} && yarn build")
            }
        }

        stage("STEP 1: Deploy/Upload to AWS S3") {
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS'
              }
            }
            steps {
                    sh ("aws s3 sync ${env.WORKSPACE}/${params.APP_NAME}/build/ s3://${env.AWS_S3_BUCKET}")
            }
        }

        stage("STEP 2: Clear AWS CloudFront cache") {
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS'
              }
            }

            steps {
                    sh """
                    aws cloudfront create-invalidation --distribution-id E1LVHEUJ0L82ET --paths "/*"
                    """
            }
        }

    }
    post {
        always {
            cleanWs()
        }
    }
}
