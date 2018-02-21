//Players - Anakin as he progresses
var player =
    [["p1-young-Anakin.jpg", "light", 100, 4]
        , ["p2-prime-Anakin.jpg", "light", 120, 6]
        , ["p3-bad-Anakin.jpg", "dark", 140, 8]
        , ["p4-corrupt-Anakin.jpg", "dark", 160, 10]
        , ["p5-Darth-Vader.jpg", "dark", 200, 12]
    ];

//Good guys - Jedi
var jedi =
    [["j1-Luke-Skywalker.jpg", "light", 100, 4]
        , ["j2-Obi-Wan.jpg", "light", 120, 6]
        , ["j3-Yoda.jpg", "light", 140, 8]
        , ["j4-Aayla-Segura.jpg", "light", 160, 10]
        , ["j5-Saesee-Tiin.jpg", "light", 200, 12]
    ];

//Bad guys - sith
var sith =
    [["s1-Darth-Maul.jpg", "dark", 100, 4]
        , ["s2-Darth-Sidious.jpg", "dark", 120, 6]
        , ["s3-Darth-Plagueis.jpg", "dark", 140, 8]
        , ["s4-Darth-Revan.jpg", "dark", 160, 10]
        , ["s5-Darth-Vesevan.jpg", "dark", 200, 12]
    ];

var isFight = false;

$(document).ready(function () {

    //player choices
    player.forEach(function (player) {
        var playerChoice = characterBox(player)
        playerChoice.on("click", function () {
            playerPick(this);
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

    function playerPick(character) {

        $('#player-choice').empty();
        $("#player-choice").append(character);

        $("#player-health").text(character.attributes["health"].value);

        $("#character-description").text(character.id);

        if (character.attributes["force"].value === "light") {

            //sith choices
            sith.forEach(function (enemy) {
                var enemyChoice = characterBox(enemy)
                enemyChoice.on("click", function () {
                    defenderPick(this, enemy[1]);
                });
                $("#enemy-choice").append(enemyChoice.addClass("enemy sith"));

            });
        } else {
            //jedi choices
            jedi.forEach(function (enemy) {
                var enemyChoice = characterBox(enemy)
                enemyChoice.on("click", function () {
                    defenderPick(this);
                });
                $("#enemy-choice").append(enemyChoice.addClass("enemy jedi"));

            });
        }
    }

    function defenderPick(character) {

        if (isFight) {
            return;
        }


        character.remove();
        $("#defender-choice").append(character);

        $("#defender-health").text(character.attributes["health"].value);

        $("#fight-attack").on("click", function () {
            playerAttack(character, $("#player-choice").children('img')[0]);
        });

        $("#fight-attack").prop("disabled", false);

        isFight = true;

    }

    function playerAttack(defender, attacker) {

        // Track damage vs health 
        trackDamage(defender, attacker.attributes["attack"].value, $("#defender-health"));

        // Defender fights back 
        trackDamage(attacker, defender.attributes["attack"].value, $("#player-health"));
        // Attacker increased attack value
        attacker.attributes["attack"].value = (parseInt(attacker.attributes["attack"].value) * 2);
        // TODO:  Fix doubling of attack; needs to add base attack each time, not current attack.

        //defender doesn't increase their damage
        $("#player-damage").text(attacker.attributes["attack"].value)

    }

    function trackDamage(character, damage, display) {

        if (parseInt(damage) <= character.attributes["health"].value) {
            character.attributes["health"].value -= damage;
        } else {
            character.attributes["health"].value = 0;
            character.remove();
            isFight = false;
            $("#fight-attack").prop("disabled", true);
        }

        // Update display
        display.text(character.attributes["health"].value);
    }


});