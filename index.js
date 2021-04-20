
var client;

function connect(){
  
    client  = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');

    document.getElementById('brokerStatus').value = "Connecting .... ";

    client.on('connect', function () {
    document.getElementById('brokerStatus').value = "Successfully Connected!";
    })

  client.on('message', function (pub_topic, payload) {

    let timestamp = new Date();
    if(pub_topic == document.getElementById('subscribeTopic').value){

      document.getElementById('myTable1').innerHTML += "<tr><td>"+ pub_topic +"</td><td>"+ payload +"</td><td>"+ timestamp.toDateString() +" "+ timestamp.toLocaleTimeString()+ "</td></tr>";

    }  
  })

}

var pub_topic = document.getElementById('publishTopic');
var pub_payload = document.getElementById('publishPayload');
var sub_topic = document.getElementById('subscribeTopic');

function publish(){

   let timestamp = new Date();

   if(pub_topic.value != ""  &&  pub_payload.value != ""){ 
       client.publish(pub_topic.value, pub_payload.value);
       document.getElementById('myTable2').innerHTML += "<tr><td>"+ pub_topic.value +"</td><td>"+ pub_payload.value +"</td><td>"+ timestamp.toDateString() +" "+ timestamp.toLocaleTimeString()+ "</td></tr>";
   }
   else{
     alert("Please input topic and payload!")
   }
}

function subscribe(){

  let timestamp = new Date();
  
  if(sub_topic.value != ""){

    client.subscribe(sub_topic.value, function(err){
      if(err){
        console.log("Error in subscribing topic.")
      }
      document.getElementById('myTable3').innerHTML += "<tr><td>"+ sub_topic.value +"</td><td>"+ timestamp.toDateString() +" "+ timestamp.toLocaleTimeString()+ "</td></tr>";
    })
  }
  else{
    alert("Please input topic!")
  }
}
