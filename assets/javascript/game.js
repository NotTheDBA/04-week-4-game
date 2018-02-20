
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

    //character choices
    function characterBox(character) {

        var image = $("<img>");
        image.attr("src", "assets/images/" + character[0]);
        image.attr("id", character[0]);

        image.data("force", character[1]);
        // image.on("click", function () {
        //     defenderPick(this, image.attr('class'));
        // });
        return image
    }

    function playerPick(character, force) {
        // console.log(character);
        // console.log(force);
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
            jedi.forEach(function (defender) {
                var defenderChoice = characterBox(defender)
                defenderChoice.on("click", function () {
                    defenderPick(this, defender[1]);
                });
                $("#enemy-choice").append(defenderChoice.addClass("jedi"));

            });
        }

    }

    function defenderPick(character, force) {
        // console.log(character);
        // console.log(character.id);
        // var defenderChoice = characterBox(character.id)
        // console.log(character);
        // // defenderChoice.on("click", function () {
        // //     defenderPick(this, character[1]);
        // // });
        // $("#defender-choice").append(characterBox(defenderChoice));

        character.remove();

        // switch (group) {
        //     case "player":
        //         // console.log(character);
        //         // console.log(character.data("force"));
        //         $('#player-choice').empty();
        //         $("#player-choice").append(character);

        //         break;
        //     case "defender":
        //         character.remove();
        //         break;

        //     case "enemy":
        //         console.log(character);
        //         break;

        // }
    }
});