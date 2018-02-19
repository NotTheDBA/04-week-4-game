
var player = ["p1-young-Anakin.jpg", "p2-prime-Anakin.jpg", "p3-bad-Anakin.jpg", "p4-corrupt-Anakin.jpg", "p5-Darth-Vader.jpg"];

var jedi = ["j1-Luke-Skywalker.jpg", "j2-Obi-Wan.jpg", "j3-Yoda.jpg", "j4-Aayla-Segura.jpg", "j5-Saesee-Tiin.jpg"];

var sith = ["s1-Darth-Maul.jpg", "s2-Darth-Sidious.jpg", "s3-Darth-Plagueis.jpg", "s4-Darth-Revan.jpg", "s5-Darth-Vesevan.jpeg"];

$(document).ready(function () {

    //player choices
    player.forEach(function (player) {

        $("#player-choice").append(characterBox(player).addClass("player"));

    });

    //jedi choices
    jedi.forEach(function (defender) {

        $("#defender-choice").append(characterBox(defender).addClass("defender"));

    });

    sith.forEach(function (enemy) {

        $("#enemy-choice").append(characterBox(enemy).addClass("enemy"));

    });

    //sith choices
    function characterBox(character) {

        var image = $("<img>");
        image.addClass("character");
        image.attr("src", "assets/images/" + character);
        image.text(character);
        image.on("click", function () {
            alert(this.textContent);
        });
        return image
    }

});