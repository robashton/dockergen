
###- dashbox -###


###- base setup -###

ENV HOME /root
RUN apt-get update
RUN apt-get update --fix-missing -y
RUN apt-get install -y wget
RUN apt-get install -y openjdk-7-jre --no-install-recommends

###- undefined -###

RUN apt-get install -y build-essential
RUN apt-get install -y git

###- Riemann -###

RUN ( mkdir -p /root/riemann; cd /root/riemann; wget http://aphyr.com/riemann/riemann-,0.2.5,.tar.bz2 )
RUN ( cd /root/riemann; tar xvfj riemann-,0.2.5,.tar.bz2 )

###- Riemann Dash -###

RUN /build/ruby1.9.sh
RUN /build/ruby-switch --set ruby1.9.1
RUN /build/devheaders.sh
RUN gem install riemann-client riemann-tools riemann-dash

###- influx -###

RUN ( mkdir -p /root/influx; cd /root/influx; wget http://s3.amazonaws.com/influxdb/influxdb_latest_amd64.deb )
RUN dpkg -i /root/influx/influxdb_latest_amd64.deb

###- grafana -###

RUN ( mkdir -p /root/grafana; cd /root/grafana; wget http://grafanarel.s3.amazonaws.com/grafana-1.5.4.tar.gz )
RUN ( cd /root/grafana; tar xzf grafana-1.5.4.tar.gz )
RUN npm install -g http-server

###- elasticsearch -###

RUN ( mkdir -p /root/elasticsearch; cd /root/elasticsearch; wget https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-1.2.1.tar.gz )
RUN ( cd /root/elasticsearch; tar xzf elasticsearch-1.2.1.tar.gz )
RUN cp -r /root/elasticsearch/elasticsearch-1.2.1 /opt/elasticsearch

###- CONFIG APPLICATION -###

RUN mkdir -p /root/riemann/riemann-0.2.5/etc
ADD config/riemann/riemann.config /root/riemann/riemann-0.2.5/etc/riemann.config
RUN mkdir -p /etc/service/riemann
ADD /runit/riemann /etc/service/riemann/run
RUN mkdir -p /root/riemann-dash
ADD config/riemann-dash/config.rb /root/riemann-dash/config.rb
RUN mkdir -p /etc/service/riemann-dash
ADD runit/riemann-dash /etc/service/riemann-dash/run
RUN mkdir -p /etc/service/influxdb
ADD runit/influxdb /etc/service/influxdb/run
RUN mkdir -p /opt/influxdb/shared
ADD config/influxdb/config.toml /opt/influxdb/shared/config.toml
RUN mkdir -p /etc/service/grafana
ADD runit/grafana /etc/service/grafana/run
RUN mkdir -p /root/grafana
ADD config/grafana/config.js /root/grafana/grafana-1.5.4
RUN mkdir -p /etc/service/elasticsearch
ADD runit/elasticsearch /etc/service/elasticsearch/run
RUN mkdir -p /opt/elasticsearch
ADD config/elasticsearch/elasticsearch.yml /opt/elasticsearch/config
