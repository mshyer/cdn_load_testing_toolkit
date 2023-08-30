**README**
**ABOUT**
The small_sfs repo contains thousands of small files for use with load testing the CDN and CDN monitoring.

It also contains an express backend that serves static files.

**INSTALLATION NOTES**
This static file server is designed to be installed on a VPS behind a CDN. That VPS must be configured with the correct DNS information and Web Server / reverse proxy (such as nginx)

**GIT LARGE FILE STORAGE**
The repo uses Git Large File Storage to store the image and movie assets.

**EXPRESS BACKEND**
1. `npm install`
2. `npm start`

**USAGE NOTES**
Express server listens on port 4501 by default
After running `npm start`, the server will listen for incoming requests. 

Small SFS is designed to work with Request Monster. Configure and run Request Monster on your local development environment, and it will issue requests to the remote server that hosts small_sfs.
