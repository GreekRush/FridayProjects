var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var moment = require('moment');




    function scrapeTeamSchedule(url, cb) {

        request(url, function(error, response, html) {
            if (error) console.log(error)
            if (!error) {
                var $ = cheerio.load(html);

                var teamName, opponent, isHost, dateTime, result;
                var games = [];
                var json = {
                    games: [],
                    teamName: ""
                };

                $('#sub-branding').filter(function() {
                    var data = $(this);
                    teamName = data.children().first().text();
                    // console.log('teamName: ', teamName);
                    json.teamName = teamName;
                })

                $('.mod-content .tablehead').filter(function() {
                    var data = $(this).children();
                    data.each(function(i, game) {
                        if (i < 2) {
                            return;
                        }
                        var result = $(this).children().eq(2).children('.game-schedule').children('.score').text()

                        var dateTime = moment($(this).children().first().html());
                        if (!result) {
                            var gameTime = $(this).children().eq(2).text();
                            gameTime = gameTime.split(' ');
                            var hours = gameTime[0].split(':')[0];
                            var minutes = gameTime[0].split(':')[1];
                            dateTime.add(hours, 'hours');
                            dateTime.add(minutes, 'minutes');
                        }

                        games.push({
                            dateTime: dateTime,
                            opponent: $(this).children().eq(1).children('.game-schedule').children('.team-name').text(),
                            isHost: $(this).children().eq(1).children('.game-schedule').children('.game-status').text() === '@',
                            result: result || 'TBD'
                        });
                    })

                    json.games = games;
                })
            }

            return cb(json);

        })
    }

    // scrapeTeamSchedule('http://espn.go.com/mens-college-basketball/team/schedule/_/id/96/kentucky-wildcats', writeFile)

    var teams = [];

    function iterateTeams(cb) {
        console.log('entering iterateTeams')
        var url = 'http://espn.go.com/mens-college-basketball/team/schedule/_/id/96/kentucky-wildcats';

        return request(url, function(error, response, html) {
            if (error) {
                console.log(error)
            }
            if (!error) {
                var teamName;
                var url;

                var $ = cheerio.load(html);

                $('.select-box').filter(function() {
                    var allTeams = $(this).children();

                    allTeams.each(function(i, team) {
                        if (i < 2) {
                            return;
                        }

                        teamName = $(this).text();
                        url = $(this).attr('value');

                        var currentTeam = {
                            teamName: teamName,
                            url: url,
                            games: []

                        }

                        teams.push(currentTeam);
                    })
                })

                console.log('teams after iterateTeams got ')
                return cb(teams);

            }

        })
    }

    function iterateToGetGames(teams, cb) {
    	console.log('entering iterateToGetGames')
        teams.forEach(function(team) {
        	console.log('scraping team schedule: ', team.teamName)
            scrapeTeamSchedule(team.url, function(data) {
                // console.log('---------------entering scrapeTeamSchedule--------------');
                // console.log(data.games)
                team.games = data.games;
            });
        })
        setTimeout(function() {
        	writeFile(teams)
        }, 10000)
    }


    function writeFile(json) {
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
            console.log('File successfully written! - Check your project directory for the output.json file');
        })
    }

    iterateTeams(iterateToGetGames);
