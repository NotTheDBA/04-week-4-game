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
    new Char(name = "Obi-Wan Can-old-be", force = "jedi", health = 160, attack = 8, image = "j3-Obi-Wan.jpg"),
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
debugger;
var thePlayer = new Char(name = "", force = "", health = 0, attack = 0, image = "");
var theDefender = new Char(name = "", force = "", health = 0, attack = 0, image = "");

var isFight = false;
var gameOver = false;

var defenderCount = 5;

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
        image.attr("src", "assets/images/" + character.image);
        image.addClass("character");

        var caption = $("<figcaption>");
        caption.text(character.name);

        var figure = $("<figure>");
        figure.append(image);
        figure.append(caption);
        figure.attr("id", character.name);
        figure.attr("force", character.force);
        figure.attr("health", character.health);
        figure.attr("attack", character.attack);

        return figure;
    }

    //enemy choices
    function enemyChoices(enemyGroup) {
        enemyGroup.forEach(function(enemy) {
            var enemyChoice = characterBox(enemy)
            enemyChoice.on("click", function() {
                defenderPick(enemy, enemyChoice);
            });
            enemyChoice.children('img').addClass("enemy " + enemy.force);
            $("#enemy-choice").append(enemyChoice);
        });
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

        $(".enemy").css("visibility", "visible");
    }

    //player picks defender
    function defenderPick(defender, box) {

        if (isFight || gameOver) {
            return;
        }
        fightSounds("SaberOn.wav");

        theDefender = defender;

        box.remove();
        $("#defender-choice").append(box);
        $("#defender-health").text(theDefender.health);

        $("#fight-attack").off("click"); //reset our button function
        // console.log(defender);
        $("#fight-attack").on("click", function() {
            allFight(theDefender, thePlayer);
        });

        $(".defender").css("display", "initial");
        defenderCount--;
        startFight();

    }

    //Fight!
    function allFight(defender, attacker) {
        fightSounds(sabers[Math.floor(Math.random() * sabers.length)]);
        debugger;
        // Player damages Defender
        trackDamage(theDefender, thePlayer.damage, $("#defender-health"));
        // defenderHealth = parseInt(defender.health);
        // Defender fights back 
        if (theDefender.health > 0) {
            trackDamage(thePlayer, theDefender.damage, $("#player-health"));
            // thePlayer.health = parseInt(thePlayer.health);
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
    function trackDamage(character, damage, display) {
        debugger;
        if (parseInt(damage) < character.health) {
            character.health -= damage;
        } else {
            character.health = 0;
            character.remove();
            endFight();
        }

        // Update display
        display.text(character.health);
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
        var audioSource = $("<source>");
        var fightAudio = $('#fightAudio');

        audioSource.attr("type", "audio/wav");
        audioSource.attr("src", "assets/sounds/" + sound);

        fightAudio[0].pause(); //interrupt if still playing...
        fightAudio.empty();
        fightAudio.append(audioSource);
        fightAudio[0].load();
        fightAudio[0].play();
    }

    function endGame(iWin) {
        gameOver = true;
        $('.character-description').text("");
        $('.health').text("");
        $('.fight').empty();
        if (iWin) {
            var image = $("<img>");
            image.attr("src", "assets/images/hate.gif");
            image.addClass("final");
            $(".defender").css("display", "inherit");
            $('#defender-choice').empty().append(image);
            $('#defender-label').text("You Win!")
        } else {
            var image = $("<img>");
            image.attr("src", "assets/images/chosen.jpg");
            image.addClass("final");
            $('#player-choice').empty().append(image);
            $('#player-label').text("You Lose!")
        }
    }
});