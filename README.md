# Codename - Signs

[![CircleCI](https://circleci.com/gh/chayelheinsen/signs.svg?style=svg)](https://circleci.com/gh/chayelheinsen/signs)
![Ruby](https://img.shields.io/badge/ruby-2.5.1-CC342D.svg)
![Rails](https://img.shields.io/badge/rails-5.2.1-CC342D.svg)

## Getting Started

Prerequisites:
 * Docker & Docker Compose
    * I recommend installing [Docker for Mac](https://docs.docker.com/docker-for-mac/install/).

Not really a prerequisite, but it makes working with docker-compose much easier.
I also recommend installing [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)
and use the docker-compose plugin to get the `dco` alias for `docker-compose`.
If you don't want to install it, then substitute `dco` with `docker-compose`.
 
After installing Docker
 * run `$ dco up`
 * go to `localhost:3000` to view the app 
 
### Using the App

 * `$ dco up` to run the app
 * `$ dco run backend rails c` to launch the rails console
 * `$ dco run backend rails c --sandbox` to launch the rails console in sandbox mode

### Environment

This app uses an `.env` file for development environment variable insertion.
An `.env.example` file has been included for convenience, and should be copied for customization.
All of the required variables can be found in [.env.example](/.env.example).
Most of the variables are pretty straight forward except for these:

 Key | Description
-----|-------------
 SECURE_FIELD_KEY | A 256 bit string to use as a key for encrypted fields. You can generate a this key with `ruby -e "require 'securerandom'; puts SecureRandom.hex(16)"`. Encrypted fields are: `User#heroku_token`.
 