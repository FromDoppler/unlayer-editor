#!/bin/sh

# constants
pkgName="unlayer-editor"
cdnBaseUrl="https://cdn.fromdoppler.com"

# parameters
name=""
version=""

print_help () {
    echo ""
    echo "Usage: sh build-n-publish.sh [OPTIONS]"
    echo ""
    echo "Use Docker to build project's bundle files and publish them to our CDN"
    echo ""
    echo "Options:"
    echo "  -n, --name, version name"
    echo "  -v, --version, version number"
    echo "  -h, --help"
    echo "Only one of name or version parameters is required, and cannot be included together."
    echo
    echo "Examples:"
    echo "  sh build-n-publish.sh --version=v1.2.11"
    echo "  sh build-n-publish.sh -v=v1.2.11"
    echo "  sh build-n-publish.sh --name=main"
}

for i in "$@" ; do
case $i in
    -n=*|--name=*)
    name="${i#*=}"
    ;;
    -v=*|--version=*)
    version="${i#*=}"
    ;;
    -h|--help)
    print_help
    exit 0
    ;;
esac
done


if [ -n "${version}" ] && [ -n "${name}" ]
then
  echo "Error: name and version parameters cannot be included together"
  print_help
  exit 1
fi

if [ -z "${version}" ] && [ -z "${name}" ]
then
  echo "Error: one of name or version parameters is required"
  print_help
  exit 1
fi

# Stop script on NZEC
set -e
# Stop script if unbound variable found (use ${var:-} if intentional)
set -u

# Lines added to get the script running in the script path shell context
# reference: http://www.ostricher.com/2014/10/the-right-way-to-get-the-directory-of-a-bash-script/
cd "$(dirname "$0")"

# To avoid issues with MINGW and Git Bash, see:
# https://github.com/docker/toolbox/issues/673
# https://gist.github.com/borekb/cb1536a3685ca6fc0ad9a028e6a959e3
export MSYS_NO_PATHCONV=1
export MSYS2_ARG_CONV_EXCL="*"

# TODO: parse version or name into components
if [ -n "${version}" ]
then
  tag="${pkgName}-${version}-$(date +%Y%m%d%H%M%S)"
fi

if [ -n "${name}" ]
then
  tag="${pkgName}-${name}-$(date +%Y%m%d%H%M%S)"
fi

docker build . \
  --build-arg baseUrl="${cdnBaseUrl}" \
  --build-arg pkgName="${pkgName}" \
  --build-arg version="${version}" \
  --tag "${tag}"

docker run --rm \
  -v /var/lib/jenkins/.ssh:/root/.ssh:ro \
  "${tag}" \
  /bin/sh -c "\
    scp -P \"${CDN_SFTP_PORT}\" -r \"/source/${pkgName}\" \"${CDN_SFTP_USERNAME}@${CDN_SFTP_HOSTNAME}:/${CDN_SFTP_BASE}/\""

echo "Files ready in ${cdnBaseUrl}/${pkgName}/${version}"
