export function convertFetchMaraphonResults(res) {
    const leagues = [],
        events = {};


    res.forEach(e => {
        if (!leagues.find(l => l.fullName === e.fullName)) {
            leagues.push({fullName: e.fullName});
            events[e.fullName] = [];
        }

        events[e.fullName].push(e);
    });

    return {
        leagues, events
    }
}