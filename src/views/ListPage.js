import React from 'react'
import Relay from 'react-relay'
import classes from './ListPage.css'

import PokemonPreview from '../components/PokemonPreview'

export class ListPage extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
  }
  render () {
    return (
      <div className={classes.root}>
        <div className={classes.title}>
          {`There are ${this.props.viewer.allPokemons.edges.length} in your pokedex`}
        </div>
        <div className={classes.container}>
          {
            this.props.viewer.allPokemons.edges.map((edge) =>
              <PokemonPreview key={edge.node.id} pokemon={edge.node} />
            )
          }
        </div>
      </div>
    )
  }
}

export default Relay.createContainer(
  ListPage,
  {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          allPokemons (first: 100000) {
            edges {
              node {
                ${PokemonPreview.getFragment('pokemon')}
                id
              }
            }
          }
        }
      `,
    },
  },
)

