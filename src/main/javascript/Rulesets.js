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
