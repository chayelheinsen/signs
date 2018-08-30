FROM ruby:2.5.1
WORKDIR /usr/src/app
ENV HOME=/usr/src/app PATH=/usr/src/app/bin:$PATH

# Install capybara-webkit deps
RUN apt-get update \
    && apt-get install -y xvfb qt5-default libqt5webkit5-dev \
                          gstreamer1.0-plugins-base gstreamer1.0-tools gstreamer1.0-x

# Node.js
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install -y nodejs

# yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -\
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y yarn

## vim
#RUN apt-get update \
#    && apt-get install -y vim
#
#COPY package.json yarn.lock $HOME/
#RUN yarn

# Install the current project gems - they can be safely changed later
# during development via `bundle install` or `bundle update`:
ADD Gemfile* $HOME/
RUN set -ex && bundle install

ADD . $HOME

RUN RAILS_ENV=production bundle exec rake assets:precompile

CMD ["puma"]
