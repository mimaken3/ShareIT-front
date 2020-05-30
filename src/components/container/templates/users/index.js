import React, { Component } from "react";
import { connect } from "react-redux";
import { showAllUsers, emptyUsers } from "Actions/user";
import Loading from "Templates/loading";
import AllUsers from "Organisms/all_users";
import Paging from "Atoms/paging";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import ScrollToTopOnMount from "Atoms/scroll_to_top_on_mount";

class UsersIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  // 外部のAPIに対してイベントを取得する
  componentDidMount() {
    // 複雑な処理はcomponentに書かずに外(action)に書く
    this.props.showAllUsers(1).then(() => {
      this.setState({ loading: false });
    });
  }

  PagingClick() {
    this.props.emptyUsers();
    if (this.props.allPagingNum) {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.props.users && this.props.allPagingNum && !this.state.loading) {
      return (
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <ScrollToTopOnMount />

          <AllUsers />

          <div>
            <Paging
              refName="users"
              userID={this.props.userID}
              refPg={this.props.refPg}
              allPagingNum={this.props.allPagingNum}
              callback={() => this.PagingClick()}
            />
          </div>
        </Container>
      );
    } else {
      return (
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <ScrollToTopOnMount />
          <Loading />
        </Container>
      );
    }
  }
}

// stateとactionをcomponentに関連付ける実装
// このstateは状態のトップレベルを表す
const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    allPagingNum: state.users.all_paging_num,
    refPg: state.users.ref_pg,
  };
};

const mapDispatchToProps = { showAllUsers, emptyUsers };

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex);
