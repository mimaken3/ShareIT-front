// セレクトボックスの色を背景に合わせる
const selectBoxStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "#fafafa" }),
  option: (styles) => {
    return {
      ...styles,
      // backgroundColor: "#fafafa", // 一覧表示の背景色
    };
  },
};

export default selectBoxStyles;
