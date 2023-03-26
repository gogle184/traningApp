FROM ruby:3.0

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN mkdir /traningApp
WORKDIR /traningApp
COPY Gemfile /traningApp/Gemfile
COPY Gemfile.lock /traningApp/Gemfile.lock
RUN bundle install
COPY . /traningApp

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
