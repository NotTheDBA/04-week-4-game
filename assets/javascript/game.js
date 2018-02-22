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
var playerAttack = 0;
var playerDamage = 0;
var playerHealth = 0;
var defenderDamage = 0;
var defenderHealth = 0;

$(document).ready(function () {

    //player choices
    player.forEach(function (player) {
        var playerChoice = characterBox(player)
        playerChoice.on("click", function () {
            playerPick(this);
        });
        $("#player-choice").append(playerChoice.addClass("player"));
    });

    //enemy choices
    function enemyChoices(group, side) {
        group.forEach(function (enemy) {
            var enemyChoice = characterBox(enemy)
            enemyChoice.on("click", function () {
                defenderPick(this, enemy[1]);
            });
            $("#enemy-choice").append(enemyChoice.addClass("enemy " + side));
        });
    }

    //character display box
    function characterBox(character) {

        var image = $("<img>");
        image.attr("src", "assets/images/" + character[0]);
        image.attr("id", character[0]);
        image.attr("force", character[1]);
        image.attr("health", character[2]);
        image.attr("attack", character[3]);

        return image
    }

    //player picks character
    function playerPick(character) {

        playerAttack += parseInt(character.attributes["attack"].value);
        playerDamage += playerAttack;
        playerHealth = character.attributes["health"].value;

        //clears group, then re-adds our choice
        $('#player-choice').empty().append(character);
        $("#player-health").text(playerHealth);
        $("#character-description").text(character.id);

        if (character.attributes["force"].value === "light") {
            enemyChoices(sith, "sith");
        } else {
            enemyChoices(jedi, "jedi");
        }
    }

    //player picks defender
    function defenderPick(defender) {

        if (isFight) {
            return;
        }

        defenderDamage += parseInt(defender.attributes["attack"].value);
        defenderHealth = defender.attributes["health"].value;

        defender.remove();
        $("#defender-choice").append(defender);
        $("#defender-health").text(defenderHealth);

        $("#fight-attack").on("click", function () {
            allFight(defender, $("#player-choice").children('img')[0]);
        });

        startFight();

    }

    //Fight!
    function allFight(defender, attacker) {
        // Player damages Defender
        trackDamage(defender, playerDamage, $("#defender-health"));

        // Defender fights back 
        trackDamage(attacker, defenderDamage, $("#player-health"));

        // Player increases attack value
        playerDamage += playerAttack - Math.round((defenderDamage / 2));
        //TODO: Remove damage display after function fixed.
        $("#player-damage").text(playerDamage)
        // TODO: Fix fight button for round 2

        //defender doesn't increase their damage

    }


    //Who's wounded
    function trackDamage(character, damage, display) {

        if (parseInt(damage) <= character.attributes["health"].value) {
            character.attributes["health"].value -= damage;
        } else {
            character.attributes["health"].value = 0;
            character.remove();
            endFight();
        }

        // Update display
        display.text(character.attributes["health"].value);
    }

    function startFight($) {
        isFight = true;
        $("#fight-attack").prop("disabled", false);
    }

    function endFight($) {
        isFight = false;
        $("#fight-attack").prop("disabled", true);
    }
});