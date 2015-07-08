$(function () {

    var peer = new Peer("Patient",{
        key: 'zurreip758eel8fr',
        debug: 3,
        config: {
            'iceServers': [
                { url: 'stun:stun.l.google.com:19302' },
                { url: 'stun:stun1.l.google.com:19302' },
                { url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }]
        }
    });

    peer.on('open', function () {
        console.log(peer.id);
    });

    
    //var session = peer.initSession().addMedia('myvideo').connect('GP').on('media', function (e) {
    //    console.log(e.video);
    //    document.querySelector('div.DoctorConnect').appendChild(e.video);
    //});

    //connection.on('open', function () {
    //    console.log("Connected")
        
    //});


    var errorCallback = function (e) {
        console.log('Reeeejected!', e);
    };

    navigator.getUserMedia = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

    var vgaConstraints = {
        video: {
            mandatory: {
                maxWidth: 640,
                maxHeight: 360
            }
        }
    };

    navigator.getUserMedia(vgaConstraints, function (stream) {
        $('#myvideo').prop('src', URL.createObjectURL(stream));
        var call = peer.call('GP',stream);
        call.on('stream', function (remoteStream) {
            $('#their-video').prop('src', URL.createObjectURL(remoteStream));
            console.log(URL.createObjectURL(remoteStream));
        });
        
    }, errorCallback);

  
})