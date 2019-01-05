
/*E. Berke Karagöz | 21704206
Levent Durdalı | 21702600*/


$(function () {
    var timer = setInterval(displayIntro, 1500);
    var toDisplay = 1;
    var isStartActive = false,
    isReady = false;
    var shuffleValue;//sfuffla value of othe combo box

    function displayIntro() {
        $("#container").fadeOut(function () {
            if (toDisplay % 3 === 0) {
                $("p:nth-child(1)").html("Web Technologies I").css("opacity", "1");
                $("p:nth-child(2)").html("Puzzle").css("opacity", "1");
                $("p:nth-child(3)").html("Project").css("opacity", "1");
            } else if (toDisplay % 3 === 1) {
                $("p:nth-child(1)").html("E. Berke Karagöz | 21704206").css("opacity", "1");
                $("p:nth-child(2)").html("Levent Durdalı | 21702600");
                $("p:nth-child(3)").html("Eight Eighty").css("opacity", "1");
            } else if (toDisplay % 3 === 2) {
                $("p:nth-child(1)").css("opacity", "0");
                $("p:nth-child(2)").html("Afiyet Olsun!");
                $("p:nth-child(3)").css("opacity", "0");
            }
            toDisplay++;
        }).fadeIn();
    }
    ;
    $(".btn#one").click(function () {
        $(".main").fadeOut(function () {
            $(".main").empty().append("<h1 id ='two' class = 'header'>Select a Product</h1><div class='imageDiv'><div class='image' id='one'></div><div class='image' id='two'></div><div class='image' id='three'></div><div class='image' id='four'></div></div>");
        $(".btn#one").fadeOut(0);
        }).fadeIn();
    });
    
    var selected;

    $(".main").on('click', '.image', function () {
        $(".image").css("box-shadow", 0 + "px " + 0 + "px" + " grey").css("opacity", 0.65);
        $(this).css("box-shadow", 5 + "px " + 10 + "px" + " grey").css("opacity", 1);
        $(".btn#two").fadeIn(200);
        selected = $(this).index();
        console.log($(this).index());
        if (!isStartActive){
        $(".main").append("<div class='btn' id='start'>ORDER</div>");
        isStartActive = true;
    }
    });

    var isShuffleActive = false;
    var pos = [];//postiosn of div/images
    var emptyTile = [];//movable postions of div/images
    for (i = 1; i <= 9; i++)
        pos[i] = "#t" + i + ".tile";

    $(".main").on('click', '.btn#start', function () {

    $(".main").animate({right: 800, opacity: 0}, 500, function () {
        $(".main").empty().append("<div class='puzzleDiv'></div>");
            for (row = 1; row <= 3; row++)
                for (col = 1; col <= 3; col++)
                $(".puzzleDiv").append("<div class='tile' id='t" +
                	((row-1)*3 + col) + "' style='margin-left: " +
                	(((col-1) * 200) + col*5) +"px;margin-top: " + (((row-1)*200) + row*5) + 
                	"px;background-position: -" + ((col-1) * 200) +"px -" +
                	((row-1)*200) + "px;'</div>");
            for (i = 1; i <= 9; i++) {
        		switch(selected){
        			case 0: $(".tile").css('background-image', 'url(lahmacun.jpg)'); break;
        			case 1: $(".tile").css('background-image', 'url(beyti.jpg)'); break;
        			case 2: $(".tile").css('background-image', 'url(kasarlibeyti.png)'); break;
        			case 3: $(".tile").css('background-image', 'url(ayran.jpg)'); break;
        		}
            }

        $(".main").append("<div class = 'footer'></div>");
        $(".footer").append("<Select class = 'combobox'><option value = 0>Shuffle Amount</option><option value = 3>3 Moves</option>\n\
        <option value = 30>30 Moves</option></select>");
        $(".combobox").change(function () {
            shuffleAmount = $(this).val();
            if (isShuffleActive == false) {
                $(".footer").append("<div class='btn' id='three'>Shuffle</div>");
                isShuffleActive = true;
            }
            $(".main").on('click', '#three.btn', function () {
            $("#three.btn").remove();
            $(".combobox").remove();
            var previous = "";
            var speed;//movment speed
            var index;
            if (shuffleAmount == 30)
                speed = 50;
            else
                speed = 200;
            
            var timer2 = setInterval(function () {
                emptyTile = getEmptyTile();
                if (shuffleAmount == 0) {
                    clearInterval(timer2);
                    isReady = true;
                    return;
                }
                do {
                    var rnd = Math.floor(Math.random() * (emptyTile.length - 1));
                    var hold = emptyTile[rnd];
                } while (hold == previous);
//--------------

                $(hold).animate({marginLeft: $("#t1.tile").css("margin-left"),
                                marginTop: $("#t1.tile").css("margin-top")}, 
                                speed);
                $("#t1.tile").animate({marginLeft: $(hold).css("margin-left"),
                                    marginTop: $(hold).css("margin-top")}, 
                                    speed);
                                    
                index = parseInt(pos.indexOf(hold));
                pos[index] = "#t1.tile";
                pos[emptyTile[emptyTile.length - 1]] = hold;
                previous = hold;
                for (i = 1; i <= 9; i++) {
                    if (pos[i] == hold) {
                        pos[i] = "#t1.tile";
                        pos[emptyTile[emptyTile.length - 1]] = hold;
                        previous = hold;
                    }
                }
                shuffleAmount--;
            }, speed + 30); }); 
        });
//--------------



//0 1 2
//3 4 5
//6 7 8
function getEmptyTile() {
        if (pos[1] == "#t1.tile")
            return [pos[2], pos[4], 1];
        else if (pos[2] == "#t1.tile")
            return [pos[1], pos[3], pos[5], 2];
        else if (pos[3] == "#t1.tile")
            return [pos[2], pos[6], 3];
        else if (pos[4] == "#t1.tile")
            return [pos[1], pos[5], pos[7], 4];
        else if (pos[5] == "#t1.tile")
            return [pos[2], pos[4], pos[6], pos[8], 5];
        else if (pos[6] == "#t1.tile")
            return [pos[3], pos[5], pos[9], 6];
        else if (pos[7] == "#t1.tile")
            return [pos[4], pos[8], 7];
        else if (pos[8] == "#t1.tile")
            return [pos[5], pos[7], pos[9], 8];
        else
            return [pos[6], pos[8], 9];
    }

//0 1 2
//3 4 5
//6 7 8
$(".main").on('mousemove', '.puzzleDiv', function () {
        if (isReady == true) {
            emptyTile = getEmptyTile();
            var size = emptyTile.length - 1;
            var index;
            for (i = 1; i <= 9; i++)
                $(pos[i]).css("opacity", "0.5");//normal opacity of images
            for (i = 0; i < size; i++)
                $(emptyTile[i]).css("opacity", "1");//movable image opacity
            //
            //log moveable div/images
            
            $(emptyTile[0]).off().click(function (event) {
                if (emptyTile[0] == "#" + $(this).attr('id') + ".tile") {
                    $(emptyTile[0]).animate({marginLeft: $("#t1.tile").css("margin-left"), marginTop: $("#t1.tile").css("margin-top")}, 100);
                    $("#t1.tile").animate({marginLeft: $(emptyTile[0]).css("margin-left"), marginTop: $(emptyTile[0]).css("margin-top")}, 100);
                    index = parseInt(pos.indexOf(emptyTile[0]));
                    pos[index] = "#t1.tile";
                    pos[emptyTile[emptyTile.length - 1]] = emptyTile[0];
                    event.stopPropagation();
                    //check on each move 
                    //ineffiecnt but works
                    isEnded();
                }
            });
            $(emptyTile[1]).off().click(function (event) {
                if (emptyTile[1] == "#" + $(this).attr('id') + ".tile") {
                    $(emptyTile[1]).animate({marginLeft: $("#t1.tile").css("margin-left"), marginTop: $("#t1.tile").css("margin-top")}, 100);
                    $("#t1.tile").animate({marginLeft: $(emptyTile[1]).css("margin-left"), marginTop: $(emptyTile[1]).css("margin-top")}, 100);
                    index = parseInt(pos.indexOf(emptyTile[1]));
                    pos[index] = "#t1.tile";
                    pos[emptyTile[emptyTile.length - 1]] = emptyTile[1];
                    event.stopPropagation();
                    isEnded();
                }
            });
            if (size == 3 || size == 4) {
                $(emptyTile[2]).off().click(function (event) {
                    if (emptyTile[2] == "#" + $(this).attr('id') + ".tile") {
                        $(emptyTile[2]).animate({marginLeft: $("#t1.tile").css("margin-left"), marginTop: $("#t1.tile").css("margin-top")}, 100);
                        $("#t1.tile").animate({marginLeft: $(emptyTile[2]).css("margin-left"), marginTop: $(emptyTile[2]).css("margin-top")}, 100);
                        index = parseInt(pos.indexOf(emptyTile[2]));
                        pos[index] = "#t1.tile";
                        pos[emptyTile[emptyTile.length - 1]] = emptyTile[2];
                        event.stopPropagation();
                        isEnded();
                    }
                });
            }
            if (size == 4) {
                $(emptyTile[3]).off().click(function () {
                    if (emptyTile[3] == "#" + $(this).attr('id') + ".tile") {
                        $(emptyTile[3]).animate({marginLeft: $("#t1.tile").css("margin-left"), marginTop: $("#t1.tile").css("margin-top")}, 100);
                        $("#t1.tile").animate({marginLeft: $(emptyTile[3]).css("margin-left"), marginTop: $(emptyTile[3]).css("margin-top")}, 100);
                        index = parseInt(pos.indexOf(emptyTile[3]));
                        pos[index] = "#t1.tile";
                        pos[emptyTile[emptyTile.length - 1]] = emptyTile[3];
                        event.stopPropagation();
                        isEnded();
                    }
                });
            }
        }
    });
    }).animate({opacity: 1, right: 0}, 500);

function isEnded() {
        
        for (i = 1; i <= 9; i++) {
            if (pos[i] != "#t" + i + ".tile")
                return false;
        }
        
$("#t1.tile").css('display', 'flex');

        isReady == false;
        
        $(".main").off();
        for (i = 1; i <= 9; i++){
            $(pos[i]).animate({opacity:1, borderRadius: 0}, 1000);
        }

        $(".puzzleDiv").empty().append("<div class='image' id='final'></div>");

        		switch(selected){
        			case 0: $("#final").css('background-image', 'url(lahmacun.jpg)'); break;
        			case 1: $("#final").css('background-image', 'url(beyti.jpg)'); break;
        			case 2: $("#final").css('background-image', 'url(kasarlibeyti.png)'); break;
        			case 3: $("#final").css('background-image', 'url(ayran.jpg)'); break;
        		}

                $(".footer").empty().append("<p style='font-size: 40px;'><a href='http://www.beyti.com'>Complete!</a></p>Redirects to a different website.");

        return true;
    }

}
);
});