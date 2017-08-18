//http://econym.org.uk/gmap/example_hoverchange75.htm
//http://www.geocodezip.com/v3_MW_example_map2.html
//http://www.geocodezip.com/v3_MW_example_map3.html
//http://stackoverflow.com/questions/2764452/google-map-api-v3-link-markers-to-an-external-list



var googleMap = document.getElementById("googleMap");
var myCenter = new google.maps.LatLng(17.4994889,78.3872775);//map Longitude and Lattitude    
var markers = [], gmarkers = [], i = 0, html, mylocation, country, content, destination, mylocationL, countryL;
var locInfo = new Array();
var infowindow;
(function initialize() {
    // This function picks up the click and opens the corresponding info window
    function myclick(i) {
        debugger;
        gmarkers[i].openInfoWindowHtml(htmls[i]);
    }
    //Map Options    
    var mapProp = {
        center: myCenter,
        zoom: 3,
        disableDefaultUI: true,
        //panControl: false,
        //zoomControl: true,
        //mapTypeControl: true,
        //scaleControl: true,
        //streetViewControl: false,
        //overviewMapControl: false,
        //rotateControl: false,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    var map = new google.maps.Map(googleMap, mapProp);

    //Custom control 
    /*if ($('#newPos').length == 0) {
        $('div.gmnoprint').last().parent().wrap('<div id="newPos" />');
    }*/

    html = '<ul>';
    //load xml data in list
    $.get("mylocation.xml", function (data) {
       
        mylocationL = $(data).find('mylocation').size();

        countryL = $(data).find('country').size();
        $(data).find("mylocation").each(function () {

            var eachMarker = $(this);

            country = eachMarker.find("country").text();            
            sqrMetr = eachMarker.find("content").text();
            product = eachMarker.find("destination").text();

            var markerCoords = new google.maps.LatLng(
                parseFloat(eachMarker.find("latitude").text()),
                parseFloat(eachMarker.find("longitude").text())
            );

            var infoWin = "<div class='info-blob'>" + country + "</div>";           

            var marker = addMarker(infoWin, markerCoords, mylocation, country, content, destination);
           // markers.push(marker);

        });
        html += '</ul>';
        //add li's to info div
        $('#locationList').html($(html));

       /* var openDt = parseInt(openDate[0], 10),
                openMo = parseInt(openDate[1], 10) + 3,
                openYr = parseInt(openDate[2], 10);

        var now = new Date(),
          nowYear = now.getFullYear(),
          nowMo = now.getMonth() + 1, // for getMonth(), January is 0
          nowDay = now.getDate();

        //alert(openMo+', '+nowMo);
        if (nowMo < openMo) {
            $('.new').toggle('hide');
            marker.setIcon('https://www.google.com/mapfiles/marker_green.png');
        }*/
        (product == 'true') ? marker.setIcon('mark-on.png') : marker.setIcon('mark-off.png');
        //Header context
        $('.hdrInfo').html('<span>' + countryL + ' countries</span>');

        //Sort by alphabetical
        var mylist = $('#locationList ul');
        var listitems = mylist.children('li').get();

        listitems.sort(function (a, b) {
            return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
        });

        //update the sort order
        $('#locationList ul').empty().append(listitems);

       // alert($('#storeList ul > li').length);

        //click on list item to hilighligt the marker with information
        $('#locationList ul > li').each(function () {
            var $li_id = parseInt($(this).attr("id"));
           // alert($li_id);
            $(this).on('click', function () {
                google.maps.event.trigger(markers[$li_id], 'click');
                /*for (var z = 0; z < storeInfo.length; z++) {
                    if (storeInfo[z].id == $li_id) {
                        var localStorename = storeInfo[z].storename;
                        var localCountry = storeInfo[z].country;
                        break;
                    }
                }*/
                $('.locDiv').animate({ marginLeft: '-300px' });

                //Title in information panel
                $('.infoDiv p.title').html(country);
                //Inforamtion of each store in information panel
                //$('.infoDiv p.info').html('<ul><li>Opening date:</li><li>' + openDate + '</li><li> Square metres:</li><li>' + sqrMetr + ' </li><li> Products:</li><li>' + product + '</li><li>Room settings:</li><li>' + roomsetng + ' </li><li>Real-life homes:</li><li>' + relhome + '</li><li> Cash lanes:</li><li>' + cashlanes + '</li><li> Restaurant seats: </li><li>' + restsets + '</li><li>Co-workers:</li><li> ' + cowrk + '</li><li>Parking space:</li><li> ' + prkspace + '</li></ul>');

            });
        });

    });

    


    // Create a marker for each XML entry
    function addMarker(infoWin, markerCoords, storename, country, openDate, sqrMetr, product, roomsetng, relhome, cashlanes, restsets, cowrk, prkspace) {
        
        // Place the new marker
        var marker = new google.maps.Marker({
            map: map,
            icon: 'mark-on.png',
            position: markerCoords
        }); // end place the new marker


        gmarkers[i] = marker;

        //AddtoGeoInfo(i, storename, country, openDate, sqrMetr, product, roomsetng, relhome, cashlanes, restsets, cowrk, prkspace);

        html += '<li id="' + i + '" class = "loc-list" >' + country + '</li>';
        i++;
        
        
        //// Add event listener. On marker click, close all open infoWindows open current infoWindow.   
        google.maps.event.addListener(marker, "click", function () {
            if (infowindow) infowindow.close();
            infowindow = new google.maps.InfoWindow({ content: infoWin });
            infowindow.open(map, marker);

            $('.locDiv').animate({ marginLeft: '-300px' });
            //Title in information panel
            //$('.infoDiv p.title').html('<div class=""> ' + country +'<span class="new">New</span></div>');
            //Inforamtion of each store in information panel
            //$('.infoDiv p.info').html('<ul><li>Opening date:</li><li>' + openDate + '</li><li> Square metres:</li><li>' + sqrMetr + ' </li><li> Products:</li><li>' + product + '</li><li>Room settings:</li><li>' + roomsetng + ' </li><li>Real-life homes:</li><li>' + relhome + '</li><li> Cash lanes:</li><li>' + cashlanes + '</li><li> Restaurant seats: </li><li>' + restsets + '</li><li>Co-workers:</li><li> ' + cowrk + '</li><li>Parking space:</li><li> ' + prkspace + '</li></ul>');
       
        }); // end add event listener

        /* google.maps.event.addListener(marker, 'mouseover', function () {
             if (infowindow) infowindow.close();
             infowindow = new google.maps.InfoWindow({ content: infoWin });
             infowindow.open(map, marker);
         });
 
         google.maps.event.addListener(marker, 'mouseout', function () {
             if (infowindow) infowindow.close();
             infowindow = new google.maps.InfoWindow({ content: infoWin });
             infowindow.close(map, marker);
         });*/

     
        // Display marker
        markers.push(marker);

    } // end addMarker();

    /*function AddtoGeoInfo(id, storename, country, openDate, sqrMetr, product, roomsetng, relhome, cashlanes, restsets, cowrk, prkspace) {
        var geoInfo = new Array();
        geoInfo["id"] = id;
        geoInfo["storename"] = storename;
        geoInfo["country"] = country;
        storeInfo.push(geoInfo);
    }*/


    //filter the list with alphebet
    $('#searchInput').keyup(function () {
        var valThis = $(this).val().toLowerCase();
        if (valThis == "") {
            $('#locationList ul > li').show();
        } else {
            $('#locationList ul > li').each(function () {
                var text = $(this).text().toLowerCase();
                (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
            });
        };
    });

    $('p.alink').click(function () {
        $('.locDiv').animate({ marginLeft: "0" });
        infowindow.close();
    });
})();




