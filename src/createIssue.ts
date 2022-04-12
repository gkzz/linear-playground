import {LinearClient} from "@linear/sdk";


async function createMyIssues() {
    const apiKey = process.env.LINEAR_API_TOKEN
    const linearClient = new LinearClient( { apiKey });
    const teams = await linearClient.teams();
    console.log(teams);
    const team = teams.nodes[0];
    console.log(team.id);
    if (team.id) {
        const today = new Date().getDate()
        await linearClient.issueCreate({ teamId: team.id, title: "My Created Issue" });
    }
}

createMyIssues();
