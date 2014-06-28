define(['settings'],
function (Settings) {


  return new Settings({
    elasticsearch: "http://"+window.location.hostname+":{{elasticsearchport}}",
    datasources: {
       influx: {
	 default: true,
         type: 'influxdb',
         url: 'http://' + window.location.hostname + ':{{influxport}}/db/{{influxdb}}',
         username: 'root',
         password: 'root'
       }
     },
    default_route: '/dashboard/file/default.json',
    timezoneOffset: null,
    grafana_index: "grafana-dash",
    unsaved_changes_warning: true,
    panel_names: [
      'text',
      'influx'
    ]
  });
});
