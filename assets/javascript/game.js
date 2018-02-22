//Players - Anakin as he progresses
var player =
    [["p1-young-Anakin.jpg", "light", 100, 4, "Young Anakin"]
        , ["p2-prime-Anakin.jpg", "light", 120, 6, "Padawan Anakin"]
        , ["p3-bad-Anakin.jpg", "dark", 140, 8, "Emo Anakin"]
        , ["p4-corrupt-Anakin.jpg", "dark", 160, 10, "Corrupt Anakin"]
        , ["p5-Darth-Vader.jpg", "dark", 200, 12, "Darth Anakin"]
    ];

//Good guys - Jedi
var jedi =
    [["j1-Saesee-Tiin.jpg", "light", 100, 4, "Saesee Tiin"]
        , ["j2-Aayla-Segura.jpg", "light", 120, 6, "Aayla Segura"]
        , ["j3-Obi-Wan.jpg", "light", 140, 8, "Obi-Wan Can-old-be"]
        , ["j4-Yoda.jpg", "light", 160, 10, "Yoda Boghopper"]
        , ["j5-Luke-Skywalker.jpg", "light", 200, 12, "Luke Skywalker"]
    ];

//Bad guys - sith
var sith =
    [["s1-Darth-Vesevan.jpg", "dark", 100, 4, "Darth Vesevan"]
        , ["s2-Darth-Maul.jpg", "dark", 120, 6, "Darth Maul"]
        , ["s3-Darth-Revan.jpg", "dark", 140, 8, "Darth Revan"]
        , ["s4-Darth-Sidious.jpg", "dark", 160, 10, "Darth Sidious"]
        , ["s5-Darth-Plagueis.jpg", "dark", 200, 12, "Darth Plagueis"]
    ];

var isFight = false;
var playerAttack = 0;
var playerDamage = 0;
var playerHealth = 0;
var defenderDamage = 0;
var defenderHealth = 0;
var defenderCount = 5;

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
        $(".enemy").css("visibility", "visible");
    }

    //player picks defender
    function defenderPick(defender) {

        if (isFight) {
            return;
        }
        defenderDamage = parseInt(defender.attributes["attack"].value);
        defenderHealth = defender.attributes["health"].value;

        defender.remove();
        $("#defender-choice").append(defender);
        $("#defender-health").text(defenderHealth);

        $("#fight-attack").off("click"); //reset our button function
        $("#fight-attack").on("click", function () {
            allFight(defender, $("#player-choice").children('img')[0]);
        });

        $(".defender").css("visibility", "visible");
        defenderCount--;
        startFight();

    }

    //Fight!
    function allFight(defender, attacker) {
        // Player damages Defender
        trackDamage(defender, playerDamage, $("#defender-health"));
        defenderHealth = parseInt(defender.attributes["health"].value);
        // Defender fights back 
        trackDamage(attacker, defenderDamage, $("#player-health"));
        playerHealth = parseInt(attacker.attributes["health"].value);

        // Player increases attack value (but less against weaker opponents)
        var defenderOffset = 0;
        if (playerDamage > defenderDamage) {
            defenderOffset = Math.round((defenderDamage / 2))
        };
        playerDamage += playerAttack - defenderOffset;

        //TODO: Remove damage display after function fixed.
        $("#player-damage").text(playerDamage)

        //defender doesn't increase their damage

        debugger;
        if (playerHealth === 0) {
            endGame(false);
        } else if (defenderHealth === 0 && defenderCount === 0) {
            endGame(true);
        }
    }

    //Who's wounded
    function trackDamage(character, damage, display) {

        if (parseInt(damage) < character.attributes["health"].value) {
            character.attributes["health"].value -= damage;
        } else {
            character.attributes["health"].value = 0;
            character.remove();
            endFight();
        }

        // Update display
        display.text(character.attributes["health"].value);
    }

    function startFight() {
        isFight = true;
        $("#fight-attack").prop("disabled", false);
    }

    function endFight() {
        isFight = false;
        $("#fight-attack").prop("disabled", true);
    }

    function endGame(iWin) {
        // TODO: More elaborate end game
        if (iWin) {
            alert("You win! :-D");
        } else {
            alert("You lose... :-(");
        }
    }
});