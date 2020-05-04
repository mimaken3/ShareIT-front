import React, { Component } from "react";
import UserIcon from "Atoms/user_icon";

// ユーザ一のアイコン画像
class EditUserIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIconImage: null,
      displayIconImage: null,
    };
  }

  // アイコン画像を親コンポーネントに渡す
  getUserIcon() {
    return this.state.selectedIconImage;
  }

  // 画像をアップロード
  fileSelectedHandler = (e) => {
    if (e.target.files.length === 1) {
      // 画像がちゃんとセットされたとき

      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onloadend = (e) => {
        this.setState({
          displayIconImage: [reader.result],
        });
      };

      this.setState({ selectedIconImage: e.target.files[0] });
    }
  };

  render() {
    var Icon;
    if (this.state.selectedIconImage && this.state.displayIconImage) {
      Icon = (
        <div>
          <UserIcon iconData={this.state.displayIconImage} />
        </div>
      );
    } else {
      Icon = (
        <div>
          <UserIcon iconData={this.props.icon} />
        </div>
      );
    }
    return (
      <React.Fragment>
        <div>ユーザアイコン</div>
        {Icon}
        <input
          type="file"
          onChange={this.fileSelectedHandler}
          accept="image/*"
        />
      </React.Fragment>
    );
  }
}

export default EditUserIcon;
