import {LinearClient} from "@linear/sdk";

async function getCurrentMonthParentIssueId() {
    const apiKey = process.env.LINEAR_API_TOKEN
    const linearClient = new LinearClient( { apiKey });
    const me = await linearClient.viewer;
    const myIssues = await me.createdIssues();

    if (myIssues.nodes.length) {
        //myIssues.nodes.map(issue => console.log(`${me.displayName} has issue: ${issue.title}, ${issue.id}`));
        //const parentIssue = myIssues.nodes.find(parent => parent.title === "dummy");
        const regexp = new RegExp('Parent*','g');
        const parentIssue = myIssues.nodes.find(parent =>
            parent.createdAt.getMonth() == new Date().getMonth() &&
            parent.title.matchAll(regexp));
        const parentIssueId = String(parentIssue?.id);
        return parentIssueId;
    } else {
        console.log(`${me.displayName} has no issues`);
        return  null;
    }
}

async function createMyIssues() {
    const apiKey = process.env.LINEAR_API_TOKEN
    const linearClient = new LinearClient( { apiKey });
    const teams = await linearClient.teams();
    //console.log(teams);
    const team = teams.nodes[0];
    //console.log(team.id);
    if (team.id) {
        const today = new Date().getDate()
        const resultIParentIssueCreate = await linearClient.issueCreate({ teamId: team.id, title: "Parent Issue" });
        console.log(resultIParentIssueCreate);
        console.log('---------- Successfully Created Parent Issue -------------');
        const currentMonthParentIssueId = await getCurrentMonthParentIssueId();
        console.log(currentMonthParentIssueId);
        const resultChildIssueCreate = await linearClient.issueCreate({ teamId: team.id, title: "Child Issue", parentId: currentMonthParentIssueId  });
        console.log(resultChildIssueCreate);
    }
}

createMyIssues();
