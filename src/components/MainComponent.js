import React, { Component } from "react";
//importing the components from reactstrap to create the navbar
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Menu from "./MenuComponent";
import { actions } from "react-redux-form";
import DishDetail from "./dishDetails";
import Header from "./Header";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import About from "./AboutUsComponent";
import ContactUs from "./ContactComponent";
import {
  postComment,
  postFeedback,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders
} from "../redux/ActionCreators";
// import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (
    firstname,
    lastname,
    telnum,
    email,
    agree,
    contactType,
    message
  ) =>
    dispatch(
      postFeedback(
        firstname,
        lastname,
        telnum,
        email,
        agree,
        contactType,
        message
      )
    )
});
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
      console.log(this.props.dishes);
      return (
        
        <Home
           dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishErrorMessage={this.props.dishes.errorMessage}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrorMessage={this.props.promotions.errorMessage}
              leader={
            this.props.leaders.leaders.filter(leader => leader.featured)[0]
          }
          leaderLoading={this.props.leaders.isLoading}
          leaderErrorMessage={this.props.leaders.errorMessage}
        />
      );
    };

    // passing ID from URL of selected dish
    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errorMessage={this.props.dishes.errorMessage}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrorMessage={this.props.comments.errorMessage}
            postComment={this.props.postComment}
        
        />
      );
    };

    return (
      <div>
        <Header />

        {/* react router to navigate */}
        <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
          <Route path="/home" component={HomePage} />

          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishId" component={DishWithId} />

          <Route
            path="/aboutus"
            component={() => <About leaders={this.props.leaders} />}
          />

          <Route
            exact
            path="/ContactUs"
            component={() => (
              <ContactUs 
              resetFeedbackForm={this.props.resetFeedbackForm}
              postFeedback={this.props.postFeedback}

              />
            )}
          />

          {/* default route */}
          <Redirect to="/home" />
          </Switch>
            </CSSTransition>
          </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
