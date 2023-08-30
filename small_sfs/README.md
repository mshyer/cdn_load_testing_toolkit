**README**
**ABOUT**
The small_sfs repo contains hundreds of small files for use with load testing the CDN and CDN monitoring.

It also contains an express backend that serves static files.
This repo is pretty much useless without the "request_monster" repo. Please download that!

**INSTALLATION NOTES**
This static file server is designed to be installed on a VPS behind a CDN. That VPS must be configured with the correct DNS information and Web Server / reverse proxy (such as nginx)

**GIT LARGE FILE STORAGE**
The repo uses Git Large File Storage to store the image and movie assets. I think you should be able to clone it normally, but if you get errors related to downloading photo/video files, it could be because of git lfs.

**EXPRESS BACKEND**
1. `npm install`
2. `npm start`

**USAGE NOTES**
Express server listens on port 4501 by default
After running `npm start`, the server will listen for incoming requests. 

small_sfs is designed to work with request_monster. Configure and run request_monster on your local development environment, and it will issue requests to the remote server that hosts small_sfs.