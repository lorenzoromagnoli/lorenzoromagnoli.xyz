
function closePageOverlay(event) {
    $("#portfolioItemPopup").addClass("hidden")
    destroyVideoJS()
}

function openPageOverlay(event) {
    let target = $( event.target );
    let link= target.attr('href');

      $("#portfolioItemPopup").load(link+" #content", function(){
        $("#portfolioItemPopup").removeClass("hidden")
        initStuffAfterLoad()
       addState(link)

        $(".close-btn").click(function(){
            closePageOverlay()
        });    
      });
}

function openPageOverlayByUrl(url) {
      $("#portfolioItemPopup").load(url+" #content", function(){
        $("#portfolioItemPopup").toggleClass("hidden")
        initStuffAfterLoad()
       //addState(link)

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


function openPageDependingOnHash(){
    let hash= window.location.hash.substring(1);
    if (hash!=''){
        console.log(hash)
        let section=hash.split("&")[0];
        let page=hash.split("&")[1];
        var baseUrl = window.location.origin;
    
        console.log(baseUrl+"/"+section+"/"+page)
        openPageOverlayByUrl(baseUrl+"/"+section+"/"+page)
    } 
    

}

let initStateID=0
function addState(anchor) {
    const state = { page_id: initStateID+1};
    
    var baseUrl = window.location.origin;
    let section =anchor.split("/")[1]
    let page =anchor.split("/")[2]

    console.log(section, page)

    var redirectToURL = baseUrl+"#"+section+"&"+page
    history.pushState(state, anchor, redirectToURL);
} 





$(document).ready(function () { 

    window.addEventListener(
        "hashchange",
        () => {
          console.log("The hash has changed!");
          openPageDependingOnHash()
        },
        false,
      );


    initStuffAfterLoad()

//any link which has the class internal link should open a popup instead of a separate page

    openPageDependingOnHash()

    $(".internal-link").click(function(event){
        event.preventDefault()
        openPageOverlay(event)
    })
    
    $(".close-btn").click(function(event){
        closePageOverlay()
    });
});


function redirectToAnchor(anchor) {
    // We remove previous anchors from the current URL    
    var redirectToURL = document.URL.replace(/#.*$/, "");

    redirectToURL = redirectToURL + anchor
    window.location.href = redirectToURL;
    window.location.reload(true)
}



function initStuffAfterLoad(){
    startScrolling()
    initVideoJS()



}
