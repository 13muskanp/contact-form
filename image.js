
var storage = firebase.storage();
var storageRef = storage.ref('Data');
// dataRef = firebase.database().ref('Data');

$('#List').find('tbody').html('');

var i = 0;

storageRef.listAll().then(function(result){

    result.items.forEach(function(imageRef){

        //console.log("ImageReference" + imageRef.toString());

        i++;
        displayImage(i, imageRef);
    });

});

function displayImage(row, images){

    images.getDownloadURL().then(function(url){

        console.log(url);

        let new_html = '';
        new_html += '<tr>';
        new_html += '<td>';
        new_html += row;
        new_html += '</td>';
        new_html += '<td>';
        new_html += '<img src="'+url+'" width="100px" style="float:right">';
        new_html += '</td>';
        new_html += '</tr>';
        $('#List').find('tbody').append(new_html);
        

    });
}