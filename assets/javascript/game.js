
//Players - Anakin as he progresses
var player =
    [["p1-young-Anakin.jpg", "light", "100", "4"]
        , ["p2-prime-Anakin.jpg", "light", "120", "6"]
        , ["p3-bad-Anakin.jpg", "dark", "140", "8"]
        , ["p4-corrupt-Anakin.jpg", "dark", "160", "10"]
        , ["p5-Darth-Vader.jpg", "dark", "200", "12"]
    ];

//Good guys - Jedi
var jedi =
    [["j1-Luke-Skywalker.jpg", "light", "100", "4"]
        , ["j2-Obi-Wan.jpg", "light", "120", "6"]
        , ["j3-Yoda.jpg", "light", "140", "8"]
        , ["j4-Aayla-Segura.jpg", "light", "160", "10"]
        , ["j5-Saesee-Tiin.jpg", "light", "200", "12"]
    ];

//Bad guys - sith
var sith =
    [["s1-Darth-Maul.jpg", "dark", "100", "4"]
        , ["s2-Darth-Sidious.jpg", "dark", "120", "6"]
        , ["s3-Darth-Plagueis.jpg", "dark", "140", "8"]
        , ["s4-Darth-Revan.jpg", "dark", "160", "10"]
        , ["s5-Darth-Vesevan.jpg", "dark", "200", "12"]
    ];


$(document).ready(function () {

    //player choices
    player.forEach(function (player) {
        var playerChoice = characterBox(player)
        playerChoice.on("click", function () {
            playerPick(this, player[1]);
        });
        $("#player-choice").append(playerChoice.addClass("player"));

    });

    //character display
    function characterBox(character) {

        var image = $("<img>");
        image.attr("src", "assets/images/" + character[0]);
        image.attr("id", character[0]);
        image.attr("force", character[1]);
        image.attr("health", character[2]);
        image.attr("attack", character[3]);

        return image
    }

    function playerPick(character, force) {
        console.log(character);
        console.log(character.id);
        console.log(character.attributes["force"].value);
        console.log(character.attributes["health"].value);
        console.log(character.attributes["attack"].value);

        $('#player-choice').empty();
        $("#player-choice").append(character);

        if (force === "light") {

            //sith choices
            sith.forEach(function (enemy) {
                var enemyChoice = characterBox(enemy)
                enemyChoice.on("click", function () {
                    defenderPick(this, enemy[1]);
                });
                $("#enemy-choice").append(enemyChoice.addClass("sith"));

            });
        } else {
            //jedi choices
            jedi.forEach(function (enemy) {
                var enemyChoice = characterBox(enemy)
                enemyChoice.on("click", function () {
                    defenderPick(this, enemy[1]);
                });
                $("#enemy-choice").append(enemyChoice.addClass("jedi"));

            });
        }

    }

    function defenderPick(character, force) {
        console.log(character);
        console.log(character.id);
        console.log(character.attributes["force"].value);
        console.log(character.attributes["health"].value);
        console.log(character.attributes["attack"].value);

        character.remove();
        $("#defender-choice").append(character);
    }
});