import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Items from './Items';
import './styles.css';
// import { fetchItemsFromUrl } from '../../redux/modules/items';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const fetchItems = gql`
    query {
        items {
            id
            title
            description
            imageurl
            tags
            itemowner {
                id
                fullname
                email
            }
            created
            available
            borrower {
                id
                fullname
                email
            }
        }
    }
`;

const ItemsContainer = props => (
    <Query query={fetchItems}>
        {({ loading, error, data }) => {
            if (loading) {
                return (
                    <CircularProgress className="loadingIcon" thickness={7} />
                );
            }
            if (error) return <p>Error getting items</p>;
            return (
                <Items itemsData={data.items} itemFilters={props.itemFilters} />
            );
        }}
    </Query>
);
export default connect(state => ({
    itemFilters: state.itemsData.itemFilters
}))(ItemsContainer);
// export default graphql(fetchItems)(ItemsContainer);

ItemsContainer.propTypes = {
    itemFilters: PropTypes.array.isRequired
};
