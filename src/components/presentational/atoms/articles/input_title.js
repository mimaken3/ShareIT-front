import React from "react";
// 入力フォーム作成で使う
import { Field, reduxForm } from "redux-form";
import { render } from "@testing-library/react";
// タイトルと内容の入力ボックス
// renderField(field) {
//     const {
//       input,
//       label,
//       type,
//       // mata: { visited, error }
//       meta: { error }
//     } = field;
//     return (
//       <div>
//         <input {...input} placeholder={label} type={type} />
//         {error && <span>{error}</span>}
//         {/* {visited && error && <span>{error}</span>} */}
//       </div>
//     );
//     }

// const InputTitle = props => {
//   console.log(props.title);
//   let title = props.title;
//   //   const {
//   //     input,
//   //     label,
//   //     type,
//   //     // mata: { visited, error }
//   //     meta: { error }
//   //   } = props;
//   return (
//     <React.Fragment>
//       タイトル:
//       {/* <Field label="article_title" name="article_title" type="text" /> */}
//       <Field label="title" name="title" type="text" />
//       {/* <input {...input} placeholder={label} type={type} />
//       {error && <span>{error}</span>} */}
//       {/* {visited && error && <span>{error}</span>}*/}
//     </React.Fragment>
//   );
// };

const InputTitle = props => {
  // タイトルと内容の入力ボックス
  // renderField(field) {
  //     const {
  //       input,
  //       label,
  //       type,
  //       // mata: { visited, error }
  //       meta: { error }
  //     } = field;
  //     return (
  //       <div>
  //         <input {...input} placeholder={label} type={type} />
  //         {error && <span>{error}</span>}
  //         {/* {visited && error && <span>{error}</span>} */}
  //       </div>
  //     );
  //     }
  let input_title = props.input_title;
  //   console.log("before");
  //   console.log(props);
  return (
    <Field
      name="input_title"
      label="input_title"
      text="text"
      //   component="input"
      component={field => {
        console.log(field);
        const {
          input,
          label,
          type,
          // mata: { visited, error }
          meta: { error }
        } = field;
        return (
          <div>
            <input {...input} placeholder={label} type={type} />
            {error && <span>{error}</span>}
            {/* {visited && error && <span>{error}</span>} */}
          </div>
        );

        // console.log(props);
        // return (
        //   <div>
        //     <div>Title</div>
        //   </div>
        // );
      }}
      //   name={title}
      //   label="title"
      //   component={props => {
      //     console.log("after");
      //     console.log(props);
      //     return (
      //       <div className="input-row">
      //         Title
      //         <input {...props.input.name} type="text" />
      //         {props.touched && props.error && (
      //           <span className="error">{props.error}</span>
      //         )}
      //       </div>
      //     );
      //   }}
    />
  );
};

export default InputTitle;
