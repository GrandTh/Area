const Service = require('../models/services-model');
const Action = require('./actions');

function check_area(Area) {
    for (var i = 0; Area[i]; i++) {
        if (Area[i].areas[0] != undefined) {
            var clash = ""
            for (var j = 0; Area[i].areas[j]; j++) {
                Area[i].areas[j].service_action === "ClashRoyale" ? clash = process.env.CLASHROYALE_TOKEN : clash = process.env.CLASHOFCLANS_TOKEN;
                Action.actions_func.get(Area[i].areas[j].action)(Area[i].username, Area[i].areas[j].action, Area[i].areas[j].reaction, Area[i].areas[j].service_action, Area[i].areas[j].service_reaction, Area[i].areas[j].input, clash);
            }
        }
    }
    console.log("\n------END------");

}

loop_area = (req, res) => {
    setInterval(async () => {
        const Area = [];
        Service.find({}, (err, service) => {
            for (var i = 0; service[i]; i++)
                Area.push(service[i]);
            check_area(Area);
        })
    }, 60000);
}

module.exports = {
    loop_area,
}
