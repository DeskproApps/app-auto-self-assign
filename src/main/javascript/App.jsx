import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component
{
  static propTypes = { dpapp: React.PropTypes.object.isRequired };

  componentDidMount() {
    const { dpapp } = this.props;

    Promise
      .all([ dpapp.context.getMe(), dpapp.context.getTabData()])
      .then(([me, tabData]) => {
        const { api_data } = tabData;
        if (!api_data.agent || !api_data.agent.id) {
          return dpapp.restApi.put(`tickets/${dpapp.context.entityId}`, { agent: me.id });
        }
      })
    ;

  }

  shouldComponentUpdate() { return false; }

  render() { return null; }
}
