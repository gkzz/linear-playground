import { LinearClient } from '@linear/sdk'

/*
(async ()=>{
    const apiKey = process.env.LINEAR_API_TOKEN
    const linearClient = new LinearClient( { apiKey });
    const currentUser = await linearClient.viewer
    console.log(currentUser);
})()

async function getMyIssues() {
    const apiKey = process.env.LINEAR_API_TOKEN
    console.log(apiKey);
    const linearClient = new LinearClient( { apiKey });
    const me = await linearClient.viewer;
    const myIssues = await me.assignedIssues();

    if (myIssues.nodes.length) {
        myIssues.nodes.map(issue => console.log(`${me.displayName} has issue: ${issue.title}`));
    } else {
        console.log(`${me.displayName} has no issues`);
    }
}
getMyIssues();
*/

/*
async function getMyIssues() {
    const apiKey = process.env.LINEAR_API_TOKEN
    const linearClient = new LinearClient( { apiKey });
    const teams = await linearClient.teams()
    const team = teams.nodes[0];
    //console.log(teams.nodes[0]);

    //const linearTeamId = process.env.LINEAR_TEAM_ID
    //const team = await linearClient.team('teamd_id);
    //const team = await linearClient.team( { linearTeamId });

    const me = await linearClient.viewer;
    const myIssues = await me.createdIssues();
    console.log(myIssues);

}
getMyIssues();
*/


async function getMyIssues() {
    const apiKey = process.env.LINEAR_API_TOKEN
    const linearClient = new LinearClient( { apiKey });
    const me = await linearClient.viewer;
    const myIssues = await me.createdIssues();

    if (myIssues.nodes.length) {
        //myIssues.nodes.map(issue => console.log(`${me.displayName} has issue: ${issue.title}, ${issue.id}`));
        const parentIssue = myIssues.nodes.find(parent => parent.title === "dummy");
        const parentIssueId = parentIssue?.id;
        const childIssue = myIssues.nodes.find(child => child.title === "dummy2");
        //const childIssueId = String(childIssue?.id);
        const childIssueId = String(childIssue?.id);
        //console.log(childIssue?.id);
        //await linearClient.issueUpdate(childIssueId, { parentId: parentIssueId } );
    } else {
        console.log(`${me.displayName} has no issues`);
    }
}

getMyIssues();
