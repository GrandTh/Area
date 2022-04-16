const axios = require('axios');
const Reaction = require('./reactions');

const actions_func = new Map()

const ClashRoyaleMembers = [];
const ClashOfClansMembers = [];
const NewsReport = [];
const NewsBlog = [];
const NewsArticle = [];

newArticle = (username, action, reaction, gameName, service_reaction, input, token) => {
    axios({
        method: "GET",
        url: "https://api.spaceflightnewsapi.net/v3/articles?_limit=1",
    }).then((res) => {
        const _res = NewsArticle.find(({ _username }) => _username === username);
        if (_res === undefined)
            NewsArticle.push({ '_username': username, 'title': res.data[0].title, 'url': res.data[0].url })
        else if (res.data[0].title != _res.title) {
            _res.title = res.data[0].title
            _res.url = res.data[0].url
            Reaction.reactions_func.get(reaction)(username, "New article of news", `Hello ${username},\n\nThere's a new article: ${_res.title}.\nYou can check this out right there: ${_res.url}\n\nBye.`, gameName, action, input, service_reaction, reaction);
        }
    }).catch((err) => {
        console.log("Error : newArtcle --> " + err)
    });
}

newBlog = (username, action, reaction, gameName, service_reaction, input, token) => {
    axios({
        method: "GET",
        url: "https://api.spaceflightnewsapi.net/v3/blogs?_limit=1",
    }).then((res) => {
        const _res = NewsBlog.find(({ _username }) => _username === username);
        if (_res === undefined)
            NewsBlog.push({ '_username': username, 'title': res.data[0].title, 'url': res.data[0].url })
        else if (res.data[0].title != _res.title) {
            _res.title = res.data[0].title
            _res.url = res.data[0].url
            Reaction.reactions_func.get(reaction)(username, "New blog of news", `Hello ${username},\n\nThere's a new blog: ${_res.title}.\nYou can check this out right there: ${_res.url}\n\nBye.`, gameName, action, input, service_reaction, reaction);
        }
    }).catch((err) => {
        console.log("Error : newBlog --> " + err)
    });
}

newReport = (username, action, reaction, gameName, service_reaction, input, token) => {
    axios({
        method: "GET",
        url: "https://api.spaceflightnewsapi.net/v3/reports?_limit=1",
    }).then((res) => {
        const _res = NewsReport.find(({ _username }) => _username === username);
        if (_res === undefined)
            NewsReport.push({ '_username': username, 'title': res.data[0].title, 'url': res.data[0].url })
        else if (res.data[0].title != _res.title) {
            _res.title = res.data[0].title
            _res.url = res.data[0].url
            Reaction.reactions_func.get(reaction)(username, "New report of news", `Hello ${username},\n\nThere's a new report: ${_res.title}.\nYou can check this out right there: ${_res.url}\n\nBye.`, gameName, action, input, service_reaction, reaction);
        }
    }).catch((err) => {
        console.log(`Error : newReport --> ` + err)
    });
}

tokenOver = (username, action, reaction, gameName, service_reaction, input, token) => {
    axios({
        method: "GET",
        url: `http://api.coincap.io/v2/assets/${action.split(' ')[0]}`,
        withCredentials: true,
        headers: { 'content-type': 'application/json' },
    }).then((res) => {
        if (res.data.data.priceUsd >= input)
            Reaction.reactions_func.get(reaction)(username, `A new update on ${res.data.data.id} (${res.data.data.symbol})`, `Hello ${username},\n\nThe ${res.data.data.symbol}'s value has reached over ${input} dollars.\n\nBye.`, gameName, action, input, service_reaction, reaction);
    }).catch((err) => {
        console.log("Error : Crypto --> " + err)
    });
}

newFriend = (username, action, reaction, gameName, service_reaction, input, token) => {
    axios({
        method: "GET",
        url: `https://api.${gameName}.com/v1/clans?name=${input}`,
        withCredentials: true,
        headers:
        {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then((res) => {
        if (gameName === "ClashRoyale") {
            const _res = ClashRoyaleMembers.find(({ _username }) => _username === username);
            if (_res === undefined)
                ClashRoyaleMembers.push({ '_username': username, 'members': res.data.items[0].members })
            else if (res.data.items[0].members > _res.members) {
                _res.members = res.data.items[0].members
                Reaction.reactions_func.get(reaction)(username, "Update members in the Clash Royale clan", `Hello ${username},\n\nA new friend has joined your clan: ${input}.\nYou are now ${_res.members} in the clan.\n\nBye.`, gameName, action, input, service_reaction, reaction);
            }
        }
        else if (gameName === "ClashOfClans") {
            const _res = ClashOfClansMembers.find(({ _username }) => _username === username);
            if (_res === undefined)
                ClashOfClansMembers.push({ '_username': username, 'members': res.data.items[0].members })
            else if (res.data.items[0].members > _res.members) {
                _res.members = res.data.items[0].members
                Reaction.reactions_func.get(reaction)(username, "Update members in the Clash Of Clan clan", `Hello ${username},\n\nA new friend has joined your clan: ${input}.\nYou are now ${_res.members} in the clan.\n\nBye.`, gameName, action, input, service_reaction, reaction);
            }
        }
    }).catch((err) => {
        console.log("Error: newFriend --> " + err)
    });
}

friendLeft = (username, action, reaction, gameName, service_reaction, input, token) => {
    axios({
        method: "GET",
        url: `https://api.${gameName}.com/v1/clans?name=${input}`,
        withCredentials: true,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then((res) => {
        if (gameName === "ClashRoyale") {
            const _res = ClashRoyaleMembers.find(({ _username }) => _username === username);
            if (_res === undefined)
                ClashRoyaleMembers.push({ '_username': username, 'members': res.data.items[0].members })
            else if (res.data.items[0].members < _res.members) {
                _res.members = res.data.items[0].members
                Reaction.reactions_func.get(reaction)(username, "Update members in the Clash Royale clan", `Hello ${username},\n\nA friend has left your clan: ${input}.\nYou are now ${_res.members} in the clan.\n\nBye.`, gameName, action, input, service_reaction, reaction);
            }
        }
        else if (gameName === "ClashOfClans") {
            const _res = ClashOfClansMembers.find(({ _username }) => _username === username);
            if (_res === undefined)
                ClashOfClansMembers.push({ '_username': username, 'members': res.data.items[0].members })
            else if (res.data.items[0].members < _res.members) {
                _res.members = res.data.items[0].members
                Reaction.reactions_func.get(reaction)(username, "Update members in the Clash Of Clan clan", `Hello ${username},\n\nA friend has left your clan: ${input}.\nYou are now ${_res.members} in the clan.\n\nBye.`, gameName, action, input, service_reaction, reaction);
            }
        }
    }).catch((err) => {
        console.log("Error : friendLeft --> " + err)
    });
}

tempIsOver = (username, action, reaction, gameName, service_reaction, input, token) => {
    axios({
        method: "GET",
        url: `https://api.weatherapi.com/v1/forecast.json?key=7101d38485824329977163106213011&q=lyon&days=3&aqi=no&alerts=no`,
        withCredentials: true,
    }).then((res) => {
        console.log("weather --> " + res.data.current.temp_c, input);
        if (res.data.current.temp_c > input) {
            Reaction.reactions_func.get(reaction)(username, `Temperature is over ${input}`, `Hello ${username},\n\nThe temperature is over ${input}.\nThe current temperature is ${res.data.current.temp_c} degrees.\n\nBye.`, gameName, action, input, service_reaction, reaction);
        }
    }).catch((err) => {
        console.log("Error : tempIsOver --> " + err)
    });
}

tempIsUnder = (username, action, reaction, gameName, service_reaction, input, token) => {
    axios({
        method: "GET",
        url: `https://api.weatherapi.com/v1/forecast.json?key=7101d38485824329977163106213011&q=lyon&days=3&aqi=no&alerts=no`,
        withCredentials: true,
    }).then((res) => {
        if (res.data.current.temp_c < input) {
            Reaction.reactions_func.get(reaction)(username, `Temperature is under ${input}`, `Hello ${username},\n\nThe temperature is under ${input}.\nThe current temperature is ${res.data.current.temp_c} degrees.\n\nBye.`, gameName, action, input, service_reaction, reaction);
        }
    }).catch((err) => {
        console.log("Error : tempIsOver --> " + err)
    });
}

actions_func.set("new friend in the clan", newFriend)
actions_func.set("a friend left the clan", friendLeft)
actions_func.set("bitcoin is over", tokenOver)
actions_func.set("ethereum is over", tokenOver)
actions_func.set("tezos is over", tokenOver)
actions_func.set("vechain is over", tokenOver)
actions_func.set("new article", newArticle)
actions_func.set("new blog", newBlog)
actions_func.set("new report", newReport)
actions_func.set("Temperature is over", tempIsOver)
actions_func.set("Temperature is under", tempIsUnder)

module.exports = {
    actions_func,
}
