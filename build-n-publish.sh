#!/bin/sh

pkgName="unlayer-editor"
pkgVersion=${1:-"v0.0.0-build0"}
cdnBaseUrl=${2:-"https//cdn.fromdoppler.com"}

# Exit immediately if a command exits with a non-zero status.
set -e

# Lines added to get the script running in the script path shell context
# reference: http://www.ostricher.com/2014/10/the-right-way-to-get-the-directory-of-a-bash-script/
cd "$(dirname "$0")"

tag="${pkgName}-${pkgVersion}-$(date +%Y%m%d%H%M%S)"

docker build . \
  --build-arg baseUrl="${cdnBaseUrl}" \
  --build-arg pkgName="${pkgName}" \
  --build-arg version="${pkgVersion}" \
  --tag "${tag}"

docker run --rm \
  -v /var/lib/jenkins/.ssh:/root/.ssh:ro \
  "${tag}" \
  /bin/sh -c "\
    scp -P \"${CDN_SFTP_PORT}\" -r \"/source/${pkgName}\" \"${CDN_SFTP_USERNAME}@${CDN_SFTP_HOSTNAME}:/${CDN_SFTP_BASE}/\""

echo "Files ready in ${cdnBaseUrl}/${pkgName}/${pkgVersion}"
