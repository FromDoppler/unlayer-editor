pipeline {
  agent any
  stages {
    stage('Verify git commit conventions') {
      steps {
        sh 'sh ./gitlint.sh'
      }
    }
    stage('Verify .sh files') {
      steps {
        sh 'docker build --target verify-sh .'
      }
    }
    stage('Restore') {
      steps {
        sh 'docker build --target restore .'
      }
    }
    stage('Verify Format') {
      steps {
        sh 'docker build --target verify-format .'
      }
    }
    stage('Test') {
      steps {
        sh 'docker build --target test .'
      }
    }
    stage('Build') {
      steps {
        sh 'docker build --target build .'
      }
    }
    stage('Publish in CDN') {
      stages {
        // TODO: Inject CDN SFTP credentials here
        stage('Publish pre-release images from pull request') {
          when {
            changeRequest target: 'main'
          }
          steps {
            sh 'sh ./build-n-publish.sh pr-${CHANGE_ID}_${BUILD_NUMBER}'
          }
        }
        stage('Publish pre-release images from main') {
          when {
            branch 'main'
          }
          steps {
            sh 'sh build-n-publish.sh main-${BUILD_NUMBER}'
          }
        }
        stage('Publish final version images') {
          when {
            expression {
              return isVersionTag(readCurrentTag())
            }
          }
          steps {
            sh 'sh build-n-publish.sh ${TAG_NAME}'
          }
        }
      }
    }
  }
}

def boolean isVersionTag(String tag) {
  echo "checking version tag $tag"

  if (tag == null) {
    return false
  }

  // use your preferred pattern
  def tagMatcher = tag =~ /v\d+\.\d+\.\d+/

  return tagMatcher.matches()
}

def CHANGE_ID = env.CHANGE_ID

// https://stackoverflow.com/questions/56030364/buildingtag-always-returns-false
// workaround https://issues.jenkins-ci.org/browse/JENKINS-55987
// TODO: read this value from Jenkins provided metadata
def String readCurrentTag() {
  return sh(returnStdout: true, script: 'echo ${TAG_NAME}').trim()
}
