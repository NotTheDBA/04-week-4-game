
var player = ["p1-young-Anakin.jpg", "p2-prime-Anakin.jpg", "p3-bad-Anakin.jpg", "p4-corrupt-Anakin.jpg", "p5-Darth-Vader.jpg"];

var jedi = ["j1-Luke-Skywalker.jpg", "j2-Obi-Wan.jpg", "j3-Yoda.jpg", "j4-Aayla-Segura.jpg", "j5-Saesee-Tiin.jpg"];

var sith = ["s1-Darth-Maul.jpg", "s2-Darth-Sidious.jpg", "s3-Darth-Plagueis.jpg", "s4-Darth-Revan.jpg", "s5-Darth-Vesevan.jpeg"];

$(document).ready(function () {


    // 1. Create a for-loop to iterate through the letters array.
    player.forEach(function (character) {

        var image = $("<img>");

        // image.addClass("letter letter-button letter-button-color");

        image.attr("src", "assets/images/" + character);
        image.attr('width', '80px');
        image.text(character);

        // 6. Finally, append each "letterBtn" to the "#buttons" div (provided).
        $("#player-choice").append(image);

    });

    jedi.forEach(function (defender) {

        var image = $("<img>");

        // image.addClass("letter letter-button letter-button-color");

        image.attr("src", "assets/images/" + defender);
        image.attr('width', '80px');

        image.text(defender);

        // 6. Finally, append each "letterBtn" to the "#buttons" div (provided).
        $("#defender-choice").append(image);

    });

    sith.forEach(function (defender) {

        var image = $("<img>");

        // image.addClass("letter letter-button letter-button-color");

        image.attr("src", "assets/images/" + defender);
        image.attr('width', '80px');

        image.text(defender);

        // 6. Finally, append each "letterBtn" to the "#buttons" div (provided).
        $("#enemy-choice").append(image);

    });
});