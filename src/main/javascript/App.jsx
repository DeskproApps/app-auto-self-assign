import React from 'react';
import ReactDOM from 'react-dom';

import { assignTicketRuleset } from './Rulesets';
import { runRuleset } from './RulesetRunner';

export default class App extends React.Component
{
  static propTypes = { dpapp: React.PropTypes.object.isRequired };

  componentDidMount() {
    const { dpapp } = this.props;

    Promise
      .all([ dpapp.context.getMe(), dpapp.context.getTabData()])
      .then(([me, tabData]) => {
        const { api_data: ticketData } = tabData;
        // apply assign ticket rules
        const assign = runRuleset(assignTicketRuleset, me, ticketData);
        if (assign) {
          return dpapp.restApi.put(`tickets/${dpapp.context.entityId}`, { agent: me.id });
        }
      })
    ;
  }

  shouldComponentUpdate() { return false; }

  render() { return null; }
}
