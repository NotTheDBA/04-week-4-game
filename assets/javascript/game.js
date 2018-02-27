function Char(name, force, health, attack, image) {
    this.name = name,
        this.image = image,
        this.force = force,
        this.health = health,
        this.attack = attack,
        this.damage = attack
        // pickMe = function() { mePick(this); }
        // addEventListener("click", () => { mePick(this); }, false);
        // on("click", function() {
        //     playerPick(this);
        // });
}

//Players - Anakin as he progresses
var player = [
    new Char(name = "Young Anakin", force = "jedi", health = 120, attack = 4, image = "p1-young-Anakin.jpg"),
    new Char(name = "Padawan Anakin", force = "jedi", health = 140, attack = 6, image = "p2-prime-Anakin.jpg"),
    new Char(name = "Emo Anakin", force = "sith", health = 160, attack = 8, image = "p3-bad-Anakin.jpg"),
    new Char(name = "Corrupt Anakin", force = "sith", health = 180, attack = 10, image = "p4-corrupt-Anakin.jpg"),
    new Char(name = "Darth Anakin", force = "sith", health = 200, attack = 12, image = "p5-Darth-Vader.jpg")
]

//Good guys - Jedi
var jedi = [
    new Char(name = "Saesee Tiin", force = "jedi", health = 120, attack = 4, image = "j1-Saesee-Tiin.jpg"),
    new Char(name = "Aayla Segura", force = "jedi", health = 140, attack = 6, image = "j2-Aayla-Segura.jpg"),
    new Char(name = "obi-Wan Can-old-be", force = "jedi", health = 160, attack = 8, image = "j3-Obi-Wan.jpg"),
    new Char(name = "Yoda Boghopper", force = "jedi", health = 180, attack = 10, image = "j4-Yoda.jpg"),
    new Char(name = "Luke Skywalker", force = "jedi", health = 200, attack = 12, image = "j5-Luke-Skywalker.jpg")
]

//Bad guys - sith
var sith = [
    new Char(name = "Darth Vesevan", force = "sith", health = 120, attack = 4, image = "s1-Darth-Vesevan.jpg"),
    new Char(name = "Darth Maul", force = "sith", health = 140, attack = 6, image = "s2-Darth-Maul.jpg"),
    new Char(name = "Darth Revan", force = "sith", health = 160, attack = 8, image = "s3-Darth-Revan.jpg"),
    new Char(name = "Darth Sidious", force = "sith", health = 180, attack = 10, image = "s4-Darth-Sidious.jpg"),
    new Char(name = "Darth Plagueis", force = "sith", health = 200, attack = 12, image = "s5-Darth-Plagueis.jpg")
]

var thePlayer = new Char(name = "", force = "", health = 0, attack = 0, image = "");
var theDefender = new Char(name = "", force = "", health = 0, attack = 0, image = "");

var isFight = false;
var gameOver = false;

var defenderCount = 0;
var audio = new Audio("assets/sounds/clash 01.wav");
var sabers = ["2 clash 2.wav", "2 clash 3.wav", "2 clash 4.wav", "2 clash 5.wav", "2 Clash Ck.wav", "2 clash.wav", "3 clash 1.wav", "3 clash 2.wav", "3 Clash Ck.wav", "4 clash 2.wav", "4 Clash good.wav", "5 clash 2.wav", "clash 01.wav"]

$(document).ready(function() {

    //player choices
    player.forEach(function(player) {
        var playerChoice = characterBox(player)
        playerChoice.on("click", function() {
            playerPick(player, playerChoice);
        });
        playerChoice.children('img').addClass("player");
        $("#player-choice").append(playerChoice);
    });

    //character display box
    function characterBox(character) {
        var image = $("<img>");
        image.addClass("character");
        image.attr("src", "assets/images/" + character.image);

        var caption = $("<figcaption>").text(character.name);

        var figure = $("<figure>");
        figure.attr("id", character.name);
        figure.append(image);
        figure.append(caption);

        return figure;
    }

    //enemy choices
    function enemyChoices(enemyGroup) {

        defenderCount = enemyGroup.length;

        enemyGroup.forEach(function(enemy) {
            var enemyChoice = characterBox(enemy)
            enemyChoice.on("click", function() {
                defenderPick(enemy, enemyChoice);
            });
            enemyChoice.children('img').addClass("enemy " + enemy.force);
            $("#enemy-choice").append(enemyChoice);
        });

        $(".enemy").css("visibility", "visible");
    }

    //player picks character
    function playerPick(character, box) {
        fightSounds("sw4-lightsabre.wav");

        thePlayer = character;

        //clears group, then re-adds our choice
        $('#player-choice').empty().append(box);
        $(".health").css("visibility", "visible");
        $("#player-health").text(thePlayer.health);
        $("#character-description").text(thePlayer.name);

        enemyChoices((thePlayer.force === "jedi" ? sith : jedi));
    }

    //player picks defender
    function defenderPick(defender, box) {

        // no double-select defenders
        if (isFight || gameOver) {
            return;
        }
        fightSounds("SaberOn.wav");

        theDefender = defender;

        box.remove();
        $("#defender-choice").append(box);
        $("#defender-health").text(theDefender.health);

        //reset our button function
        $("#fight-attack").off("click").on("click", function() {
            allFight(theDefender, thePlayer);
        });

        $(".defender").css("display", "initial");
        defenderCount--;
        startFight();

    }

    //Fight!
    function allFight(defender, attacker) {
        fightSounds(sabers[Math.floor(Math.random() * sabers.length)]);
        // Player damages Defender
        trackDamage(theDefender, thePlayer.damage);
        // Defender fights back 
        if (theDefender.health > 0) {
            $("#defender-health").text(theDefender.health);
            trackDamage(thePlayer, theDefender.damage);
            if (thePlayer.health > 0) {
                $("#player-health").text(thePlayer.health);
            }
        } else {
            //remove current defender
            $("#defender-choice").empty();
        }

        // Player increases attack value (but less against weaker opponents)
        var defenderOffset = 0;
        if (thePlayer.attack > theDefender.damage) {
            defenderOffset = Math.round((theDefender.damage / 2))
        };

        thePlayer.damage += thePlayer.attack - defenderOffset;
        //defender doesn't increase their damage

        if (thePlayer.health === 0) {
            endGame(false);
        } else if (theDefender.health === 0 && defenderCount === 0) {
            endGame(true);
        }
    }

    //Who's wounded
    function trackDamage(character, damage) {
        if (parseInt(damage) < character.health) {
            character.health -= damage;
        } else {
            character.health = 0;
            endFight();
        }
    }

    function startFight() {
        isFight = true;
        $(".defender").css("display", "inherit");
        $(".fight").css("display", "initial");
    }

    function endFight() {
        isFight = false;
        $(".defender").css("display", "none");
        $(".fight").css("display", "none");
    }

    function fightSounds(sound) {
        audio.pause(); //interrupt if still playing...
        audio.src = "assets/sounds/" + sound;
        audio.play();
    }

    function endGame(iWin) {
        gameOver = true;
        $('.character-description').text("");
        $('.health').text("");
        $('.fight').empty();
        var image = $("<img>");
        image.addClass("final");

        if (iWin) {
            image.attr("src", "assets/images/hate.gif");
            $('#defender-choice').empty().append(image);

            $('#defender-label').addClass("final").text("You Win!")
            $(".defender").css("display", "inherit");
        } else {
            image.attr("src", "assets/images/chosen.jpg");
            $('#player-choice').empty().append(image);

            $('#player-label').addClass("final").text("You Lose!")
        }
    }
});