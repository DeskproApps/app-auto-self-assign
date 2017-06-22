# app-auto-self-assign

Assign a ticket automatically to the agent who opens it

## How it works
    
This application uses a simple rule based system to determine if a ticket should be assigned. The rules are written
in disjunctive normal form  ( an OR of ANDs, see https://en.wikipedia.org/wiki/Disjunctive_normal_form for more information)

By default, it comes with only one rule enabled which assigns the ticket to the agent who is viewing it **only** if th ticket is unassigned

## Changing the ticket assignment rules

The easiest way to change the rules is by editing the default ruleset from the rulesets file `src/main/javascript/Rulesets`

The initial file looks like this:

    "use strict";
    
    // rules in rulesets are represented in a disjunctive normal form, an OR of ANDs
    export const assignTicketRuleset = {
      rules: [
        // a list of rules group indicates an AND group, which evaluates to true if ALL its rules evaluate to true
        [
          (me, ticketData) => !ticketData.agent || !ticketData.agent.id, // check there is no agent assigned
        ]
      ]
    };
    
If you want to narrow down the assign ticket ruleset, just add a new rule to the first group of rules. For instance if we want to 
auto-assign a ticket when it is unassigned **AND** its department is on a auto-assign list of departments the file would look like this:
   

    "use strict";
    
    // rules in rulesets are represented in a disjunctive normal form, an OR of ANDs
    export const assignTicketRuleset = {
      rules: [
        // a list of rules group indicates an AND group, which evaluates to true if ALL its rules evaluate to true
        [
          (me, ticketData) => !ticketData.agent || !ticketData.agent.id, // check there is no agent assigned
          (me, ticketData) => ticketData.department && [1, 2, 4].indexOf(ticketData.department.id) !== -1 // check ticket has department and department is whitelisted for auto-assign 
        ]
      ]
    };

   