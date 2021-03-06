import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createComment } from '../../actions/comment_actions';
import { openModal } from '../../actions/modal_actions';
import { fetchPlanSuggs, fetchSugg } from '../../actions/sugg_actions';
import { downvote, downvoteRemove, upvote, upvoteRemove } from '../../actions/vote_actions';
import PlanSuggestions from './plan_suggs';

const mapSTP = (state, ownProps) => {
    
    return ({
        planId: ownProps.match.params.planId,
        currentUser: state.session.user,
        suggs: state.main.suggs,
        
    })
};

const mapDTP = dispatch => ({
    fetchPlanSuggs: planId => dispatch(fetchPlanSuggs(planId)),
    upvote: suggId => dispatch(upvote(suggId)),
    upvoteRemove: suggId => dispatch(upvoteRemove(suggId)),
    downvote: suggId => dispatch(downvote(suggId)),
    downvoteRemove: suggId => dispatch(downvoteRemove(suggId)),
    fetchSugg: suggId => dispatch(fetchSugg(suggId)),
    createComment: (comment, suggId) => dispatch(createComment(comment, suggId)),
    openModal: modal => dispatch(openModal(modal))
});

export default withRouter(connect(mapSTP, mapDTP)(PlanSuggestions));