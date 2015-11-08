$(document).ready(function() {
  $('#birth_date').datetimepicker({
    format: 'MM/DD/YYYY'
  });

  var user_id = $('#user_id').val();

  if (user_id)  {

    var ref = new Firebase("https://dementia.firebaseio.com/");
    var caregiver = ref.child(JSON.stringify(user_id));
    var alertsTable = $('#alertsTable').DataTable({
           columns: [
               { title: "Name" },
               { title: "Timestamp" },
               { title: "Type"}
           ],
           paging: false,
    });

    caregiver.on("value", function(snapshot) {
      stuff = _.toArray(snapshot.val());
      alertsTable.clear();

      stuff = _.each(stuff, function (alert) {
        alertsTable.row.add(_.toArray(alert));
      });

      alertsTable.order([ 1, "desc" ])
                 .draw();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  if ($('#lat')) {
    var lat = $('#lat').val();
    var long = $('#long').val();

    var map =  new GMaps({
      div: '#map',
      lat: lat,
      lng:long,
      width: '500px',
      height: '500px',
    });

    map.addMarker({
      lat: lat,
      lng: long
    });
  }


})
