// import React, { Component } from "react";
// import { postEvent } from "../actions";
// import { Field, reduxForm } from "redux-form";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";

// class articleNew extends Component {
//   constructor(props) {
//     super(props);

//     // クラスのインスタンスでasync onSubmit...のインスタンスが使えす
//     this.onSubmit = this.onSubmit.bind(this);
//   }

//   render() {
//     const { handleSubmit } = this.props;
//     return (
//       <form onSubmit={handleSubmit(this.onSubmit)}>
//         <div>
//           <Field label="Title" />
//         </div>
//       </form>
//     );
//   }
// }

// const mapDispatchToProps = { postArticle };

// export default connect(
//   null,
//   mapDispatchToProps
// )(reduxForm((form: ""))(articleNew));
