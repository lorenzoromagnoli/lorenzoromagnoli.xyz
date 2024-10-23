
function closePageOverlay(event) {
    $("#portfolioItemPopup").toggleClass("hidden")
    destroyVideoJS()
}

function openPageOverlay(event) {
    let target = $( event.target );
    let link= target.attr('href');

      $("#portfolioItemPopup").load(link+" #content", function(){
        $("#portfolioItemPopup").toggleClass("hidden")
        initStuffAfterLoad()

        $(".close-btn").click(function(){
            closePageOverlay()
        });
    
      });

}

function startScrolling(){
    let scrollintText = $(".scrollingText");
    let width=scrollintText.width();
    let containerWidth=scrollintText.parent().width();
    if(width>containerWidth){
        let textString=scrollintText.text()
        scrollintText.html(textString+"&ensp;|&ensp;"+textString);
        scrollintText.addClass("isScrolling");
    }
}

let initializedVideos=[]

function destroyVideoJS(){
    for (let i=0; i<initializedVideos.length; i++){
        var player = videojs(initializedVideos[i]);
        player.dispose()
    }
    initializedVideos=[]
} 


function initVideoJS(){
    $(".video-js").each(function (videoIndex) {

        var videoId = $(this).attr("id");

        initializedVideos.push(videoId)

        var loop = $(this).data("loop");
        var autoplay = $(this).data("autoplay");
        var controls = $(this).data("controls");
        let v = videojs(videoId,{
            autoplay: autoplay,
            controls: controls,
            fluid: true,
            loop: loop,
            //fill: true,
            inactivityTimeout: 0
        }).ready(function(){
            this.on("play", function(e) {
                //pause other video
                $(".video-js").each(function (index) {
                    if (videoIndex !== index) {
                        this.player.pause();
                    }
                });
            });
        });


    });
    

}





const r = new rive.Rive({
    src: "/riv/lr_animations.riv",
    // OR the path to a discoverable and public Rive asset
    // src: '/public/example.riv',
    canvas: document.getElementById("home_btn"),
    autoplay: true,
    stateMachines: "Home btn",
    onLoad: () => {
      r.resizeDrawingSurfaceToCanvas();
    },
});    


// function initRives(){
//     console.log("init rive")
    
//     $(".rive-canvas").each(function (index) {

//         var riveName = $(this).attr("id");
//         console.log("init rives",riveName )
//         let r = new rive.Rive({
//             src: "/riv/"+riveName+".riv",
//             //  src: "/riv/lr_animations.riv",
//             canvas:  document.getElementById(riveName),
//             autoplay: false,
//             onLoad: () => {
//               r.resizeDrawingSurfaceToCanvas();
//             },
//         });         
//     })

// }




$(document).ready(function () { 
    initStuffAfterLoad()

//any link which has the class internal link should open a popup instead of a separate page

    $(".internal-link").click(function(event){
        event.preventDefault()
        openPageOverlay(event)
    })
    
    $(".close-btn").click(function(event){
        closePageOverlay()
    });
});


function initStuffAfterLoad(){
    startScrolling()
    initVideoJS()



}
